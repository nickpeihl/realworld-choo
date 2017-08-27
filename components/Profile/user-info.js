var html = require('bel')

module.exports = userInfo

function userInfo (profile) {
  return html`
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-10 offset-md-1">
      <img src="${profile.image}" class="user-img" />
      <h4>${profile.username}</h4>
      <p>${profile.bio}</p>
      <button class="btn btn-sm btn-outline-secondary action-btn">
        <i class="ion-plus-round"></i>
        ${followButton(profile.following)} ${profile.username}
      </button>
    </div>
  </div>
</div>
  `
}

function followButton (following) {
  if (following) {
    return 'Unfollow'
  } else {
    return 'Follow'
  }
}
