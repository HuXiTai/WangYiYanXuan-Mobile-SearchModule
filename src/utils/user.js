import {
    v4 as uuidv4
} from 'uuid';
export default function getUserTempId() {
    let userTempId_key = localStorage.getItem("userTempId");
    //如果用户已经有自己的id了 则直接把用户的id返回
    if (userTempId_key) {
        return userTempId_key;
    }

    //如果没有则重新获取id并返回 并保存在本地存储中
    userTempId_key = uuidv4();
    localStorage.setItem("userTempId", userTempId_key)
    return userTempId_key;
}