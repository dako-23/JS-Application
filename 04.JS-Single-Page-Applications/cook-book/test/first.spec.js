import { chromium } from 'playwright-chromium'
import { expect } from 'chai';

it('should make a screenshot', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.megaparts.bg');
    await page.screenshot({ path: 'screenshot.png' });
    await browser.close();
})

















































