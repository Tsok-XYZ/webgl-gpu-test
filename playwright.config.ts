const config = {
  use: {
    channel: "chrome",
    launchOptions: {
      // force GPU hardware acceleration
      // (even in headless mode)
      //   args: ["--use-gl=egl"],
      //   args: ["--use-gl=gles-egl"],
      //   args: ["--use-angle=gles-egl"],
      args: [
        "--use-gl=egl",
        "--no-sandbox",
        "--headless",
        "--enable-logging",
        "--hide-scrollbars",
        "--disable-lcd-text",
        "--printBackground=true",
        "--disable-dev-shm-usage",
        // "--disable-gpu",
        "--font-render-hinting=none",
      ],
    },
  },
};

export default config;
