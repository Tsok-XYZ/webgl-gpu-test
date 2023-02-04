import { Browser, Page } from "playwright";

import * as fs from 'fs';
import * as toml from 'toml';
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

declare global {
  const page: Page;
  const browser: Browser;
  const browserName: string;
}

export default {
  URL: config.url ?? '',
};