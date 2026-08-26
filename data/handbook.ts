export interface HandbookArticle {
  id: string;
  title: string;
  slug: string;
  category: "vps_security" | "docker_linux" | "networking" | "deployment" | "database";
  categoryLabel: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  content: {
    summary: string;
    keyTakeaways: string[];
    codeSnippets?: {
      title: string;
      language: string;
      code: string;
    }[];
    notes?: string[];
  };
}

export const handbookCategories = [
  { key: "all", label: "All Handbook Topics" },
  { key: "vps_security", label: "🛡️ VPS Security & SSH" },
  { key: "docker_linux", label: "🐧 Docker & Kernel Tuning" },
  { key: "networking", label: "🌐 Traefik & Proxy" },
  { key: "deployment", label: "🚀 Blue-Green CI/CD" },
  { key: "database", label: "🗄️ PostgreSQL & Backups" },
];

export const handbookArticles: HandbookArticle[] = [
  {
    id: "ssh-hardening",
    slug: "ssh-hardening-non-root",
    title: "1. SSH Hardening & User Isolation on Production VPS",
    category: "vps_security",
    categoryLabel: "VPS Security",
    excerpt:
      "Essential server initialization: creating non-root sudo users, generating ed25519 SSH keys, disabling password authentication, and blocking direct root logins.",
    readTime: "6 min read",
    date: "Aug 2026",
    tags: ["SSH", "Security", "Linux", "Ubuntu", "DevOps"],
    content: {
      summary:
        "Direct root access with password authentication is the #1 vector for brute-force botnets. Hardening SSH access with dedicated user isolation and ed25519 cryptographic keys forms the cornerstone of server security.",
      keyTakeaways: [
        "Create dedicated non-root administrative user with sudo privileges.",
        "Generate modern ed25519 SSH key pairs and install to authorized_keys.",
        "Disable PasswordAuthentication and PermitRootLogin in /etc/ssh/sshd_config.",
        "Configure ClientAliveInterval and ClientAliveCountMax to prevent stale zombie connections.",
      ],
      codeSnippets: [
        {
          title: "SSH Server Configuration (/etc/ssh/sshd_config.d/99-hardened.conf)",
          language: "bash",
          code: `# Hardened SSH Configuration
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2`,
        },
        {
          title: "Restart and verify SSH daemon without getting locked out",
          language: "bash",
          code: `sudo sshd -t # Test syntax before restarting
sudo systemctl reload sshd || sudo systemctl reload ssh
# Keep existing terminal OPEN while testing login in a new session!`,
        },
      ],
      notes: [
        "Always test new SSH logins in a secondary terminal window before closing your current root session.",
      ],
    },
  },
  {
    id: "ufw-fail2ban",
    slug: "ufw-firewall-fail2ban-defense",
    title: "2. UFW Firewall Hardening & Fail2ban Brute-Force Defense",
    category: "vps_security",
    categoryLabel: "VPS Security",
    excerpt:
      "Configuring strict default-deny firewall policies with UFW and automated IP banning mechanisms with Fail2ban against automated SSH scans.",
    readTime: "7 min read",
    date: "Aug 2026",
    tags: ["UFW", "Fail2ban", "Firewall", "Security", "DDoS Mitigation"],
    content: {
      summary:
        "Exposing unguarded ports directly to the public internet makes services vulnerable to network reconnaissance and dictionary attacks. UFW and Fail2ban create a dynamic intrusion prevention barrier.",
      keyTakeaways: [
        "Enforce default deny incoming and allow outgoing network policies.",
        "Explicitly allow only required ports (SSH, HTTP 80, HTTPS 443).",
        "Enable Fail2ban jail with bantime.increment for exponentially punishing recurring attackers.",
        "Protect Docker socket and internal database ports from external binding.",
      ],
      codeSnippets: [
        {
          title: "UFW Firewall Setup",
          language: "bash",
          code: `sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh comment 'SSH Access'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable
sudo ufw status verbose`,
        },
        {
          title: "Fail2ban Local Configuration (/etc/fail2ban/jail.local)",
          language: "ini",
          code: `[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
bantime.increment = true
backend = systemd

[sshd]
enabled = true
port = ssh
filter = sshd
maxretry = 3
bantime = 24h`,
        },
      ],
    },
  },
  {
    id: "docker-log-rotation",
    slug: "docker-engine-log-rotation-limits",
    title: "3. Docker Engine Setup & Global Log Rotation Limits",
    category: "docker_linux",
    categoryLabel: "Docker & Linux",
    excerpt:
      "Prevent container runaway logs from silently filling server disk storage by configuring global log rotation in daemon.json and cgroup limits.",
    readTime: "5 min read",
    date: "Aug 2026",
    tags: ["Docker", "Log Rotation", "daemon.json", "Disk Space", "SysAdmin"],
    content: {
      summary:
        "By default, Docker container logs grow unbounded until they consume 100% of host disk space, crashing databases and microservices. Configuring daemon.json ensures automatic log truncation.",
      keyTakeaways: [
        "Install official Docker Engine native packages for Ubuntu instead of legacy snap or desktop wrappers.",
        "Set log-driver to json-file with max-size 10m and max-file 3 globally.",
        "Prevent disk I/O bottlenecks and OOM kernel crashes.",
      ],
      codeSnippets: [
        {
          title: "Global Docker Daemon Configuration (/etc/docker/daemon.json)",
          language: "json",
          code: `{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "live-restore": true
}`,
        },
        {
          title: "Apply Configuration and Reload Daemon",
          language: "bash",
          code: `sudo systemctl daemon-reload
sudo systemctl restart docker
docker info --format '{{.LoggingDriver}}' # Verify json-file`,
        },
      ],
    },
  },
  {
    id: "swap-kernel-tuning",
    slug: "linux-swap-kernel-tuning-oom",
    title: "4. Linux 2GB Swap Setup & Kernel Performance Tuning",
    category: "docker_linux",
    categoryLabel: "Docker & Linux",
    excerpt:
      "Safeguarding low-memory VPS instances against OOM killer termination using fallocate swapfiles and sysctl memory parameter tuning.",
    readTime: "6 min read",
    date: "Aug 2026",
    tags: ["Swap", "Kernel", "sysctl", "OOM Killer", "Memory Optimization"],
    content: {
      summary:
        "Cloud VPS instances can freeze abruptly when spikes in memory demand trigger the Linux Out-Of-Memory (OOM) killer. Configuring a 2GB swap space with low swappiness prevents critical service drops.",
      keyTakeaways: [
        "Allocate 2GB dedicated swap file using fallocate with 600 permissions.",
        "Tune vm.swappiness to 10 so swap is only utilized during real RAM starvation.",
        "Adjust vm.vfs_cache_pressure to 50 to prioritize filesystem inode caching.",
      ],
      codeSnippets: [
        {
          title: "Initialize and Enable Swapfile",
          language: "bash",
          code: `sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# Persist in /etc/fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`,
        },
        {
          title: "Kernel Tuning (/etc/sysctl.d/99-performance.conf)",
          language: "ini",
          code: `vm.swappiness = 10
vm.vfs_cache_pressure = 50
fs.file-max = 2097152
net.core.somaxconn = 65535`,
        },
      ],
    },
  },
  {
    id: "traefik-proxy",
    slug: "traefik-v3-reverse-proxy-automated-ssl",
    title: "5. Traefik v3 Reverse Proxy & Multi-Project SSL Automation",
    category: "networking",
    categoryLabel: "Networking",
    excerpt:
      "Automated edge routing for multiple Docker microservices and web apps with zero-config Let's Encrypt SSL auto-renewal and HTTP-to-HTTPS redirects.",
    readTime: "8 min read",
    date: "Aug 2026",
    tags: ["Traefik", "Let's Encrypt", "SSL", "Reverse Proxy", "Multi-Project"],
    content: {
      summary:
        "Traefik dynamically discovers running Docker containers via label inspection, automatically issuing and renewing TLS certificates via ACME Let's Encrypt without manual Nginx reload interventions.",
      keyTakeaways: [
        "Deploy Traefik on a shared external Docker bridge network (web_gateway).",
        "Enable ACME HTTP-01 challenge for hands-off wildcard and domain SSL.",
        "Enforce global HTTP to HTTPS redirect with HSTS headers.",
        "Route microservices seamlessly using container label decorators.",
      ],
      codeSnippets: [
        {
          title: "Traefik compose.yml Configuration",
          language: "yaml",
          code: `version: "3.8"
services:
  traefik:
    image: traefik:v3.1
    restart: unless-stopped
    command:
      - "--api.dashboard=false"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entryPoints.web.address=:80"
      - "--entryPoints.websecure.address=:443"
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=admin@example.com"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./letsencrypt:/letsencrypt
    networks:
      - web_gateway

networks:
  web_gateway:
    external: true`,
        },
      ],
    },
  },
  {
    id: "blue-green-deploy",
    slug: "zero-downtime-blue-green-deployment-script",
    title: "6. Zero-Downtime Blue-Green Deployment Automation",
    category: "deployment",
    categoryLabel: "Deployment",
    excerpt:
      "Production-proven bash deployment pipeline that spins up new container versions in parallel, verifies health status, switches traffic, and gracefully cleans up.",
    readTime: "9 min read",
    date: "Aug 2026",
    tags: ["Blue-Green", "CI/CD", "Zero-Downtime", "Bash Automation", "DevOps"],
    content: {
      summary:
        "Blue-Green deployment ensures 100% uptime during releases. The script spins up the new color (e.g. Green), polls the /actuator/health endpoint until 200 OK, re-points Traefik routing, and drains the old container (Blue).",
      keyTakeaways: [
        "Maintains two isolated application targets (Blue and Green).",
        "Validates health check before cutting over live production traffic.",
        "Instant zero-downtime rollback in the event of migration or boot errors.",
        "Integrated into GitHub Actions runner or standalone VPS webhooks.",
      ],
      codeSnippets: [
        {
          title: "Blue-Green Deployment Workflow Excerpt",
          language: "bash",
          code: `#!/usr/bin/env bash
set -eo pipefail

CURRENT_COLOR=$(docker ps --filter "name=app-" --format "{{.Names}}" | grep -oE "blue|green" || echo "blue")
TARGET_COLOR=$([[ "$CURRENT_COLOR" == "blue" ]] && echo "green" || echo "blue")

echo "--> Deploying $TARGET_COLOR instance..."
docker compose --profile "$TARGET_COLOR" up -d --build "app-$TARGET_COLOR"

echo "--> Polling healthcheck on port..."
for i in {1..30}; do
  if curl -sf "http://127.0.0.1:8080/actuator/health" | grep -q "UP"; then
    echo "✓ Target $TARGET_COLOR is healthy!"
    break
  fi
  sleep 2
done

echo "--> Stopping previous $CURRENT_COLOR instance..."
docker compose --profile "$CURRENT_COLOR" stop "app-$CURRENT_COLOR"
echo "Deployment successful with 0s downtime!"`,
        },
      ],
    },
  },
  {
    id: "postgres-s3-backup",
    slug: "postgresql-tuning-automated-s3-backup",
    title: "7. PostgreSQL 18 Tuning & Automated Cloud Backups to S3/R2",
    category: "database",
    categoryLabel: "Database",
    excerpt:
      "Memory parameter tuning for PostgreSQL in containerized environments, coupled with cron-automated compressed dumps encrypted and synced to cloud object storage.",
    readTime: "7 min read",
    date: "Aug 2026",
    tags: ["PostgreSQL", "S3", "Cloudflare R2", "Backups", "Disaster Recovery"],
    content: {
      summary:
        "A reliable database infrastructure requires tuned memory buffers for high query throughput, alongside automated, off-site encrypted disaster recovery snapshots pushed to S3/R2.",
      keyTakeaways: [
        "Calculate shared_buffers (25% RAM) and effective_cache_size (50-75% RAM).",
        "Automate pg_dump with gzip compression via systemd or cron timers.",
        "Stream encrypted backup archives to AWS S3 or Cloudflare R2 bucket with 30-day retention lifecycles.",
      ],
      codeSnippets: [
        {
          title: "Automated Daily Backup Script (/opt/scripts/backup-db.sh)",
          language: "bash",
          code: `#!/usr/bin/env bash
set -eo pipefail
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/backups/postgres"
FILE_NAME="db_backup_\${TIMESTAMP}.sql.gz"

mkdir -p "\${BACKUP_DIR}"

# Stream dump with gzip compression
docker exec -t postgres_db pg_dump -U postgres travel_db | gzip -9 > "\${BACKUP_DIR}/\${FILE_NAME}"

# Sync to Cloudflare R2 / AWS S3
aws s3 cp "\${BACKUP_DIR}/\${FILE_NAME}" s3://my-backup-bucket/postgres/ --endpoint-url https://<account_id>.r2.cloudflarestorage.com

# Prune local backups older than 7 days
find "\${BACKUP_DIR}" -type f -name "*.sql.gz" -mtime +7 -delete`,
        },
      ],
    },
  },
];
