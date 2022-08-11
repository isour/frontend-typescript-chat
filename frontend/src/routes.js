// @ts-check

const routes = {
    loginPath: () => '/login',
    chatPath: () => '/',
    backend: {
        loginPath: () => '/api/v1/login',
        dataPath: () => '/api/v1/data',
    }
}

export default routes;
