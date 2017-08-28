var xhr = require('xhr')

var API_BASE = require('../api').base

module.exports = TagsModel

function TagsModel (state, emitter) {
  state.tags = []

  emitter.on('DOMContentLoaded', function () {
    getTags()
    emitter.on('tags:download', getTags)
  })

  function getTags () {
    xhr.get(API_BASE + '/tags', function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching tags: `err`')
      else if (res.statusCode !== 200) emitter.emit('log:error', 'Tags API returned `res.statusCode`')
      else {
        state.tags = JSON.parse(res.body).tags
        emitter.emit('render')
      }
    })
  }
}
