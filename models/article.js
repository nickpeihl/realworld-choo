var xhr = require('xhr')

var API_BASE = require('../api').base

module.exports = ArticleModel

function ArticleModel (state, emitter) {
  state.article = null

  emitter.on('DOMContentLoaded', function () {
    emitter.on('article:download', getArticle)
  })

  function getArticle (slug) {
    xhr.get(API_BASE + '/articles/' + slug, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching article: `err`')
      else if (res.statusCode !== 200) {
        emitter.emit('log:error', `Article API returned ${res.statusCode}`)
      } else {
        state.article = JSON.parse(res.body).article
        emitter.emit('render')
      }
    })
  }
}
