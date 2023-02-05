import * as express from "express";
import { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import { chromium } from "playwright";
import { randomUUID } from "crypto";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/screenshot", async (req: Request, res: Response) => {
  let url = req.query.url as string;
  let seconds = parseInt(req.query.delay as string) ?? 0;
  let consoleMessageDelay = req.query.consoleMessageDelay as string;

  const browser = await chromium.launch({ headless: true, args:[
    "--use-angle=egl",
    "--no-sandbox",
    "--headless",
    "--enable-logging",
    "--hide-scrollbars",
    "--disable-lcd-text",
    "--printBackground=true",
    "--disable-dev-shm-usage",
    "--font-render-hinting=none"
  ] });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);

  if (seconds > 0) {
    await page.waitForTimeout(seconds * 1000);
  } else if (consoleMessageDelay) {
    await page.waitForEvent('console', {
        predicate(consoleMessage) {
          return consoleMessage.text() == consoleMessageDelay
        }
      })
    ;
  }

  const imagePath = `screenshots/${randomUUID()}.png`;
  await page.screenshot({ path: `public/${imagePath}` });
  await browser.close();

  res.json({
    image: imagePath,
    timestamp: new Date().toTimeString()
  });

});
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
