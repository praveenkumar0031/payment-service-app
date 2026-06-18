module.exports = {
  // 🚀 CRITICAL FOR CI: Disables Jest from looking for Git repository history
  scmProviders: [],

  // Prevents Jest from using watchman background file crawler threads
  watchman: false,

  // Forces Jest to show detailed printouts of each test execution in the pipeline logs
  verbose: true,

  // Ensures a clean slate by clearing mock memories between individual test runs
  clearMocks: true
};