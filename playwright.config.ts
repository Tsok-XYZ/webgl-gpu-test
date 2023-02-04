const config = {
  use: {
    channel: "chrome",
    launchOptions: {
      // force GPU hardware acceleration
      // (even in headless mode)
    //   args: ["--use-gl=egl"],
    //   args: ["--use-angle=gles-egl"],
      args: ["--use-angle=gles-egl"],
    },
  },
};

export default config;
