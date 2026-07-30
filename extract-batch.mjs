import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EMAIL = '7fenilpatel@gmail.com';

async function main() {
  console.log('Launching Edge browser...');
  const browser = await chromium.launch({ executablePath: EDGE_PATH, headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // Login
  console.log('Logging in...');
  await page.goto('https://examens.preptcfcanada.com/iump-login/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  // Fill login form
  const emailInput = page.locator('input[name="login_username"], input[name="user_login"], #user_login, input[type="email"]').first();
  const passInput = page.locator('input[name="login_password"], input[name="user_pass"], #user_pass, input[type="password"]').first();
  await emailInput.fill(EMAIL);
  // We need the password - prompt user
  console.log('ERROR: Need password for login. Please add password to this script.');
  console.log('Alternative: Using cookie-based approach...');
  await browser.close();
  process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
