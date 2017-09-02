var xhr = require('xhr')
var xtend = require('xtend')

var API_BASE = require('../api').base

module.exports = TagsModel

function TagsModel (state, emitter) {
  state.tags = xtend(
    {
      ready: false,
      values: []
    },
    state.tags
  )

  emitter.on('tags:download', getTags)

  function getTags () {
    state.tags.ready = false
    xhr.get(API_BASE + '/tags', function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching tags: `err`')
      else if (res.statusCode !== 200) {
        emitter.emit('log:error', 'Tags API returned `res.statusCode`')
      } else {
        state.tags.values = JSON.parse(res.body).tags
        state.tags.ready = true
        emitter.emit('render')
      }
    })
  }
}
