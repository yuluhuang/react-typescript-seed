const prod = {
    environment: ENV.NODE_ENV,
    website: ENV.domain,
    root: ENV.root,
    login: 'https://yuluhuang.com/api/user/JWTSignin', // '/login',
    logout: '/logout'
};

export default prod;
