const puppeteer = require('puppeteer');
const C = require('./constants');
const USERNAME_SELECTOR = '#user_login';
const PASSWORD_SELECTOR = '#user_password';
const CTA_SELECTOR = '#new_user > button'; 



async function startBrowser() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  return {browser, page};
}

async function closeBrowser(browser) {
  return browser.close();
}

async function playTest(url) {
  const {browser, page} = await startBrowser();
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(C.username);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(C.password);
//   const form = await page.$(CTA_SELECTOR);
//   await form.evaluate( form => form.click() );
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: 'screenshot.png'});
}

(async () => {
  await playTest("https://kza.jewellabs.net/user/sign_in");
  process.exit(10);
})();