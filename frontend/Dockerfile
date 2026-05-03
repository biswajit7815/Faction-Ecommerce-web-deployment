# ==========================================
# STAGE 1: BUILD ENVIRONMENT
# ==========================================
FROM node:20-alpine AS builder

# 1. System Dependencies:
# Alpine uses 'musl' while Node often needs 'glibc'.
# libc6-compat acts as a bridge for native library compatibility.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 2. Environment Variables:
# Passing build-time arguments (like API URLs) into Vite's environment
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# 3. Dependency Management:
# Copying manifests first leverages Docker's layer caching.
# If package.json hasn't changed, Docker skips 'npm ci'.
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# 4. Application Build:
# Copying source code and generating the optimized production 'dist' folder.
COPY . .
RUN npm run build


# ==========================================
# STAGE 2: PRODUCTION SERVE
# ==========================================
FROM nginx:1.25-alpine

# 1. Clean Slate:
# Remove default configs to ensure our custom nginx.conf is the only source of truth.
RUN rm -rf /etc/nginx/conf.d/*

# 2. Configuration & Assets:
# Copy custom Nginx rules and the static build from the builder stage.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

# 3. Security Hardening (Non-Root User):
# By default, Nginx runs as root. We prepare folders so the 'nginx'
# user can manage PIDs and logs without root privileges.
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Switch to non-root user so that a if nginx container me kuch bugs or error aya to
# hacker container ke bahar nehi ja sakta
USER nginx

# 4. expose the port number
EXPOSE 80

# 'daemon off' ensures Nginx stays in the foreground so Docker can monitor it.
CMD ["nginx", "-g", "daemon off;"]

