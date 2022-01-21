export default class UserInfo {
constructor ({profileName, profileJob,profileAvatar}) {
  this._name = document.querySelector(profileName);
  this._job = document.querySelector(profileJob);
  this._avatar = document.querySelector(profileAvatar)
  };

  getUserInfo () {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
  };

  setUserInfo ({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  };
};
