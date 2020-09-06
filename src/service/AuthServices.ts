import config from './config';
import restApi from './restApi';

export default {
    login(data: any) {
        return restApi.base.post(config.login, (data));
    },
    logout(data: any) {
        return restApi.base.post(config.logout, (data));
    },
};
