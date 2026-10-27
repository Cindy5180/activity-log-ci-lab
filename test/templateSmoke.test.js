import { test } from 'node:test';
import assert from 'node:assert/strict';

const templateEngine = await import('../src/utils/templateEngine.js');

test('templateEngine module exposes exports', () => {
    assert.ok(Object.keys(templateEngine).length > 0);
});
