const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qz9vg3',
  e2e: {
    video: true,
    videoUploadOnPasses: true,
  },
});
