import { chromium } from "playwright-chromium";
import { expect } from "chai";

const baseUrl = 'http://localhost:3000';
let browser;
let page

before(async () => { browser = await chromium.launch({ headless: false, slowMo: 300 }); });
beforeEach(async () => { page = await browser.newPage(); })
afterEach(async () => { await page.close(); })
after(async () => { await browser.close(); })

//describe.skip/.only
describe('Home Page', async () => {
    it('should load the home page catalog', async () => {
        await page.goto(baseUrl);

        const isVisible = await page.isVisible('#home-section');
        expect(isVisible).to.be.true;
    });

    it('Should reload the datails page', async () => {
        await page.goto(baseUrl)

        await page.click('#home-section article:first-of-type');
        await page.waitForLoadState();

        expect(await page.isVisible('div.ingredients')).to.be.true;
    });
})

describe.only('Login Page', async () => {
    it('Should load default user', async () => {
        await page.goto(baseUrl)
        await page.click('a[href="/login"]');

        await page.fill('input[name=email]', 'peter@abv.bg');
        await page.fill('input[name=password]', '12345');
        await page.click('input[value=Login]');

        await page.waitForLoadState();

        expect(await page.isVisible('#home-section')).to.be.true;

    })


})