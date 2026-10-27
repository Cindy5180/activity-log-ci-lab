import { test } from 'node:test';
import assert from 'node:assert/strict';

const config = await import('../src/config.js');

test('numeric and string inputs are parsed', () => {
    assert.equal(config.eventLimit, 10);
    assert.equal(config.style, 'MARKDOWN');
    assert.equal(config.username, 'octocat');
});

test('IGNORE_EVENTS accepts a JSON array', () => {
    assert.deepEqual(config.ignoreEvents, ['WatchEvent', 'ForkEvent']);
});

test('boolean inputs are converted', () => {
    assert.equal(config.dryRun, true);
    assert.equal(config.hideDetailsOnPrivateRepos, false);
});

test('default emoji map contains the core events', () => {
    assert.equal(typeof config.eventEmojiMap.PushEvent, 'string');
    assert.equal(typeof config.eventEmojiMap.IssuesEvent, 'object');
    assert.ok('opened' in config.eventEmojiMap.IssuesEvent);
});
