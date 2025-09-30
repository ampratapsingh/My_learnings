# SQL Relationships and Joins — PostgreSQL

A practical README that explains SQL table relationships and demonstrates the most common SQL joins using **PostgreSQL**.

---

## Table of Contents
1. Introduction
2. Database relationships (1:1, 1:N, M:N)
3. Example schema (PostgreSQL)
4. Insert sample data
5. Join examples
6. Many-to-many with junction table
7. SQL injection & security best practices
8. Secure code examples (psycopg2, node-postgres, JDBC)
9. Hardening & operational tips
10. Summary & further reading

---

## 1. Introduction
This document covers how tables relate to one another and how to query them using joins. It also demonstrates practical, secure coding patterns to avoid SQL injection and reduce risk when your application talks to PostgreSQL.

---

## 2. Database relationships
- **One-to-One (1:1)** — Rare; implemented with a unique foreign key.
- **One-to-Many (1:N)** — Very common (e.g., Department → Employees).
- **Many-to-Many (M:N)** — Implemented with a junction table (bridge table).

---

## 3. Example schema (PostgreSQL)
```sql
-- Departments
CREATE TABLE department (
  dept_id SERIAL PRIMARY KEY,
  dept_name VARCHAR(100) NOT NULL UNIQUE
);

-- Employees (one-to-many -> department)
CREATE TABLE employee (
  emp_id SERIAL PRIMARY KEY,
  emp_name VARCHAR(150) NOT NULL,
  dept_id INT REFERENCES department(dept_id) ON DELETE SET NULL
);

-- Projects
CREATE TABLE project (
  project_id SERIAL PRIMARY KEY,
  project_name VARCHAR(150) NOT NULL
);

-- Employee_Project (many-to-many)
CREATE TABLE employee_project (
  emp_id INT NOT NULL REFERENCES employee(emp_id) ON DELETE CASCADE,
  project_id INT NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
  assigned_on TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (emp_id, project_id)
);
```

Notes:
- Use `ON DELETE` policies (CASCADE / SET NULL) deliberately.
- Add UNIQUE constraints where appropriate.

---

## 4. Insert sample data
```sql
INSERT INTO department (dept_name) VALUES
('Engineering'), ('Human Resources'), ('Finance');

INSERT INTO employee (emp_name, dept_id) VALUES
('Alice', 1), ('Bob', 1), ('Charlie', 2), ('Diana', 3);

INSERT INTO project (project_name) VALUES
('AI Development'), ('Recruitment Drive'), ('Budget Analysis');

INSERT INTO employee_project (emp_id, project_id) VALUES
(1,1), (2,1), (3,2), (4,3);
```

---

## 5. Join examples
### INNER JOIN — matching rows only
```sql
SELECT e.emp_id, e.emp_name, d.dept_name
FROM employee e
INNER JOIN department d ON e.dept_id = d.dept_id;
```

### LEFT JOIN — all rows from left table
```sql
SELECT e.emp_name, d.dept_name
FROM employee e
LEFT JOIN department d ON e.dept_id = d.dept_id;
```

### RIGHT JOIN — all rows from right table
```sql
SELECT e.emp_name, d.dept_name
FROM employee e
RIGHT JOIN department d ON e.dept_id = d.dept_id;
```

### FULL OUTER JOIN — all rows from both
```sql
SELECT e.emp_name, d.dept_name
FROM employee e
FULL OUTER JOIN department d ON e.dept_id = d.dept_id;
```

### CROSS JOIN — Cartesian product
```sql
SELECT e.emp_name, p.project_name
FROM employee e
CROSS JOIN project p;
```

---

## 6. Many-to-many example (using junction table)
```sql
SELECT e.emp_name, p.project_name, ep.assigned_on
FROM employee e
JOIN employee_project ep ON e.emp_id = ep.emp_id
JOIN project p ON ep.project_id = p.project_id
ORDER BY e.emp_name;
```

---

## 7. SQL injection & security best practices
**Key principles**
- Never interpolate untrusted input directly into SQL strings.
- Prefer parameterized queries / prepared statements.
- Apply least privilege: the DB user used by your application should only have required permissions.
- Validate and sanitize inputs at the application boundary.
- Use stored procedures thoughtfully (but still use parameters inside them).
- Monitor and log suspicious queries; enable PostgreSQL logging appropriately.
- Use network controls (VPC, private subnets) and TLS between app and DB.

### Common attack vectors
- Classic injection through concatenation of strings.
- Blind injection via boolean responses.
- Time-based injection.
- UNION-based exfiltration.

---

## 8. Secure code examples
Below are safe ways to run parameterized queries in common stacks.

### 8.1 Python — `psycopg2` (recommended: `psycopg2-binary` or `psycopg`)
```python
import psycopg2
conn = psycopg2.connect(dbname='mydb', user='appuser', password='s3cr3t', host='db.example.com')
cur = conn.cursor()
# BAD: string interpolation -> vulnerable
# cur.execute(f"SELECT * FROM employee WHERE emp_name = '{name}'")

# GOOD: parameterized
cur.execute("SELECT emp_id, emp_name FROM employee WHERE emp_name = %s", (name,))
rows = cur.fetchall()
cur.close()
conn.close()
```

### 8.2 Node.js — `pg` (node-postgres)
```js
const { Pool } = require('pg')
const pool = new Pool({ /* connection config */ })

// BAD: vulnerable string concat
// const q = `SELECT * FROM employee WHERE emp_name = '${name}'`

// GOOD: parameterized
const res = await pool.query('SELECT emp_id, emp_name FROM employee WHERE emp_name = $1', [name])
```

### 8.3 Java — JDBC `PreparedStatement`
```java
String sql = "SELECT emp_id, emp_name FROM employee WHERE emp_name = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, name);
ResultSet rs = ps.executeQuery();
```

### 8.4 Avoiding dynamic `ORDER BY` and other structural parts
If you must accept column names or directions from users (e.g., `ORDER BY`), whitelist them before concatenating. Example in pseudo:
```py
allowed_cols = {'name':'emp_name', 'id':'emp_id'}
col = allowed_cols.get(requested_col)
if not col:
    raise ValueError('invalid column')
query = f"SELECT * FROM employee ORDER BY {col}"
```

---

## 9. Hardening & operational tips
- Use role separation: `readonly` and `writer` roles.
- Rotate DB credentials frequently; use secrets manager.
- Restrict DB port access to application servers.
- Enable SSL/TLS between app and DB, and verify certificates.
- Keep PostgreSQL and client libraries up to date.
- Periodically run vulnerability scans and review logs for anomalies.

---

## 10. Summary & further reading
- Use relationships and joins to build expressive queries.
- Always use parameterized queries — never interpolate user input directly.
- Apply least privilege and network protections in production.

---

### License
This README is provided under the MIT License. Copy, adapt and reuse.

> "Well-structured data and safe access patterns make systems powerful and trustworthy."

