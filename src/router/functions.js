import store from "@/store";

// User have already Login
function alreadyLogin(to, from, next) {
    if (store.state.auth) {
        next('/dashboard');
    }
    return next();
}

// Need Auth
function needAuth(to, from, next) {
    if (store.state.auth === null) {
        return next('/login');
    }
    return next();
}

export { alreadyLogin, needAuth };