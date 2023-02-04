import endpoint from "./configTypes";
import { test, expect } from "@playwright/test";

test('It should render webgl using GPU hardware acceleration', async ({ page }) => {
  await page.goto(endpoint.URL, { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'screenshots/webgl.png' });
});
