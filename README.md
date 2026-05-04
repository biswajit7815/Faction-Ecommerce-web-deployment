# 🛍️ Fastion — Full Stack E-Commerce Web Deployment

<div align="center">

![Fastion Banner](https://img.shields.io/badge/Fastion-E--Commerce-orange?style=for-the-badge&logo=shopify)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge&logo=mongodb)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?style=for-the-badge&logo=nginx)
![AWS](https://img.shields.io/badge/AWS-EC2%20Deployed-FF9900?style=for-the-badge&logo=amazonaws)
![Node.js](https://img.shields.io/badge/Node.js-21--Alpine-339933?style=for-the-badge&logo=nodedotjs)

**A Production-Grade, Dockerized Full Stack Fashion E-Commerce Platform**
built with the MERN Stack, deployed on AWS EC2 with Nginx as Reverse Proxy.

[Live Demo](http://13.233.30.149) • [Report Bug](https://github.com/biswajit7815/Faction-Ecommerce-web-deployment/issues) • [Request Feature](https://github.com/biswajit7815/Faction-Ecommerce-web-deployment/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Docker Architecture](#-docker-architecture)
- [Prerequisites](#-prerequisites)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [Production Deployment](#-production-deployment)
- [API Endpoints](#-api-endpoints)
- [Nginx Configuration](#-nginx-configuration)
- [Errors Faced & Solutions](#-errors-faced--solutions)
- [Security Checklist](#-security-checklist)
- [DevOps Best Practices](#-devops-best-practices)
- [Quick Debug Commands](#-quick-debug-commands)
- [Contributing](#-contributing)

---

## 🎯 About The Project

**Fastion** is a production-ready, full-stack fashion e-commerce application. It provides:

- 🛒 **User Side** — Browse products, add to cart, place orders (COD/Stripe/Razorpay)
- 🔐 **Authentication** — JWT-based secure login/register system
- 👨‍💼 **Admin Panel** — Manage products, view & update orders
- 📦 **Order Management** — Real-time order tracking & status updates
- 🖼️ **Image Upload** — Cloudinary-powered product image management
- 🐳 **Fully Dockerized** — 5-container architecture with Docker Compose
- 🔁 **Reverse Proxy** — Nginx routing for all services on a single port

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 19, Vite, Tailwind CSS |
| **Admin Panel** | React.js 19, Vite, Tailwind CSS |
| **Backend** | Node.js 21, Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Image Storage** | Cloudinary |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcrypt |
| **Payment** | Stripe, Razorpay |
| **Reverse Proxy** | Nginx (Alpine) |
| **Containerization** | Docker, Docker Compose |
| **Cloud Provider** | AWS EC2 (Ubuntu 24) |
| **Version Control** | Git, GitHub |

---

## 🏗️ System Architecture

```
                        INTERNET
                            │
                            ▼
                   ┌─────────────────┐
                   │   AWS EC2       │
                   │  (Ubuntu 24)    │
                   │                 │
                   │  ┌───────────┐  │
                   │  │  NGINX    │  │  ← Port 80 (Public)
                   │  │ :80       │  │    Reverse Proxy
                   │  └─────┬─────┘  │
                   │        │        │
                   │   ┌────┴────┐   │
                   │   │        │   │
              ┌────┴───┴──┐  ┌──┴───┴────┐
              │           │  │           │
         ┌────▼────┐ ┌────▼───┐ ┌───────▼───┐
         │FRONTEND │ │ ADMIN  │ │  BACKEND  │
         │  :80    │ │  :80   │ │   :4000   │
         │React.js │ │React.js│ │ Express   │
         └─────────┘ └────────┘ └─────┬─────┘
                                       │
                              ┌────────┴────────┐
                              │                 │
                     ┌────────▼──────┐  ┌───────▼──────┐
                     │  MongoDB      │  │  Cloudinary  │
                     │  Atlas        │  │  (Images)    │
                     │  (Cloud DB)   │  │  (Cloud)     │
                     └───────────────┘  └──────────────┘

Docker Network: fastion_network (Bridge)
All containers communicate via container names (DNS resolution)
```

### Traffic Flow

```
User Request: GET http://13.233.30.149/

1. User → Nginx (:80)
2. Nginx checks path:
   /          → proxy_pass → frontend:80  (React User App)
   /admin/    → proxy_pass → admin:80     (React Admin App)
   /api/      → proxy_pass → backend:4000 (Express API)
3. Backend → MongoDB Atlas (DB Query)
4. Backend → Cloudinary (Image Upload)
5. Response flows back → Nginx → User
```

---

## 📁 Project Structure

```
Faction-Ecommerce-web-deployment/
│
├── 📁 backend/                         # Node.js + Express API Server
│   ├── 📁 config/
│   │   ├── mongodb.js                  # MongoDB Atlas connection
│   │   └── cloudinary.js              # Cloudinary config
│   ├── 📁 controllers/
│   │   ├── userController.js           # Register, Login, Admin logic
│   │   ├── productController.js        # CRUD operations for products
│   │   ├── cartController.js           # Cart management
│   │   └── orderController.js         # Order placement & tracking
│   ├── 📁 models/
│   │   ├── userModel.js                # User MongoDB Schema
│   │   ├── productModel.js             # Product MongoDB Schema
│   │   ├── cartModel.js                # Cart MongoDB Schema
│   │   └── orderModel.js              # Order MongoDB Schema
│   ├── 📁 routes/
│   │   ├── userRoute.js                # /api/user/*
│   │   ├── productRoute.js             # /api/product/*
│   │   ├── cartRoute.js                # /api/cart/*
│   │   └── orderRoute.js              # /api/order/*
│   ├── 📁 middleware/
│   │   └── auth.js                     # JWT verification middleware
│   ├── server.js                       # Express app entry point
│   ├── Dockerfile                      # Backend Docker image
│   └── package.json
│
├── 📁 frontend/                        # React.js User Website
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Collection.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── PlaceOrder.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Login.jsx
│   │   ├── 📁 context/
│   │   │   └── ShopContext.jsx         # Global state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── nginx.conf                      # Frontend Nginx config
│   ├── Dockerfile                      # Frontend Docker image
│   ├── vite.config.js
│   └── package.json
│
├── 📁 admin/                           # React.js Admin Dashboard
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── 📁 pages/
│   │   │   ├── Add.jsx                 # Add new products
│   │   │   ├── List.jsx                # View all products
│   │   │   └── Orders.jsx             # Manage all orders
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── nginx.conf                      # Admin Nginx config
│   ├── Dockerfile                      # Admin Docker image
│   ├── vite.config.js                  # base: '/admin/' set here
│   └── package.json
│
├── 📁 nginx/
│   └── nginx.conf                      # Main Reverse Proxy Config
│
├── docker-compose.yml                  # All 5 containers orchestration
├── .env                                # Environment variables (never push!)
├── .gitignore                          # .env, node_modules ignored
└── README.md                           # This file
```

---

## 🐳 Docker Architecture

### 5 Container Setup

```
┌────────────────────────────────────────────────────────┐
│                  Docker Compose                        │
│                  fastion_network                       │
│                                                        │
│  ┌─────────────┐    ┌─────────────┐                   │
│  │fastion_nginx│    │fastion_mongo│                   │
│  │nginx:alpine │    │mongo:6.0    │                   │
│  │Port: 80:80  │    │Port: 27017  │                   │
│  │(PUBLIC)     │    │(internal)   │                   │
│  └──────┬──────┘    └──────┬──────┘                   │
│         │                  │                           │
│  ┌──────▼──────┐    ┌──────▼──────┐                   │
│  │fastion_     │    │fastion_     │                   │
│  │frontend     │    │backend      │                   │
│  │Port: 80     │    │Port: 4000   │                   │
│  │(internal)   │    │(internal)   │                   │
│  └─────────────┘    └─────────────┘                   │
│                                                        │
│  ┌─────────────┐                                       │
│  │fastion_admin│                                       │
│  │Port: 80     │                                       │
│  │(internal)   │                                       │
│  └─────────────┘                                       │
└────────────────────────────────────────────────────────┘
```

### Container Startup Order

```
fastion_mongo (healthy)
      ↓
fastion_backend (healthy)
      ↓
fastion_frontend + fastion_admin
      ↓
fastion_nginx
```

### Backend Dockerfile (Production)

```dockerfile
# ==============================================================
# 🚀 Backend Dockerfile - Fastion E-Commerce
# Base: Node.js 21 Alpine (Lightweight & Secure)
# ==============================================================

FROM node:21-alpine

WORKDIR /app

# Required for bcrypt and other native modules on Alpine Linux
# python3, make, g++ → C++ native module compilation tools
# wget → Used by Docker healthcheck
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    wget

ENV NODE_ENV=production

# Layer caching optimization — copy package files first
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Security: Non-root user
RUN addgroup --system appgroup \
    && adduser -S appuser -G appgroup \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget -q --spider http://localhost:4000/health || exit 1

CMD ["node", "server.js"]
```

### Frontend/Admin Dockerfile (Production)

```dockerfile
# ==============================================================
# Stage 1: BUILD
# ==============================================================
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ==============================================================
# Stage 2: SERVE
# ==============================================================
FROM nginx:1.25-alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# Non-root user security
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid \
    /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## ✅ Prerequisites

Make sure you have these installed on your server:

```bash
# Docker
docker --version          # Docker version 24.x or higher

# Docker Compose
docker compose version    # Docker Compose version 2.x

# Git
git --version

# curl (for testing)
curl --version
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# =============================================
# DATABASE
# =============================================
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecommerce

# =============================================
# IMAGE UPLOAD — CLOUDINARY
# =============================================
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# =============================================
# AUTHENTICATION
# =============================================
JWT_SECRET=your_super_strong_random_secret_key_here

# =============================================
# ADMIN CREDENTIALS
# =============================================
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_strong_admin_password

# =============================================
# PAYMENT GATEWAY
# =============================================
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# =============================================
# SERVER
# =============================================
PORT=4000

# =============================================
# FRONTEND BUILD (Vite bake karta hai build time pe)
# =============================================
VITE_BACKEND_URL=http://your_server_ip_or_domain
```

> ⚠️ **NEVER push `.env` to GitHub!** Always add it to `.gitignore`

```bash
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/biswajit7815/Faction-Ecommerce-web-deployment.git
cd Faction-Ecommerce-web-deployment
```

### 2. Create Environment File

```bash
cp .env.example .env
nano .env
# Fill in all the required values
```

### 3. Build & Start All Containers

```bash
docker-compose up -d --build
```

### 4. Verify All Containers Are Running

```bash
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                NAMES              STATUS
xxxxxxxxxxxx   nginx:alpine         fastion_nginx      Up (healthy)
xxxxxxxxxxxx   ...-frontend         fastion_frontend   Up
xxxxxxxxxxxx   ...-admin            fastion_admin      Up
xxxxxxxxxxxx   ...-backend          fastion_backend    Up (healthy)
xxxxxxxxxxxx   mongo:6.0            fastion_mongo      Up (healthy)
```

### 5. Seed Products (Optional)

```bash
# Copy seed script to container
docker cp backend/seedProducts.js fastion_backend:/app/seedProducts.js

# Run seed script
docker exec fastion_backend node seedProducts.js
```

---

## 🌐 Production Deployment

### AWS EC2 Setup

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 3. Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# 4. Install Docker Compose
sudo apt install docker-compose-plugin -y

# 5. Verify installation
docker --version
docker compose version
```

### Deploy Application

```bash
# Clone project
git clone https://github.com/biswajit7815/Faction-Ecommerce-web-deployment.git
cd Faction-Ecommerce-web-deployment

# Create .env file
nano .env
# (Add all environment variables)

# Build and start
docker-compose up -d --build

# Check status
docker ps
docker-compose logs -f
```

### Update Deployment (CI/CD Manual)

```bash
# Pull latest code
git pull origin main

# Rebuild only changed services
docker-compose up -d --build

# OR full rebuild (no cache)
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📡 API Endpoints

### User Routes — `/api/user`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/user/register` | Register new user | ❌ |
| POST | `/api/user/login` | Login user | ❌ |
| POST | `/api/user/admin` | Admin login | ❌ |

### Product Routes — `/api/product`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/product/list` | Get all products | ❌ |
| POST | `/api/product/add` | Add new product | ✅ Admin |
| POST | `/api/product/remove` | Remove product | ✅ Admin |
| POST | `/api/product/single` | Get single product | ❌ |

### Cart Routes — `/api/cart`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/cart/add` | Add item to cart | ✅ User |
| POST | `/api/cart/update` | Update cart item | ✅ User |
| POST | `/api/cart/get` | Get user cart | ✅ User |

### Order Routes — `/api/order`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/order/place` | Place COD order | ✅ User |
| POST | `/api/order/stripe` | Place Stripe order | ✅ User |
| POST | `/api/order/userorders` | Get user orders | ✅ User |
| POST | `/api/order/list` | Get all orders | ✅ Admin |
| POST | `/api/order/status` | Update order status | ✅ Admin |

### Health Check

```bash
GET /health → "Server is Healthy"
```

---

## ⚙️ Nginx Configuration

### Main Reverse Proxy (`nginx/nginx.conf`)

```nginx
events {
    worker_connections 1024;
}

http {
    # Docker internal DNS resolver
    resolver 127.0.0.11 valid=30s;
    resolver_timeout 10s;

    include       mime.types;
    default_type  application/octet-stream;

    # Performance: Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;

    # Security: Hide Nginx version
    server_tokens off;

    server {
        listen 80;
        server_name _;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
        add_header X-XSS-Protection "1; mode=block";

        # Backend API
        location /api/ {
            proxy_pass http://backend:4000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_connect_timeout 60s;
            proxy_read_timeout 60s;
        }

        # Admin Panel
        location /admin/ {
            proxy_pass http://admin:80/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        # Frontend (Main Website)
        location / {
            proxy_pass http://frontend:80;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

---

## ❌ Errors Faced & Solutions

This section documents all real errors encountered during deployment and their exact fixes.

---

### Error 1: 502 Bad Gateway

```
upstream prematurely closed connection while reading response header from upstream
```

**Cause:** Backend crash ho raha tha request pe — specifically `/api/user/register` pe.

**Diagnosis:**
```bash
docker logs fastion_backend --tail=100
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com","password":"test1234"}'
# Output: Empty reply from server
```

**Root Cause:** `bcrypt` native module 2-stage Docker build mein crash ho raha tha.

**Fix:**
```dockerfile
# WRONG ❌ — 2 stage build (Debian → Alpine)
FROM node:21 AS builder
RUN npm install          # Compiled for Debian
FROM node:21-alpine
COPY node_modules .      # Debian modules crash on Alpine!

# CORRECT ✅ — Single stage Alpine
FROM node:21-alpine
RUN apk add --no-cache python3 make g++ wget
RUN npm install          # Compiled for Alpine ✅
```

**Lesson:** Native modules (bcrypt, sharp, canvas) hamesha same OS pe compile aur run hone chahiye!

---

### Error 2: MongoDB Atlas IP Not Whitelisted

```
MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster.
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

**Cause:** AWS server ka IP MongoDB Atlas network access mein add nahi tha.

**Fix:**
```
1. cloud.mongodb.com → Login
2. Left Sidebar → Network Access
3. Add IP Address → 0.0.0.0/0 (Allow from anywhere)
4. Confirm → Wait 2-3 minutes for "Active" status
```

**Production Tip:** Use specific IP (`13.233.30.149/32`) instead of `0.0.0.0/0` for better security.

---

### Error 3: MongoDB Authentication Failed

```
MongoServerError: bad auth: authentication failed
```

**Cause:** `.env` mein purana ya galat MongoDB password tha.

**Fix:**
```bash
# Step 1: Atlas pe password reset karo
# cloud.mongodb.com → Database Access → Edit User → Change Password

# Step 2: .env update karo
nano .env
MONGODB_URL=mongodb+srv://username:NEW_PASSWORD@cluster.mongodb.net/ecommerce

# Step 3: Backend restart karo
docker-compose up -d --force-recreate backend
```

---

### Error 4: Invalid Namespace `/e-commerce`

```
MongoServerError: Invalid namespace specified: /e-commerce.users
```

**Cause:** MongoDB database name mein hyphen `-` allowed nahi hai.

**Fix:**
```js
// WRONG ❌
await mongoose.connect(`${MONGODB_URL}/e-commerce`)

// CORRECT ✅
await mongoose.connect(`${MONGODB_URL}/ecommerce`)
```

---

### Error 5: Double Database Name `ecommerce/ecommerce`

```
MongoServerError: Invalid namespace specified: ecommerce/ecommerce.products
```

**Cause:** `.env` mein `/ecommerce` tha aur `mongodb.js` mein bhi `/ecommerce` hardcoded tha.

**Fix — DRY Principle (Don't Repeat Yourself):**
```js
// mongodb.js — hardcoded name hata do
// WRONG ❌
await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`)

// CORRECT ✅
await mongoose.connect(process.env.MONGODB_URL)
```

```env
# .env — sirf yahan database name rakho
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
```

---

### Error 6: `host not found in upstream "backend"`

```
nginx: [emerg] host not found in upstream "backend" in /etc/nginx/nginx.conf:29
```

**Cause:** Nginx start hote waqt backend container DNS resolve nahi kar pa raha tha.

**Fix:**
```nginx
http {
    # Docker internal DNS resolver — MUST add this!
    resolver 127.0.0.11 valid=30s;
    resolver_timeout 10s;
    # ... rest of config
}
```

---

### Error 7: Permission Denied — Container Stop/Remove

```
Error response from daemon: cannot stop container: permission denied
```

**Cause:** `docker-compose.yml` mein `privileged: true` tha — containers OS level lock ho gaye the.

**Fix — Remove from docker-compose.yml:**
```yaml
# REMOVE THESE LINES ❌
privileged: true
security_opt:
  - apparmor:unconfined
```

**Emergency Fix (if already stuck):**
```bash
sudo systemctl stop docker.socket
sudo systemctl stop docker
sudo systemctl start containerd
sleep 3
sudo systemctl start docker
sleep 5

# Kill by PID
sudo kill -9 $(docker inspect --format '{{.State.Pid}}' fastion_frontend)
sudo kill -9 $(docker inspect --format '{{.State.Pid}}' fastion_admin)

# Force remove all
docker rm -f $(docker ps -aq)
docker-compose up -d
```

---

### Error 8: Port 80 Already in Use

```
failed to bind host port 0.0.0.0:80/tcp: address already in use
```

**Cause:** Purana `docker-proxy` process port 80 hold kar raha tha.

**Fix:**
```bash
# Find process using port 80
sudo lsof -i :80

# Kill it
sudo kill -9 21241 21246   # Use actual PIDs from above output

# Start containers
docker-compose up -d
```

---

### Error 9: Admin Panel Blank — MIME Type Error

```
Failed to load module script: Expected a JavaScript-or-Wasm module script
but the server responded with a MIME type of "text/html"
```

**Cause:** Admin app `/admin/` path pe serve ho rahi thi lekin Vite ne assets `/assets/...` path pe build kiye the.

**Fix — `admin/vite.config.js`:**
```js
// WRONG ❌
export default defineConfig({
  plugins: [react()]
})

// CORRECT ✅
export default defineConfig({
  base: '/admin/',   // Add this!
  plugins: [react()]
})
```

```bash
# Rebuild admin
docker-compose build --no-cache admin
docker-compose up -d
```

---

### Error 10: Wrong URL Baked in Frontend Bundle

**Symptom:** Frontend `localhost` ko API call kar raha tha instead of actual server IP.

**Cause:** Vite build time pe environment variables bundle mein bake karta hai. Agar `.env` mein `VITE_BACKEND_URL=http://localhost` tha jab build hua — permanently bundle mein aa gaya.

**Diagnosis:**
```bash
docker exec fastion_frontend grep -o 'http://[^"]*' /usr/share/nginx/html/assets/*.js | head -5
# Agar localhost dikhe → problem hai
```

**Fix:**
```bash
# Step 1: .env correct karo
VITE_BACKEND_URL=http://13.233.30.149

# Step 2: NO-CACHE rebuild (important!)
docker-compose build --no-cache frontend admin
docker-compose up -d

# Step 3: Verify
docker exec fastion_frontend grep -o '13\.233\.30\.149' /usr/share/nginx/html/assets/*.js
```

---

### Error 11: Server Hangs — `connectDB()` Not Awaited

**Symptom:** Backend start hota hai, DB connect hota hai, but register/login requests hang hoti hain — koi response nahi aata.

**Cause:**
```js
// WRONG ❌ — async functions without await
connectDB()        // DB connect hone ka wait nahi kiya
connectCloudinary() // Cloudinary connect hone ka wait nahi kiya
app.listen(4000)   // Server start ho gaya before DB connected!
```

**Fix:**
```js
// CORRECT ✅ — Proper async/await pattern
const startServer = async () => {
    await connectDB()           // Wait for DB connection
    await connectCloudinary()   // Wait for Cloudinary
    app.listen(port, () => {
        console.log("Server running on port " + port)
    })
}

startServer()
```

---

### Error 12: GitHub Push Rejected — Secret Detected

```
remote: error: GH013: Repository rule violations found
remote: - Push cannot contain secrets
remote: —— Stripe Test API Secret Key ————
```

**Cause:** `.env` file accidentally git mein add ho gayi with secret keys.

**Fix:**
```bash
# Step 1: .gitignore mein .env add karo
echo ".env" >> .gitignore
echo "*.env" >> .gitignore

# Step 2: Git tracking se remove karo
git rm --cached .env
git rm --cached frontend/.env 2>/dev/null

# Step 3: Commit karo
git add .gitignore
git commit -m "chore: remove .env from git tracking"

# Step 4: History clean karo
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Step 5: Force push
git push origin main --force
```

**Immediately rotate exposed secrets:**
- Stripe → [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) → Roll Key
- MongoDB → Atlas → Database Access → Change Password
- Cloudinary → Console → Security → Regenerate API Secret

---

### Error 13: npm ci ERESOLVE — Peer Dependency Conflict

```
npm error ERESOLVE could not resolve
npm error peer react@"^16.0.0 || ^17.0.0 || ^18.0.0" from react-loader-spinner@6.1.6
npm error Found: react@19.1.0
```

**Cause:** `react-loader-spinner@6.1.6` React 19 support nahi karta — React 18 tak hi support hai.

**Fix — Dockerfile mein:**
```dockerfile
# WRONG ❌
RUN npm ci

# CORRECT ✅
RUN npm ci --legacy-peer-deps
```

---

## 🔐 Security Checklist

```
✅ .env hamesha .gitignore mein rakho
✅ privileged: true kabhi use mat karo production mein
✅ Non-root user Docker containers mein use karo
✅ Exposed secrets turant rotate karo
✅ MongoDB specific IP whitelist karo production mein
✅ JWT_SECRET strong random string honi chahiye (32+ chars)
✅ NODE_ENV=production set karo
✅ server_tokens off nginx mein rakho
✅ Security headers add karo (X-Frame, X-XSS, X-Content-Type)
✅ Resource limits set karo containers pe (CPU, Memory)
✅ Log rotation set karo (max-size, max-file)
✅ HTTPS use karo (SSL/TLS — Let's Encrypt)
✅ Rate limiting add karo Nginx mein
```

---

## 🏗️ DevOps Best Practices

### Docker Best Practices

```
✅ Single stage Alpine build for native modules (bcrypt)
✅ python3 make g++ add karo bcrypt compilation ke liye
✅ Non-root user use karo security ke liye
✅ Health checks add karo sab containers mein
✅ restart: unless-stopped use karo (not always)
✅ Resource limits set karo (CPU, Memory)
✅ Log limits set karo (max-size: 10m, max-file: 3)
✅ Layer caching optimize karo (package.json pehle copy karo)
✅ .dockerignore file banao (node_modules, .env, .git)
✅ Multi-stage builds use karo frontend ke liye
```

### Nginx Best Practices

```
✅ server_tokens off (version hide karo)
✅ gzip compression enable karo
✅ Security headers add karo
✅ resolver 127.0.0.11 add karo Docker DNS ke liye
✅ proxy timeouts set karo
✅ X-Forwarded-For headers pass karo
✅ Trailing slash correctly handle karo
```

### Git Best Practices

```
✅ .env kabhi commit mat karo
✅ .gitignore pehle banao project start karte hi
✅ Meaningful commit messages likho
✅ Secrets expose hone par turant rotate karo
✅ git filter-branch se history clean karo
```

---

## 🛠️ Quick Debug Commands

```bash
# ============================================
# CONTAINER MANAGEMENT
# ============================================

# Sab containers ka status dekho
docker ps -a

# Specific container ki live logs dekho
docker logs fastion_backend -f
docker logs fastion_nginx -f
docker logs fastion_frontend -f

# Container ke andar jaao
docker exec -it fastion_backend sh

# Container ka IP dekho
docker inspect fastion_backend | grep IPAddress

# ============================================
# TESTING
# ============================================

# Backend health check
curl http://localhost:4000/health

# API direct test
curl http://localhost/api/product/list

# Register test
curl -X POST http://localhost/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"test","email":"test@test.com","password":"test1234"}'

# Nginx config test
docker exec fastion_nginx nginx -t

# ============================================
# RESTART & REBUILD
# ============================================

# Single container restart
docker restart fastion_backend

# All containers restart
docker-compose restart

# Full rebuild (no cache)
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Single service rebuild
docker-compose up -d --build backend
docker-compose up -d --build frontend admin

# Force recreate (new env variables apply karne ke liye)
docker-compose up -d --force-recreate backend

# ============================================
# TROUBLESHOOTING
# ============================================

# Port 80 kaun use kar raha hai?
sudo lsof -i :80
sudo ss -tlnp | grep :80

# Kill port 80 process
sudo kill -9 $(sudo lsof -t -i :80)

# Docker daemon restart (permission issues)
sudo systemctl stop docker.socket
sudo systemctl stop docker
sudo systemctl start containerd
sleep 3
sudo systemctl start docker
sleep 5

# Force remove all containers (emergency)
docker rm -f $(docker ps -aq)

# Kill container by PID (permission denied fix)
sudo kill -9 $(docker inspect --format '{{.State.Pid}}' fastion_backend)

# ============================================
# MONITORING
# ============================================

# Container resource usage
docker stats

# All container logs at once
docker-compose logs -f --tail=20

# Check container environment variables
docker exec fastion_backend node -e "import('dotenv/config').then(()=>console.log(process.env.MONGODB_URL))"

# Verify built-in URL in frontend
docker exec fastion_frontend grep -o '13\.233\.30\.149' /usr/share/nginx/html/assets/*.js

# Database product count
docker exec fastion_backend node -e "
import('dotenv/config').then(async () => {
  const m = await import('mongoose');
  await m.default.connect(process.env.MONGODB_URL);
  const count = await m.default.connection.collection('products').countDocuments();
  console.log('Products:', count);
  await m.default.connection.close();
});"

# ============================================
# CLEANUP
# ============================================

# Remove unused images
docker image prune -f

# Remove unused volumes
docker volume prune -f

# Full system cleanup (careful!)
docker system prune -af
```

---

## 🗄️ Database Schema

### Users Collection
```js
{
  _id: ObjectId,
  name: String,           // "Biswajit Behera"
  email: String,          // unique, "b@gmail.com"
  password: String,       // bcrypt hashed
  cartData: Object,       // { productId: quantity }
  createdAt: Date
}
```

### Products Collection
```js
{
  _id: ObjectId,
  name: String,           // "Blue Cotton Shirt"
  description: String,    // Product description
  price: Number,          // 500 (in INR)
  image: Array,           // ["cloudinary_url_1", "url_2"]
  category: String,       // "Men" | "Women" | "Kids"
  subCategory: String,    // "Topwear" | "Bottomwear" | "Winterwear"
  sizes: Array,           // ["S", "M", "L", "XL"]
  bestSeller: Boolean,    // true | false
  date: Number            // timestamp
}
```

### Orders Collection
```js
{
  _id: ObjectId,
  userId: ObjectId,       // Reference to user
  items: Array,           // [{productId, quantity, size}]
  amount: Number,         // Total amount
  address: Object,        // Delivery address
  status: String,         // "Order Placed" | "Packing" | "Shipped" | "Delivered"
  paymentMethod: String,  // "COD" | "Stripe" | "Razorpay"
  payment: Boolean,       // Payment received or not
  date: Date
}
```

---

## 🤝 Contributing

```bash
# 1. Fork the repository

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "feat: add your feature description"

# 4. Push to branch
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
```

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation update
chore: maintenance task
refactor: code refactoring
perf: performance improvement
security: security fix
```

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Biswajit Behera**
- GitHub: [@biswajit7815](https://github.com/biswajit7815)
- Project: [Fastion E-Commerce](https://github.com/biswajit7815/Faction-Ecommerce-web-deployment)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by Biswajit Behera | DevOps Engineer

</div>
