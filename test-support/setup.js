// Preloaded with `node --import` so src/config.js sees the same inputs
// that the GitHub Actions runner would provide as INPUT_* variables.
const defaults = {
    INPUT_GITHUB_USERNAME: 'octocat',
    INPUT_GITHUB_TOKEN: 'test-token',
    INPUT_EVENT_LIMIT: '10',
    INPUT_OUTPUT_STYLE: 'MARKDOWN',
    INPUT_IGNORE_EVENTS: '["WatchEvent", "ForkEvent"]',
    INPUT_HIDE_DETAILS_ON_PRIVATE_REPOS: 'false',
    INPUT_README_PATH: 'README.md',
    INPUT_COMMIT_MESSAGE: 'Update README.md with latest activity',
    INPUT_DRY_RUN: 'true',
};

for (const [key, value] of Object.entries(defaults)) {
    if (process.env[key] === undefined) {
        process.env[key] = value;
    }
}
