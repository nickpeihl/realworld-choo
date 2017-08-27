var html = require('bel')

module.exports = articleCommentForm

function articleCommentForm (article) {
  return html`
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="${article.author.image}" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  `
}
