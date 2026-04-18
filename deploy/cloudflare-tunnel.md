# Cloudflare Tunnel Setup for NepaliWave

Run these commands on your Raspberry Pi after `setup.sh` completes.

## Prerequisites
- A domain name added to Cloudflare (free plan works)
- If you don't have a domain, get one cheap at Porkbun or Namecheap (~£8/yr)

---

## Step 1 — Log in to Cloudflare

```bash
cloudflared tunnel login
```

This opens a browser link. Visit it, select your domain, and authorise.
A certificate is saved to `~/.cloudflared/cert.pem`.

---

## Step 2 — Create the tunnel

```bash
cloudflared tunnel create nepaliwave
```

Note the **tunnel ID** shown (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

---

## Step 3 — Create tunnel config

```bash
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

Paste this (replace `YOUR_TUNNEL_ID` and `yourdomain.com`):

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: nepaliwave.yourdomain.com
    service: http://localhost:80
  - service: http_status:404
```

---

## Step 4 — Route DNS

```bash
cloudflared tunnel route dns nepaliwave nepaliwave.yourdomain.com
```

This automatically creates a CNAME record in Cloudflare DNS.

---

## Step 5 — Run as a systemd service (auto-start)

```bash
cloudflared service install
systemctl enable cloudflared
systemctl start cloudflared
```

---

## Step 6 — Verify

```bash
systemctl status cloudflared
systemctl status nepaliwave
systemctl status nginx
```

All three should show `active (running)`.

Visit `https://nepaliwave.yourdomain.com` — your site is live with automatic HTTPS.

---

## Useful commands

```bash
# View live logs
journalctl -u nepaliwave -f

# Restart app after code update
cd /var/www/nepaliwave
sudo -u nepaliwave git pull origin claude/nepali-news-portal-design-DbHGR
sudo -u nepaliwave npm ci
sudo -u nepaliwave npm run build
sudo systemctl restart nepaliwave

# Check tunnel status
cloudflared tunnel info nepaliwave
```

---

## No domain? Quick test with a temporary URL

If you just want to test before buying a domain:

```bash
cloudflared tunnel --url http://localhost:80
```

Cloudflare gives you a temporary `*.trycloudflare.com` URL instantly — no login needed.
