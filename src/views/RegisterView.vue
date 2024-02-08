<template>
    <div>
        <div class="row justify-content-center align-items-center" style="min-height: 90vh;">
            <div class="col-12 col-md-4">
                <div class="">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h4 class="text-center text-uppercase">Register</h4>
                            <hr>
                            <form action="" @submit.prevent="register" ref="registerForm">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Your Name</label>
                                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" id="name"
                                        name="name" placeholder="Enter Your Name">
                                    <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                                        id="email" name="email" placeholder="Enter Your Email">
                                    <div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                                        id="password" name="password" placeholder="********">
                                    <div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
                                </div>

                                <div class="mb-3">
                                    <label for="password-confirm" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control"
                                        :class="{ 'is-invalid': errors.password_confirmation }" id="password-confirm"
                                        name="password_confirmation" placeholder="********">
                                    <div class="invalid-feedback" v-if="errors.password_confirmation">{{
                                        errors.password_confirmation[0] }}</div>
                                </div>

                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary py-2">Register</button>
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
        register() {
            let formData = new FormData(this.$refs.registerForm)
            // console.log(formData.get('name'),formData.get('email'));

            fetch(this.getUrl("register"), {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(json => {
                    // console.log(json)
                    if (json.success == true) {
                        this.$router.push({ name: 'login' });
                    } else {
                        this.errors = json.errors;
                    }
                })
        }
    },
}
</script>

<style lang="scss" scoped></style>