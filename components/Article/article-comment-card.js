var html = require('bel')

module.exports = articleCommentCard

function articleCommentCard (comment) {
  return html`
    <div class="card">
      <div class="card-block">
        <p class="card-text">${comment.body}</p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img src="${comment.author.image}" />
        </a>
        <a href="/profile/${comment.author.username}"
          class="comment-author">${comment.author.username}</a>
        <span class="date-posted">${comment.createdAt}</span>
      </div>
    </div>
  `
}
