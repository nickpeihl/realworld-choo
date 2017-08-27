var Nanocomponent = require('nanocomponent')
var html = require('bel')

function FollowButton (following) {
  if (!(this instanceof Button)) return new Button(following)
  this
}
