"use strict";
var environment_1 = require("../app/environment");
exports.AppConfig = {
    baseUrl: environment_1.environment.envName == 'prod' ? 'http://healthamin.com/' : 'http://localhost:4200',
    stagingUrl: 'http://healthamin.com/',
    web: {
        appID: "1133564906671009"
    },
    messenger: {
        prod: {
            appID: "207389912960881",
            pageID: "1173783939313940",
        },
        dev: {
            appID: "190268531392461",
            pageID: "164483500652387",
        }
    },
    zoho: {
        ZOHO_CRM_AUTH_KEY: '02c37a08fc4700e9d848f4e2e0bc3436'
    },
    google: {
        SEARCH_API_KEY: 'AIzaSyAD6g1Bs2ZRmRFqHP0QIrMViadzHr6BrhM'
    },
    database: {
        doctors: 'DoctorsTable/',
        
        users: environment_1.environment.envName + '/UserTable/',   
        userIds: environment_1.environment.envName + '/UserIds/'
    }
};
//# sourceMappingURL=app.config.js.map