import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'qz9vg3',
  e2e: {
    video: true,
    videoUploadOnPasses: true,
  },
});
