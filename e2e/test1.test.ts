import { test } from './baseFixtures';
const v8toIstanbul = require('v8-to-istanbul');
const fs = require('fs')

function delay(time) {
  return new Promise(function(resolve) {
      setTimeout(resolve, time)
  });
}

test.beforeEach(async ({ page }) => {
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);

    // await page.goto("http://localhost:4200")
    await page.goto("http://localhost:8080")
  })

  test.afterEach(async ({ page }) => {
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    console.log(jsCoverage);

    // const coverage = await page.coverage.stopJSCoverage();
    for (const entry of jsCoverage) {

    //   console.log('KEYS', Object.keys(entry));
    //   console.log('URL', entry.url);
    //   // console.log(entry.source);
      const converter = new v8toIstanbul('', 0, { source: entry.source });
      await converter.load();
      converter.applyCoverage(entry.functions);
      console.log(JSON.stringify(converter.toIstanbul()));

      const fd = fs.openSync('scott.json', 'a')
      fs.writeSync(fd, JSON.stringify(converter.toIstanbul()));
    }
  })

test('click button', async ({ page }) => {
    await page.waitForSelector("button");
    await page.click('button');
    await page.waitForSelector(".message");
    // await page.pause();
  });