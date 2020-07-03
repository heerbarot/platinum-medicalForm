// console.log = function () { }

let envs = [];
let env = "production";

envs['development'] = {
    baseApiUrl: "http://localhost:3000/",
}

envs['testing'] = {
    baseApiUrl: "https://testing.platinumrailservices.co.uk:4000/",
}

envs['production'] = {
    baseApiUrl: 'https://workspace.platinumrailservices.co.uk:3000/',
}


export const config = envs[env];