// 获取网站信息
let storageData = {};
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    storageData[key] = value;
}

// 设置网站信息
Object.keys(storageData).forEach((e) => {
  localStorage.setItem(e,storageData[e])
})