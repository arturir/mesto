import {profileName, profileMetier} from "../utils/constants.js";
export default class UserInfo {
    constructor({name, metier}) {
        this.name = name;
        this.metier = metier;
    }
    getUserInfo() {
        return {name: this.name, metier: this.metier}
    }
    setUserInfo({name, metier}) {
        this.name = name;
        this.metier = metier;
        profileName.textContent = this.name; 
        profileMetier.textContent =  this.metier;
    }
}