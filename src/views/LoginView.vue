<template>
    <div>
        <div class="row justify-content-center align-items-center" style="min-height: 90vh;">
            <div class="col-12 col-md-4">
                <div class="">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h4 class="text-center text-uppercase">Login</h4>
                            <hr>

                            <form action="" @submit.prevent="login" ref="loginForm">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                                        id="email" name="email" placeholder="Enter Your Email">
                                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                                </div>

                                <div class="mb-4">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                                        id="password" name="password" placeholder="********">
                                    <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
                                </div>

                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary py-2">Login</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            errors: {}
        }
    },
    computed: {
        ...mapState([
            'apiUrl',
        ]),
        ...mapGetters([
            'getUrl',
        ])
    },

    methods: {
        login() {
            let formData = new FormData(this.$refs.loginForm)
            // console.log(formData.get('name'),formData.get('email'));

            fetch(this.getUrl("login"), {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(json => {
                    // console.log(json)
                    if (json.success == true) {
                        // Store in localStorage
                        localStorage.setItem('auth', JSON.stringify(json.auth));
                        localStorage.setItem('token', json.token);

                        // Store in VueX
                        this.$store.dispatch('setAuth', json.auth);
                        this.$store.dispatch('setToken', json.token);
                        this.$router.push({ name: 'dashboard' });

                        // Global Config Axios
                        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
                    } else {
                        // console.log(json)
                        // console.log(json.errors)
                        // console.log(json.errors.email)
                        this.errors = json.errors;
                    }
                })
        }
    },
}
</script>

<style lang="scss" scoped></style>