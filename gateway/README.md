# Fullstack Academy Gateway

This directory contains the gateway configuration that routes requests to the appropriate technology-specific modules.

## Directory Structure

```
gateway/
├── nginx/
│   ├── nginx.conf
│   ├── sites-available/
│   │   ├── react.conf
│   │   ├── laravel.conf
│   │   ├── node.conf
│   │   ├── tailwind.conf
│   │   └── sass.conf
│   └── sites-enabled/
│       ├── react.conf -> ../sites-available/react.conf
│       ├── laravel.conf -> ../sites-available/laravel.conf
│       ├── node.conf -> ../sites-available/node.conf
│       ├── tailwind.conf -> ../sites-available/tailwind.conf
│       └── sass.conf -> ../sites-available/sass.conf
├── docker-compose.yml
├── README.md
└── ssl/
    ├── fullchain.pem
    └── privkey.pem
```

## Nginx Configuration

The gateway uses Nginx as a reverse proxy to route requests to the appropriate module based on the URL path.

### Main Nginx Configuration (nginx.conf)

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    include /etc/nginx/conf.d/*.conf;
    
    # Load site configurations
    include /etc/nginx/sites-enabled/*;
}
```

### React Module Configuration (sites-available/react.conf)

```nginx
upstream react_backend {
    server react-frontend:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name react.fullstackacademy.local;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name react.fullstackacademy.local;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # React Application
    location / {
        proxy_pass http://react_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API Proxy
    location /api/ {
        proxy_pass http://react_backend:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Laravel Module Configuration (sites-available/laravel.conf)

```nginx
upstream laravel_backend {
    server laravel-app:8000;
}

server {
    listen 80;
    listen [::]:80;
    server_name laravel.fullstackacademy.local;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name laravel.fullstackacademy.local;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # Laravel Application
    location / {
        proxy_pass http://laravel_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # PHP-FPM Configuration (if using PHP-FPM directly)
    location ~ \.php$ {
        fastcgi_pass laravel-app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### Node.js Module Configuration (sites-available/node.conf)

```nginx
upstream node_backend {
    server node-app:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name node.fullstackacademy.local;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name node.fullstackacademy.local;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # Node.js Application
    location / {
        proxy_pass http://node_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # API Proxy (if separate API)
    location /api/ {
        proxy_pass http://node_backend:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Tailwind CSS Module Configuration (sites-available/tailwind.conf)

```nginx
upstream tailwind_backend {
    server tailwind-app:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name tailwind.fullstackacademy.local;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tailwind.fullstackacademy.local;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # Tailwind CSS Application
    location / {
        proxy_pass http://tailwind_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SASS Module Configuration (sites-available/sass.conf)

```nginx
upstream sass_backend {
    server sass-app:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name sass.fullstackacademy.local;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name sass.fullstackacademy.local;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;
    
    # SASS Application
    location / {
        proxy_pass http://sass_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Docker Compose Configuration

The gateway uses Docker Compose to manage all services:

```yaml
version: '3.8'

services:
  # Nginx Gateway
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/sites-available:/etc/nginx/sites-available
      - ./nginx/sites-enabled:/etc/nginx/sites-enabled
      - ./ssl:/etc/nginx/ssl
      - ./logs:/var/log/nginx
    depends_on:
      - react-frontend
      - laravel-app
      - node-app
      - tailwind-app
      - sass-app
    networks:
      - fullstack-network

  # React Module
  react-frontend:
    build: 
      context: ../modules/react/frontend
      dockerfile: Dockerfile
    volumes:
      - ../modules/react/frontend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    networks:
      - fullstack-network

  react-backend:
    build: 
      context: ../modules/react/backend
      dockerfile: Dockerfile
    volumes:
      - ../modules/react/backend:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true
    networks:
      - fullstack-network

  # Laravel Module
  laravel-app:
    build: 
      context: ../modules/laravel
      dockerfile: Dockerfile
    volumes:
      - ../modules/laravel:/var/www/html
    environment:
      - APP_ENV=local
      - APP_DEBUG=true
    networks:
      - fullstack-network

  # Node.js Module
  node-app:
    build: 
      context: ../modules/node/backend
      dockerfile: Dockerfile
    volumes:
      - ../modules/node/backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    networks:
      - fullstack-network

  # Tailwind CSS Module
  tailwind-app:
    build: 
      context: ../modules/tailwind
      dockerfile: Dockerfile
    volumes:
      - ../modules/tailwind:/app
    networks:
      - fullstack-network

  # SASS Module
  sass-app:
    build: 
      context: ../modules/sass
      dockerfile: Dockerfile
    volumes:
      - ../modules/sass:/app
    networks:
      - fullstack-network

networks:
  fullstack-network:
    driver: bridge
```

## SSL Configuration

For HTTPS support, you'll need SSL certificates. For development, you can generate self-signed certificates:

```bash
# Create SSL directory
mkdir -p ssl

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/privkey.pem \
  -out ssl/fullchain.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=fullstackacademy.local"
```

## Hosts File Configuration

To access the modules locally, add entries to your hosts file:

```bash
# Add to /etc/hosts (Linux/Mac) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 react.fullstackacademy.local
127.0.0.1 laravel.fullstackacademy.local
127.0.0.1 node.fullstackacademy.local
127.0.0.1 tailwind.fullstackacademy.local
127.0.0.1 sass.fullstackacademy.local
```

## Starting the Gateway

To start all services:

```bash
docker-compose up -d
```

To stop all services:

```bash
docker-compose down
```

## Monitoring and Logging

The gateway includes logging for monitoring:

```bash
# View Nginx logs
docker-compose logs nginx

# View logs for a specific service
docker-compose logs react-frontend
```

## Load Balancing

For production deployments, you can configure load balancing:

```nginx
upstream react_backend {
    server react-frontend-1:3000;
    server react-frontend-2:3000;
    server react-frontend-3:3000;
}
```

## Caching

Nginx can be configured for caching:

```nginx
# Add to http block
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                 inactive=60m use_temp_path=off;

# In server block
location / {
    proxy_cache my_cache;
    proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
    proxy_cache_valid 200 1h;
    proxy_cache_valid any 1m;
    proxy_cache_lock on;
    proxy_pass http://react_backend;
    # ... other proxy settings
}
```

## Rate Limiting

To prevent abuse, rate limiting can be configured:

```nginx
# Add to http block
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# In location block
location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://react_backend;
    # ... other proxy settings
}
```

## Health Checks

Nginx can perform health checks on upstream servers:

```nginx
upstream react_backend {
    server react-frontend:3000 max_fails=3 fail_timeout=30s;
}
```

This configuration provides a robust gateway that routes requests to the appropriate technology-specific modules, ensuring each module can be developed and deployed independently while maintaining a unified user experience.