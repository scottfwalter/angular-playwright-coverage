import { test } from './baseFixtures';

function delay(time) {
  return new Promise(function(resolve) {
      setTimeout(resolve, time)
  });
}

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200")
  })

test('click button', async ({ page }) => {
    await page.waitForSelector("button");
    await page.click('button');
    await page.waitForSelector(".message");
    // await page.pause();
  });