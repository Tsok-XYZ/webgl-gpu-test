import * as express from "express";
import { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as path from 'path';
import { chromium } from "playwright";
import { randomUUID } from "crypto";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/screenshot", async (req: Request, res: Response) => {
  let url = req.query.url as string;

  let seconds = parseInt(req.query.delay as string) ?? 0;
  let consoleMessageDelay = req.query.consoleMessageDelay as string;

  let width = parseInt(req.query.width as string);
  width = width > 0 ? width : 1024
  let height = parseInt(req.query.height as string) ?? width;
  height = height > 0 ? height : width

  const browser = await chromium.launch({ headless: true, args:[
    "--use-angle=gles-egl",
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
  await page.setViewportSize({ width: width, height: height });

  await page.goto(url);

  page.on('pageerror', error => console.log("######", error));
  page.on("console", (message) => {
    console.log("----->", message.text());
  });

  if (seconds > 0 && consoleMessageDelay) {
    try {
        await page.waitForEvent('console', {
            predicate(consoleMessage) {
              return consoleMessage.text() == consoleMessageDelay
            },
            timeout: seconds * 1000
          });
    } catch (error) {
        res.json(error)
        return;
    }
  } else if (seconds > 0) {
    await page.waitForTimeout(seconds * 1000);
  }

  const imagePath = `screenshots/${randomUUID()}.png`;
  await page.screenshot({ path: `public/${imagePath}` });
  await browser.close();

  res.sendFile(imagePath, {
    root: process.env.SCREENSHOTS_PATH
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
