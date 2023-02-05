import endpoint from "./configTypes";
import { test } from "@playwright/test";

test('It should render webgl using GPU hardware acceleration', async ({ page }) => {
  await page.goto(endpoint.URL);

  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: `public/tests/webgl.png` });
});
