# Deploying a React frontend to AWS (S3 + CloudFront) — step-by-step

> A compact, beginner-friendly README that walks you through taking a React app from `create-react-app` to a fast, secure, global deployment using **S3 + CloudFront**. Each step below includes the matching keypoint (timestamp) you gave so you can map it back to your source video.

---

## 0. Introduction 

Short overview: we will create a React app, build it for production, upload the static files to an S3 bucket, put CloudFront (AWS CDN) in front of the bucket for global edge caching, attach a custom domain + SSL, and optionally add SPA-friendly error handling, cache invalidation, and a minimal local test step.

Why this setup?

- S3 is cheap and ideal for static files (HTML/CSS/JS/images).
- CloudFront distributes those files to edge locations for low latency worldwide.
- ACM provides a free SSL certificate when used with CloudFront.

---

## 1. Distribution and Storage

**Goal:** store files (S3) and distribute them globally (CloudFront).

**What to do:**

1. Create a private or public S3 bucket to hold your `build/` output.
2. Decide policy: public static site hosting (easiest) **or** private bucket + CloudFront Origin Access (recommended for security).

**Quick notes:**

- If you make the bucket public, anyone can request objects directly from S3 (less secure).
- If you keep the bucket private and restrict access to CloudFront, only CloudFront can fetch the objects (more secure).

---

## 2. CDN (Content Delivery Networks)

**What is CDN / CloudFront?** A CDN caches copies of your static files at edge locations (close to users) so downloads are fast, even far from your origin.

**Why use a CDN?**

- Lower latency (faster page loads).
- Reduced load on origin (S3) and lower origin egress costs in many cases.
- Global caching, gzip/Brotli compression at the edge.

---

## 3. Costs

Cost components to expect:

- **S3:** storage per GB per month + request costs (GET/PUT). Static sites generally have low storage costs.
- **CloudFront:** data transfer out (to users) + request fees. Data transfer from S3 to CloudFront often has lower or no cost when in the same region.
- **Route 53:** DNS service (if you use it) and domain registration costs.
- **ACM:** public certificates are free (when used with AWS services like CloudFront).

**Tips to reduce costs:**

- Add cache-control headers and long TTLs for immutable assets (fingerprinted JS/CSS).
- Enable compression (Brotli/gzip) at build time or at edge.
- Avoid frequent full-cache invalidations — invalidate only when necessary.

---

## 4. Why Not Use CDN in EC2

**Short answer:** EC2 is a virtual server — it's not a CDN. Hosting static files on an EC2 instance means:

- You still serve from one or a few locations (higher latency for distant users).
- You have to manage scaling, security, and cost of the instance.
- A CDN like CloudFront is purpose-built for caching at many edge locations — faster + cheaper for static assets.

Use EC2 for server-side processing or APIs; use S3 + CloudFront for static frontends.

---

## 5. Edge Networks

**Edge network / edge location**: small data centers distributed globally. CDN places cached copies of your files here so users download from a physically close location.

Benefits: lower latency, higher throughput, and often DDoS protection features included at the edge.

---

## 6. Create AWS Account

**Steps:**

1. Sign up at [https://aws.amazon.com](https://aws.amazon.com). (Use an email you control.)
2. Enable MFA on the root account and then create an **Admin IAM user** for day-to-day work. Do **not** use the root account.
3. Configure billing alerts and enable cost allocation tags if you want to track charges.
4. Install and configure the AWS CLI locally (optional but useful):

```bash
# Install AWS CLI v2 (platform-specific). Then:
aws configure
# provide Access Key ID, Secret Access Key, region (ex: us-east-1), output json
```

**Beginner tip:** keep your access keys secret (don’t check them into GitHub). Use IAM roles where possible for automation.

---

## 7. Create a React App

If you don't have an app yet:

```bash
npx create-react-app my-app
cd my-app
npm start  # dev server
```

If you use Vite or Next.js the build + deployment ideas are similar — you produce a static `build/` or `dist/` folder and upload it to S3.

---

## 8. Build the Project

Prepare a production build:

```bash
npm run build
# or
yarn build
```

This creates a `build/` directory containing `index.html`, JS bundles, CSS and static assets.

---

## 9. Install Serve and Serve the Files (29:59) & What is Serve?

**What is **``**?** `serve` is a tiny static file server to quickly test built files locally (it is not used for production on S3/CloudFront). Good for confirming the build.

**How to use locally:**

```bash
# Using npx (no global install required)
npx serve -s build -l 5000
# OR globally
npm install -g serve
serve -s build -l 5000
```

Open `http://localhost:5000` to verify your production build locally (routing, assets, etc.).

---

## 10. Uploading Files to S3

Two common ways: Console upload or CLI sync.

**Create a bucket (Console):**

1. S3 > Create bucket
2. Name it (e.g., `my-frontend-week12fe`) — names must be globally unique.
3. Region: pick a region (if you plan to use CloudFront, the region matters less; CloudFront is global).
4. Block public access: if you plan to protect files and only expose via CloudFront, **leave block public enabled** and use Origin Access — otherwise you may disable it for public hosting.

**Upload via AWS CLI:**

```bash
aws s3 sync build/ s3://<your-bucket-name> --delete
# If you want to make files public (not recommended when using CloudFront with OAC):
aws s3 sync build/ s3://<your-bucket-name> --delete --acl public-read
```

**Public website hosting option:**

- You can enable "Static website hosting" in the S3 bucket and set `index.html` as the index document. That exposes an S3 website endpoint such as `http://<bucket-name>.s3-website-<region>.amazonaws.com`.

**Security note:** prefer keeping the bucket private and use CloudFront (next step) as the only public entry point.

---

## 11. Create CloudFront Distribution

**Steps (Console, summarized):**

1. Open CloudFront > Create distribution > Web (or the new UI) — CloudFront is global.
2. Origin domain: choose your S3 bucket (either the REST endpoint or the website endpoint). For SPA routing best practice, use the S3 REST endpoint + CloudFront custom error handling (explained later).
3. Restrict bucket access: **Yes (recommended)** — create or select an Origin Access Identity (OAI) or the newer Origin Access Control (OAC) so CloudFront can fetch private objects.
4. Default root object: `index.html`.
5. Viewer protocol policy: `Redirect HTTP to HTTPS`.
6. Add your alternate domain names (CNAMEs) under **Alternate Domain Names (CNAMEs)** — e.g., `week12fe.example.com` or `www.example.com`.
7. Attach an SSL certificate (ACM) — _request and validate first_ (see SSL Certificate step below). Certificates for CloudFront need to be in the \*\*US East (N. Virginia) — \*\*`` region.
8. Behavior: allow GET, HEAD (and optionally OPTIONS if you call APIs via the same domain).
9. Create the distribution (it will take several minutes to deploy).

**After creation:** note the CloudFront domain name (like `d1234abcd.cloudfront.net`) — you will point your DNS to that.

---

## 12. Add Policy to S3 Bucket

**Option A — Public bucket (fastest, least secure):** a bucket policy that makes objects readable by anyone.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::<your-bucket-name>/*"]
    }
  ]
}
```

**Option B — Recommended: Private bucket + CloudFront (Origin Access)**

- Use CloudFront Origin Access Identity (OAI) or the newer Origin Access Control (OAC).
- Configure CloudFront to use the OAI/OAC.
- Add a bucket policy that allows that CloudFront principal to read objects. The console can do this automatically when you enable "Restrict bucket access".

**Why recommended?** Keeps objects inaccessible directly from S3 and forces all traffic to go through CloudFront where you get caching, HTTPS, and additional protections.

---

## 13. Connect to Custom Domain & Add a CNAME Record (53:36) & Point `week12fe` to CloudFront

**If you use Route 53 (AWS DNS):**

- Create a Record Set for `week12fe.example.com` (or `www` or root) and create an **A — Alias** record pointing to your CloudFront distribution (Route53 allows alias to CloudFront).

**If you use a third-party DNS provider:**

- Create a **CNAME** record for `week12fe` that points to the CloudFront domain `d<id>.cloudfront.net`.
- For root domains (example.com) many providers do not allow CNAME at the apex — use Route 53 ALIAS/A or set up redirect to `www` and point `www` via CNAME.

**Example (third-party DNS):**

- `Host`: `week12fe` (or `week12fe.example.com`)
- `Type`: `CNAME`
- `Value`: `d1234abcd.cloudfront.net`

Wait for DNS propagation (minutes to a few hours).

---

## 14. SSL Certificate (50:36) & Verify Domain Name

**ACM (AWS Certificate Manager)** is the usual way to get a free TLS/SSL cert for CloudFront.

**Steps:**

1. In **us-east-1 (N. Virginia)** request a public certificate in ACM for your domain(s) — e.g., `week12fe.example.com` and/or `example.com` and `*.example.com` if you want wildcard.
2. Choose **DNS validation** (recommended) — ACM gives you CNAME records.
3. Add those CNAME records to your DNS (Route 53 can do it automatically if you used it) or add them at your DNS provider.
4. ACM will validate and issue the certificate (usually fast once DNS is correct).
5. In CloudFront distribution settings, choose the ACM certificate (it must be in `us-east-1`).

**Why DNS validation?** Easier, repeatable, and re-validates automatically if you keep the DNS record.

---

## 15. Add Custom Error Page

For **Single Page Apps (SPA)** you usually want to serve `index.html` for any path the client-side router expects (so refreshes and deep links work).

**CloudFront approach (recommended with S3 REST origin):**

1. In CloudFront, go to **Error Pages** (or Custom Error Responses).
2. Add a response for **403**:
   - **HTTP Error Code**: 403
   - **Customize Response**: Yes
   - **Response Page Path**: `/index.html`
   - **HTTP Response Code**: 200
   - **TTL**: keep short (e.g., 0–60s).
3. Repeat the same for **404** errors.

This ensures that whenever someone visits a deep link (e.g., `/dashboard`), CloudFront will serve `index.html`, and your React router will take over.

**Alternative (S3 Static Website Hosting):**

If you enable S3 **Static Website Hosting**, you can configure the bucket to return `index.html` for both the **Index Document** and **Error Document** fields. However, this only works when CloudFront is set to use the S3 **website endpoint** as the origin instead of the REST endpoint.
