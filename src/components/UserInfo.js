export default class UserInfo {
    constructor({nameSelector, metierSelector, profileAvatar}) {
        this.name = document.querySelector(nameSelector);
        this.metier = document.querySelector(metierSelector);
        this.avatar = document.querySelector(profileAvatar)
    }
    getUserInfo() {
        return {name: this.name.textContent, metier: this.metier.textContent}
    }
    setUserInfo({name, metier}) {
        this.name.textContent = name;
        this.metier.textContent = metier;
    }
    setAvatar(url){
        this.avatar.style.backgroundImage = `url(${url})`;
    }
}