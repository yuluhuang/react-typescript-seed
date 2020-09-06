export default {
    logout() {
        this.removeToken();
    },
    token(v?: any): string {
        return v ? window.localStorage.setItem('token', v) : window.localStorage.token || '';
    },
    removeToken() {
        window.localStorage.removeItem('token');
    }
};
