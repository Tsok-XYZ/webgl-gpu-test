import endpoint from "./configTypes";
import { test, expect } from "@playwright/test";
import { Console } from "console";
import * as os from 'os'
test('It should take a snapshot of the GPU Chrome page', async ({ page }) => {
  await page.goto('chrome://gpu', { waitUntil: 'domcontentloaded' });
  const screenshotPath = `${os.tmpdir()}/screenshots/gpu.png`
  console.log(screenshotPath)
  await page.screenshot({ path: screenshotPath, fullPage: true, type: 'jpeg' });
  await expect(page.locator('text=Graphics Feature Status').first()).toBeVisible();
});
