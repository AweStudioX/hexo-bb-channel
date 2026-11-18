const assert = require('node:assert/strict');
const { test } = require('node:test');

const { renderTags } = require('../src/render-tags');

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

test('does not repeat Telegram hashtag entities already shown in the post', () => {
  const post = {
    html: '<div class="bb-channel-content">备忘一下，<a target="_blank">#Notion风格头像</a> <a target="_blank">#头像</a><br><a target="_blank">#Tools</a></div>',
    tags: ['Notion风格头像', '头像', 'Tools'],
  };

  assert.equal(renderTags(post, escapeHtml), '');
});

test('shows only tags not represented by an inline hashtag entity', () => {
  const post = {
    html: '<div class="bb-channel-content"><a>#Tools</a> #Extra</div>',
    tags: ['Tools', 'Extra', 'C&D'],
  };

  assert.equal(renderTags(post, escapeHtml), '<footer class="bb-channel-tags"><span>#Extra</span><span>#C&amp;D</span></footer>');
});

test('keeps metadata tags when the post has no inline hashtag entities', () => {
  assert.equal(
    renderTags({ html: '<div>Notes about #Tools</div>', tags: ['Tools'] }, escapeHtml),
    '<footer class="bb-channel-tags"><span>#Tools</span></footer>',
  );
});
