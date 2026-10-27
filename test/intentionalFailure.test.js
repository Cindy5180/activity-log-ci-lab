import { test } from 'node:test';
import assert from 'node:assert/strict';

// Deliberately failing test used to demonstrate that ci-gate blocks the merge.
test('intentional failure for the blocked-PR demo', () => {
    assert.equal(1 + 1, 3);
});
