import { chromium, Browser, Page } from 'playwright';

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch(); // Launch the browser
  page = await browser.newPage(); // Open a new page
});

afterAll(async () => {
  await browser.close(); // Close the browser after the tests
});

export { page }; // Export the page object for use in tests
