# Deploy a backend on AWS EC2 — step-by-step (with explanations)

Below is a complete, practical, **step-by-step** procedure to deploy a typical web backend on an AWS EC2 instance. I’ll use **Ubuntu 22.04 LTS** in examples and show two common deployment patterns: **(A) run your app directly with a process manager (pm2 / systemd)** and **(B) run it inside Docker**. I’ll also show how to put **NGINX as reverse proxy** and enable **HTTPS** with Let’s Encrypt. Each step includes _why_ it’s done and exact commands you can run.

> Assumptions: you have an AWS account, a domain name (optional but recommended), and the backend code in a Git repo (or packaged tar). If your stack is different (Java, Python, Ruby...), the same flow applies — substitute runtime/install steps accordingly.

---

# Prerequisites (what you need before starting)

- AWS account and access to the AWS Console.
- A domain name (optional but needed for HTTPS using real certs).
- Local SSH key pair (you’ll create/download one via AWS when launching).
- Your backend code in GitHub / GitLab / a zip you can `scp`.
- Basic terminal knowledge.

---

# 1) Launch an EC2 instance (create the VM)

**Why:** EC2 is the virtual server where your backend will run.

**How (Console):**

1. AWS Console → EC2 → Launch Instance.
2. Choose AMI: **Ubuntu Server 22.04 LTS** (or Amazon Linux 2).
3. Choose Instance Type: `t3.micro`/`t2.micro` (free tier if eligible).
4. Storage: 8–30 GB (EBS). Increase if you need.
5. Create / select **Key pair** (download `.pem`) — you’ll use this to SSH.
6. Configure Security Group:

   - Allow **SSH (22)** — ideally restrict Source to _your_ IP only.
   - Allow **HTTP (80)** — Source `0.0.0.0/0` (if public site).
   - Allow **HTTPS (443)** — Source `0.0.0.0/0`.
   - **Do not** open internal app ports (like 8080) to the world unless required.

7. Launch.

**Explanation:** Security Groups are instance-level firewall rules — only open what you need.

---

# 2) Allocate an Elastic IP and associate to instance

**Why:** EC2 public IP can change on stop/start; Elastic IP gives a static public IP so DNS stays valid.

**How (Console):**

- EC2 → Network & Security → Elastic IPs → Allocate → Associate with your EC2 instance.

---

# 3) Point your domain to the Elastic IP (DNS A record)

**Why:** So `example.com` points to your server.

**How:** In your DNS provider, create an `A` record:

```
example.com  A  203.0.113.45   (Elastic IP)
www         A  203.0.113.45
```

Wait for DNS propagation (minutes–hours).

---

# 4) SSH into the instance & initial system setup

**Why:** Prepare the server, create non-root user, update packages.

**Local (chmod)**:

```bash
chmod 400 ~/keys/my-aws-key.pem
ssh -i ~/keys/my-aws-key.pem ubuntu@<ELASTIC_IP>
```

**On the server:**

```bash
# update packages
sudo apt update && sudo apt upgrade -y

# create a deploy user (optional but recommended)
sudo adduser deploy
sudo usermod -aG sudo deploy

# enable SSH key login for deploy user (copy your public key)
mkdir -p /home/deploy/.ssh
cat >> /home/deploy/.ssh/authorized_keys <<'KEY'
<your-public-ssh-key-here>
KEY
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

**Security tips:**

- Restrict SSH in Security Group to your IP.
- Consider disabling password auth (`/etc/ssh/sshd_config`: `PasswordAuthentication no`) and `PermitRootLogin no`.
- Consider using AWS Systems Manager Session Manager for SSH-less access (optional).

---

# 5) Install required software (Git, NGINX, Node, Docker option)

**Why:** Install runtime (Node/Python/etc) and web server (NGINX).

**Example for Node.js app:**

```bash
# common utilities
sudo apt install -y git curl build-essential

# nginx (reverse proxy)
sudo apt install -y nginx

# install Node.js (LTS example: 18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# check versions
node -v
npm -v
```

**Install PM2 (process manager)**:

```bash
sudo npm install -g pm2
# (if using deploy user, you might install pm2 as that user)
```

**If you prefer Docker (alternative path):**

```bash
# Docker install (Ubuntu)
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
```

---

# 6) Get your code on the server

**Options:** `git clone` from your repo, or `scp`/upload artifacts.

Example clone:

```bash
sudo -u deploy -i
cd /home/deploy
git clone git@github.com:youruser/your-backend.git myapp
cd myapp
cp .env.example .env
# edit .env with proper values (use nano/vi)
```

**Secrets:** Keep secrets out of repo — use `.env` with restricted permissions, or better: AWS SSM Parameter Store / Secrets Manager + IAM role (explained later).

---

# 7A) Run the app: direct / process manager path (Node example)

**Why:** Keep process alive and auto-restart on crashes / reboots.

Install dependencies and start:

```bash
cd /home/deploy/myapp
npm ci        # or npm install
# start with pm2
pm2 start npm --name myapp -- start   # if "start" script exists
# save pm2 state and enable startup
pm2 save
pm2 startup systemd
# run the printed command from pm2 startup as sudo (it sets the service)
```

**Alternatively: systemd service**
Create `/etc/systemd/system/myapp.service`:

```
[Unit]
Description=MyApp Node.js Service
After=network.target

[Service]
Environment=NODE_ENV=production
User=deploy
WorkingDirectory=/home/deploy/myapp
ExecStart=/usr/bin/node /home/deploy/myapp/server.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable myapp
sudo systemctl start myapp
sudo systemctl status myapp
```

**Check logs:** `pm2 logs myapp` or `journalctl -u myapp -f`

---

# 7B) Run the app inside Docker (alternative)

**Why:** Containerization isolates dependencies and simplifies deployment.

`docker-compose.yml` (simple):

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    restart: always
    environment:
      - NODE_ENV=production
```

Run:

```bash
# build & run
docker compose up -d --build

# check
docker ps
docker logs -f <container_id>
```

To auto-start on reboot, Docker containers with `restart: always` are sufficient; or create a systemd unit that runs `docker compose up -d`.

---

# 8) Configure NGINX as reverse proxy (explain)

**Why:** NGINX handles TLS termination, serves static assets, and proxies to the app on localhost (so app can stay behind the scenes on port 3000/8080).

Create `/etc/nginx/sites-available/myapp`:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and test:

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Important:** Do NOT `proxy_pass` to a public address—use `127.0.0.1` to keep internal traffic internal.

---

# 9) Obtain HTTPS certificates (Let’s Encrypt / Certbot)

**Why:** Secure traffic, SEO, browser trust.

Install Certbot & plugin and request cert:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot will: verify domain via HTTP challenge, obtain cert, and modify NGINX to redirect HTTP→HTTPS.

Test auto-renew:

```bash
sudo certbot renew --dry-run
```

Certbot installs a timer or cron job to renew automatically.

---

# 10) Firewall / Security Group final checks

**On server (ufw example):**

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # opens 80 & 443
sudo ufw enable
sudo ufw status
```

**In AWS Security Group:** keep SSH limited to your IP; 80/443 open to all; other ports closed.

---

# 11) Make deployments repeatable (simple deploy script / CI)

**Why:** Avoid manual steps each time—use a script or CI pipeline.

Simple deploy script (`deploy.sh`):

```bash
#!/usr/bin/env bash
set -e
cd /home/deploy/myapp
git fetch --all
git reset --hard origin/main
npm ci --production
pm2 reload myapp   # or pm2 restart myapp
```

Hook into GitHub Actions to SSH and run this script, or use AWS CodeDeploy / CodePipeline for zero-downtime.

---

# 12) Logging, monitoring & backups

**Logging:**

- Node logs via `pm2 logs` or `journalctl`.
- For centralized logging, push logs to **CloudWatch Logs** (install CloudWatch agent) or use a log shipper (Fluentd, Filebeat).

**Monitoring:**

- Use **CloudWatch** for CPU, memory, disk, and custom app metrics.
- Consider health endpoint `/healthz` returning `200`.

**Backups:**

- Take periodic EBS snapshots (AWS Console or CLI).
- Back up DBs to S3 or managed DB snapshots.

---

# 13) Security best practices & production concerns

- **Least privilege IAM:** Attach an IAM role to EC2 if it needs S3/SSM access — _do not_ store AWS keys on the box.
- **Secrets:** Use **AWS SSM Parameter Store** or **AWS Secrets Manager** to store DB passwords / API keys rather than `.env` files.
- **SSH:** Restrict SSH to known IPs and consider key rotation.
- **Auto updates:** Patch OS regularly or use managed images.
- **Health & readiness:** Expose `/health` and configure ALB health checks if using a load balancer.
- **Do not expose internal ports** like 8080 publicly — keep them on localhost and let NGINX handle external access.
- **Use HTTPS** and redirect HTTP→HTTPS.
- **Scale:** For more traffic, use an **Auto Scaling Group + Load Balancer** or move to ECS/EKS.

---

# 14) Quick troubleshooting checklist

- `sudo nginx -t` — check NGINX syntax.
- `sudo systemctl status myapp` or `pm2 status` — confirm app running.
- `curl -v http://localhost:3000/health` — test local app.
- Check Security Group rules — port blocked?
- `journalctl -u myapp -n 200` — read systemd logs.
- `docker logs -f <id>` — docker container logs.

---

# 15) Cost & lifecycle

- EC2 charges while running. Stop the instance to reduce charges, but EBS persists. Terminate to delete.
- Elastic IPs incur charges when not associated.
- Review AWS Free Tier limits.

---

# Summary checklist (short)

1. Launch EC2 (Ubuntu), create key pair, configure Security Group.
2. Associate Elastic IP.
3. SSH in, create deploy user, update packages.
4. Install runtime (Node/Python/Java), Git, NGINX (or Docker).
5. Clone code, configure `.env` or use Secrets Manager.
6. Start app (pm2/systemd or Docker).
7. Configure NGINX reverse proxy to localhost:PORT.
8. Point DNS → Elastic IP.
9. Issue HTTPS cert with certbot.
10. Automate startup (pm2 save or systemd), set up CI for deployments.
11. Add logging, monitoring, backups, and follow security best practices.

---
