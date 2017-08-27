var xhr = require('xhr')

var API_BASE = require('../api').base

module.exports = CommentsModel

function CommentsModel (state, emitter) {
  state.comments = []

  emitter.on('DOMContentLoaded', function () {
    getComments()
    emitter.on('comments:download', getComments)
  })

  function getComments (slug) {
    if (slug !== undefined) {
      xhr.get(API_BASE + '/articles/' + slug + '/comments', function (err, res) {
        if (err) emitter.emit('log:error', 'Error fetching article: `err`')
        else if (res.statusCode !== 200) {
          emitter.emit('log:error', 'Comments API returned `res.statusCode`')
        } else {
          state.comments = JSON.parse(res.body).comments
          emitter.emit('render')
        }
      })
    }
  }
}
