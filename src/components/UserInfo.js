export default class UserInfo {
constructor ({profileName, profileJob,profileAvatar}) {
  this._name = document.querySelector(profileName);
  this._job = document.querySelector(profileJob);
  this._avatar = document.querySelector(profileAvatar)
  // this._profileId = profileId;
  };

  getUserInfo () {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  };

  setUserInfo (userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.about;
  };

  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
};
