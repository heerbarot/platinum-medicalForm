console.log = function () { }

let envs = [];
let env = "testing";

envs['development'] = {
    baseApiUrl: "http://localhost:3000/",
}

envs['testing'] = {
    baseApiUrl: "https://platinum.mylionsgroup.com:3000/",
}

envs['production'] = {
    baseApiUrl: 'https://workspace.platinumrailservices.co.uk:3000/',
}

export const config = envs[env];