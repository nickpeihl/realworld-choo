var request = require('xhr-request')
var xtend = require('xtend')

module.exports.base = 'https://conduit.productionready.io/api'

module.exports = RealWorld

function RealWorld (opts) {
  if (!(this instanceof RealWorld)) return new RealWorld(opts)
  if (!opts) opts = {}
  this.token = opts.token || null
  this.apiRoot = opts.apiRoot || 'https://conduit.productionready.io/api'
}

var defaults = {
  json: true,
  token: this.token ? `authorization: Token ${this.token}` : null
}

var limit = function (count, p) {
  return `limit=${count}&offset=${p ? p * count : 0}`
}

var encode = encodeURIComponent

RealWorld.prototype._getRequest = function (url, cb) {
  request(
    `${this.apiRoot}${url}`,
    xtend(defaults, {
      method: 'GET'
    }),
    cb
  )
}

RealWorld.prototype._postRequest = function (url, body, cb) {
  request(
    `${this.apiRoot}${url}`,
    xtend(defaults, {
      method: 'POST',
      body: body
    }),
    cb
  )
}

RealWorld.prototype._putRequest = function (url, body, cb) {
  request(
    `${this.apiRoot}${url}`,
    xtend(defaults, {
      method: 'PUT',
      body: body
    }),
    cb
  )
}

RealWorld.prototype._delRequest = function (url, cb) {
  request(
    `${this.apiRoot}${url}`,
    xtend(defaults, {
      method: 'DELETE'
    }),
    cb
  )
}

RealWorld.prototype.login = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (opts.user && opts.password) {
    this._postRequest(
      `/users/login`,
      {
        user: {
          email: opts.user,
          password: opts.password
        }
      },
      cb
    )
  } else {
    cb(new Error('Must supply username and password'))
  }
}

RealWorld.prototype.register = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  if (opts.username && opts.email && opts.password) {
    this._postRequest(
      `/users`,
      {
        user: {
          username: opts.username,
          email: opts.email,
          password: opts.password
        }
      },
      cb
    )
  } else {
    cb(new Error('Must supply a username, email, and password'))
  }
}

RealWorld.prototype.getUser = function (cb) {
  this._getRequest(`/user`, cb)
}

RealWorld.prototype.updateUser = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  this._putRequest(
    `user`,
    {
      user: opts
    },
    cb
  )
}

RealWorld.prototype.getProfile = function (username, cb) {
  this._getRequest(`/profiles/${username}`, cb)
}

RealWorld.prototype.followUser = function (username, cb) {
  this._postRequest(`/profiles/${username}/follow`, cb)
}

RealWorld.prototype.unFollowUser = function (username, cb) {
  this._delRequest(`/profiles/${username}/follow`, cb)
}

RealWorld.prototype.listAllArticles = function (page, cb) {
  if (typeof page === 'function') {
    cb = page
    page = null
  }
  this._getRequest(`/articles?${limit(20, page)}`, cb)
}

RealWorld.prototype.listArticlesByTag = function (tag, page, cb) {
  if (typeof page === 'function') {
    cb = page
    page = null
  }
  this._getRequest(`/articles?tag=${encode(tag)}&${limit(10, page)}`, cb)
}

RealWorld.prototype.listArticlesByAuthor = function (author, page, cb) {
  if (typeof page === 'function') {
    cb = page
    page = null
  }
  this._getRequest(`/articles?author=${encode(author)}&${limit(5, page)}`, cb)
}

RealWorld.prototype.listArticlesByAuthorFavorites = function (author, page, cb) {
  if (typeof page === 'function') {
    cb = page
    page = null
  }
  this._getRequest(
    `/articles?favorited=${encode(author)}&${limit(20, page)}`,
    cb
  )
}

RealWorld.prototype.feedArticles = function (page, cb) {
  if (typeof page === 'function') {
    cb = page
    page = null
  }
  this._getRequest(`/articles/feed?${limit(10, page)}`, cb)
}

RealWorld.prototype.getArticle = function (slug, cb) {
  this._getRequest(`/articles/${slug}`, cb)
}

RealWorld.prototype.createArticle = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  this._postRequest(
    `/articles`,
    {
      article: opts
    },
    cb
  )
}

RealWorld.prototype.updateArticle = function (slug, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  this._putRequest(
    `/articles/${slug}`,
    {
      article: opts
    },
    cb
  )
}

RealWorld.prototype.deleteArticle = function (slug, cb) {
  this._delRequest(`/articles/${slug}`, cb)
}

RealWorld.prototype.addComment = function (slug, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }
  this._postRequest(
    `/articles/${slug}/comments`,
    {
      comment: opts
    },
    cb
  )
}

RealWorld.prototype.getComments = function (slug, cb) {
  this._getRequest(`/articles/${slug}/comments`, cb)
}

RealWorld.prototype.deleteComment = function (slug, commentId, cb) {
  this._delRequest(`/articles/${slug}/comments/${commentId}`, cb)
}

RealWorld.prototype.favoriteArticle = function (slug, cb) {
  this._postRequest(`/articles/${slug}/favorite`, cb)
}

RealWorld.prototype.unFavoriteArticle = function (slug, cb) {
  this._delRequest(`/articles/${slug}/favorite`, cb)
}

RealWorld.prototype.getTags = function (cb) {
  this._getRequest(`/tags`, cb)
}

RealWorld.prototype.setToken = function (_token) {
  this.token = _token
}
