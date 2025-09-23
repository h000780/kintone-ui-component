import { chromeLauncher, defaultReporter } from "@web/test-runner";
export default {
  nodeResolve: {
    mainFields: ["module", "main", "browser"],
    exportConditions: ["production"],
  },
  files: "./unit_test/**/test/*.test.js",
  coverage: true,
  reporters: [
    defaultReporter({ reportTestResults: true, reportTestProgress: true }),
  ],
  coverageConfig: {
    nativeInstrumentation: true,
    report: true,
    reportDir: "coverage",
    reporters: ["text", "lcov"],
    // Instrument executed JS and remap to TS via sourcemaps
    include: ["unit_test/**/*.js"],
    // Exclude test files and helper bundles from coverage
    exclude: [
      "unit_test/**/test/**",
      "unit_test/index.bundle.js",
      "unit_test/dev-info.js",
      "unit_test/version.js",
      "node_modules/**",
      "lib/**",
      "umd/**",
      "demos/**",
      "docs/**",
      "scripts/**",
      "eslint-plugin-kuc-v1/**",
    ],
    threshold: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  browsers: [
    chromeLauncher({
      createPage: async ({ context }) => {
        const page = await (await context.browser().createBrowserContext()).newPage();
        await page.bringToFront();
        return page;
      },
    }),
  ],
};
