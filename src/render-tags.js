function renderTags(post, escapeHtml) {
  const html = post.html || '';
  const tags = (post.tags || [])
    .filter(tag => !html.includes('>#' + escapeHtml(tag) + '</a>'))
    .map(tag => '<span>#' + escapeHtml(tag) + '</span>')
    .join('');
  return tags ? '<footer class="bb-channel-tags">' + tags + '</footer>' : '';
}

module.exports = { renderTags };
