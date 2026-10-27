import { test } from 'node:test';
import assert from 'node:assert/strict';

const { default: eventDescriptions } = await import('../src/utils/eventDescriptions.js');

const repo = { name: 'octocat/hello-world' };

test('PushEvent links to the commit on a public repo', () => {
    const text = eventDescriptions.PushEvent({ repo, isPrivate: false, payload: { head: 'abc123' } });
    assert.match(text, /Committed to \[octocat\/hello-world\]/);
    assert.match(text, /commit\/abc123/);
});

test('PushEvent hides repo details on a private repo', () => {
    const text = eventDescriptions.PushEvent({ repo, isPrivate: true, payload: { head: 'abc123' } });
    assert.match(text, /private repo/);
    assert.doesNotMatch(text, /octocat\/hello-world/);
});

test('CreateEvent for a branch links to the tree', () => {
    const text = eventDescriptions.CreateEvent({
        repo,
        isPrivate: false,
        payload: { ref_type: 'branch', ref: 'feature/x' },
    });
    assert.match(text, /tree\/feature\/x/);
});

test('DeleteEvent hides the ref name when details are hidden', () => {
    const text = eventDescriptions.DeleteEvent({
        repo,
        isPrivate: true,
        hideDetailsOnPrivateRepos: true,
        payload: { ref_type: 'branch', ref: 'secret-branch' },
    });
    assert.doesNotMatch(text, /secret-branch/);
});
