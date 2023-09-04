export default class UserInfo {
    constructor({nameSelector, metierSelector}) {
        this.name = document.querySelector(nameSelector);
        this.metier = document.querySelector(metierSelector);
    }
    getUserInfo() {
        return {name: this.name.textContent, metier: this.metier.textContent}
    }
    setUserInfo({name, metier}) {
        this.name.textContent = name;
        this.metier.textContent = metier;
    }
}