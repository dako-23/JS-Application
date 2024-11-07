import { chromium } from 'playwright-chromium'

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('https://www.facebook.com/emil.iordanov.7');
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
















































const url = 'https://www.facebook.com/emil.iordanov.7';