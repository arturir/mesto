export default class UserInfo {
    constructor({nameSelector, metierSelector, avatarSelector}) {
        this.name = document.querySelector(nameSelector);
        this.metier = document.querySelector(metierSelector);
        this.avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {name: this.name.textContent, metier: this.metier.textContent, avatar: this.avatar.style.backgroundImage, id: this.id}
    }
    setUserInfo({name, metier, avatar, id}) {
        this.name.textContent = name;
        this.metier.textContent = metier;
        this.id = id;
        this.setAvatar(avatar)
    }
    setAvatar(url){
        this.avatar.style.backgroundImage = `url(${url})`;
    }
}