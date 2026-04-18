#!/bin/bash
# NepaliWave — Raspberry Pi setup script
# Run as root: sudo bash setup.sh

set -e

REPO_URL="https://github.com/arijal1/nepaliwave.git"
BRANCH="claude/nepali-news-portal-design-DbHGR"
APP_DIR="/var/www/nepaliwave"
APP_USER="nepaliwave"
APP_PORT="3000"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
die()  { echo -e "${RED}[✗]${NC} $1"; exit 1; }

[ "$EUID" -eq 0 ] || die "Please run as root: sudo bash setup.sh"

echo ""
echo "================================================"
echo "  NepaliWave — Raspberry Pi Deployment Setup"
echo "================================================"
echo ""

# ── 1. System update ──────────────────────────────
log "Updating system packages..."
apt-get update -qq && apt-get upgrade -y -qq

# ── 2. Install dependencies ───────────────────────
log "Installing dependencies (git, nginx, curl)..."
apt-get install -y -qq git nginx curl

# ── 3. Node.js 20 LTS via NodeSource ─────────────
if command -v node &>/dev/null && [[ $(node -v) == v20* ]]; then
  log "Node.js 20 already installed: $(node -v)"
else
  log "Installing Node.js 20 LTS..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - -qq
  apt-get install -y -qq nodejs
fi
log "Node.js: $(node -v) | npm: $(npm -v)"

# ── 4. Create app user ────────────────────────────
if id "$APP_USER" &>/dev/null; then
  log "User '$APP_USER' already exists"
else
  log "Creating user '$APP_USER'..."
  useradd --system --shell /bin/bash --home "$APP_DIR" --create-home "$APP_USER"
fi

# ── 5. Clone / update repo ────────────────────────
if [ -d "$APP_DIR/.git" ]; then
  log "Repo exists — pulling latest..."
  sudo -u "$APP_USER" git -C "$APP_DIR" fetch origin
  sudo -u "$APP_USER" git -C "$APP_DIR" checkout "$BRANCH"
  sudo -u "$APP_USER" git -C "$APP_DIR" pull origin "$BRANCH"
else
  log "Cloning repository..."
  rm -rf "$APP_DIR"
  sudo -u "$APP_USER" git clone --branch "$BRANCH" "$REPO_URL" "$APP_DIR"
fi

# ── 6. Install npm dependencies and build ─────────
log "Installing npm dependencies..."
cd "$APP_DIR"
sudo -u "$APP_USER" npm ci --silent

log "Building Next.js app (this takes a few minutes on Pi)..."
sudo -u "$APP_USER" npm run build

# ── 7. Systemd service ────────────────────────────
log "Installing systemd service..."
cp "$APP_DIR/deploy/nepaliwave.service" /etc/systemd/system/nepaliwave.service
systemctl daemon-reload
systemctl enable nepaliwave
systemctl restart nepaliwave
log "App service started on port $APP_PORT"

# ── 8. Nginx config ───────────────────────────────
log "Configuring nginx..."
cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/nepaliwave
ln -sf /etc/nginx/sites-available/nepaliwave /etc/nginx/sites-enabled/nepaliwave
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
log "Nginx configured"

# ── 9. Cloudflared install ────────────────────────
if command -v cloudflared &>/dev/null; then
  log "cloudflared already installed: $(cloudflared --version)"
else
  log "Installing cloudflared..."
  ARCH=$(dpkg --print-architecture)
  curl -fsSL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-${ARCH}.deb" -o /tmp/cloudflared.deb
  dpkg -i /tmp/cloudflared.deb
  rm /tmp/cloudflared.deb
fi

echo ""
echo "================================================"
echo -e "  ${GREEN}Setup complete!${NC}"
echo "================================================"
echo ""
echo "  Next.js app : running on port $APP_PORT"
echo "  Nginx       : proxying on port 80"
echo ""
echo "  Now set up Cloudflare Tunnel:"
echo "  $ cloudflared tunnel login"
echo "  $ cloudflared tunnel create nepaliwave"
echo "  Then follow deploy/cloudflare-tunnel.md"
echo ""
