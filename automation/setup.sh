#!/bin/bash
# Install Python automation dependencies on the Pi
set -e

APP_DIR="/var/www/nepaliwave"
AUTO_DIR="$APP_DIR/automation"

echo "[SETUP] Installing Python dependencies..."
sudo apt-get install -y python3-pip python3-venv

echo "[SETUP] Creating virtual environment..."
python3 -m venv "$AUTO_DIR/venv"
source "$AUTO_DIR/venv/bin/activate"
pip install --upgrade pip -q
pip install -r "$AUTO_DIR/requirements.txt" -q

echo "[SETUP] Setting up .env..."
if [ ! -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env.example" "$APP_DIR/.env"
    echo ""
    echo "  ⚠️  Edit $APP_DIR/.env and add your API keys, then run:"
    echo "     source $AUTO_DIR/venv/bin/activate"
    echo "     cd $AUTO_DIR && python run.py"
else
    echo "  .env already exists — skipping"
fi

echo "[SETUP] Installing cron job (every 2 hours)..."
CRON_CMD="0 */2 * * * cd $AUTO_DIR && $AUTO_DIR/venv/bin/python run.py >> /var/log/nepaliwave-automation.log 2>&1"
( crontab -l 2>/dev/null | grep -v "nepaliwave"; echo "$CRON_CMD" ) | crontab -

echo ""
echo "================================================"
echo "  Automation setup complete!"
echo "================================================"
echo ""
echo "  1. Add your API keys to $APP_DIR/.env"
echo "  2. Test manually:"
echo "     cd $AUTO_DIR"
echo "     source venv/bin/activate"
echo "     python run.py"
echo ""
echo "  Cron runs every 2 hours automatically."
echo "  Logs: tail -f /var/log/nepaliwave-automation.log"
echo ""
