import endpoint from "./configTypes";
import { test } from "@playwright/test";
import { delay } from "./utils"

test('It should render webgl using GPU hardware acceleration', async ({ page }) => {
  await page.goto(endpoint.URL);

  await delay(5000);
  
  await page.screenshot({ path: `screenshots/webgl.png` });
});
