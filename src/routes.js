// @ts-check

const routes = {
  frontend: {
    loginPath: () => '/login',
    chatPath: () => '/',
    registerPath: () => '/signup',
  },
  backend: {
    loginPath: () => '/api/v1/login',
    dataPath: () => '/api/v1/data',
    registerPath: () => '/api/v1/signup',
  },
};

export default routes;
