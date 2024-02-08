<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <router-link class="navbar-brand" to="/">Logo</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item active">
                            <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/about">About</router-link>
                        </li>

                        <template v-if="auth == null">
                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
                            </li>

                            <li class="nav-item">
                                <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
                            </li>
                        </template>

                        <template v-else>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white fw-bold" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ auth.name }}
                                </a>
                                <ul class="dropdown-menu py-0">
                                    <li>
                                        <router-link class="dropdown-item" :to="{ name: 'dashboard' }">
                                            <i class="bi bi-bar-chart-line"></i>
                                            Dashboard
                                        </router-link>
                                    </li>
                                    <!-- <li>
                                        <hr class="dropdown-divider">
                                    </li> -->
                                    <li>
                                        <a class="dropdown-item" @click="logout()">
                                            <i class="bi bi-box-arrow-right"></i>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    computed: {
        ...mapState([
            'auth',
            'token'
        ]),
        ...mapGetters([
            'getUrl',
        ])
    },
    methods: {
        logout() {
            // Remove from localStorage Auth & Token
            localStorage.removeItem('auth');
            localStorage.removeItem('token');

            let headers = new Headers();
            headers.append("Authorization", "Bearer " + this.token)
            fetch(this.getUrl("logout"), {
                method: "POST",
                headers
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success == true) {
                        // Remove From VueX
                        this.$store.dispatch('logout');
                    }
                })
                .finally(() => {
                    this.$router.push({ name: 'login' });
                })
        }
    },
}
</script>

<style lang="scss"></style>