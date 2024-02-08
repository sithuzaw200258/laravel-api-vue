<template>
    <div>
        <div class="container">
            <div class="row py-2">
                <div class="col-md-3">
                    <div class="">
                        <ListGroup></ListGroup>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="">
                        <!-- <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Create Product</li>
                            </ol>
                        </nav> -->
                        <Breadcrumb page="Create Product"></Breadcrumb>
                    </div>

                    <TitleAlert title="Create Product"></TitleAlert>

                    <div class="row">
                        <div class="col-md-6">
                            <form action="#" @submit.prevent="createProduct" enctype="multipart/form-data"
                                ref="productCreate">

                                <div class="mb-3">
                                    <Input label="Product Name" name="name" placeholder="Enter product name"
                                        :errors="errors"></Input>
                                </div>

                                <div class="mb-3">
                                    <Input label="Product Price" type="number" name="price"
                                        placeholder="Enter product price" :errors="errors"></Input>
                                </div>

                                <div class="mb-3">
                                    <Input label="Stock" type="number" name="stock" placeholder="Enter stock"
                                        :errors="errors"></Input>
                                </div>

                                <div class="mb-3">
                                    <label for="photos" class="form-label" style="font-weight: 600;">Product Photo</label>
                                    <input type="file" multiple class="form-control"
                                        :class="{ 'is-invalid': errors.photos }" id="photos" name="photos[]">
                                    <div class="invalid-feedback" v-if="errors.photos">{{ errors.photos[0] }}</div>
                                </div>

                                <div class="text-end">
                                    <router-link :to="{ name: 'products' }" class="btn btn-sm btn-outline-secondary px-5">
                                        Cancel
                                    </router-link>
                                    <button class="btn btn-sm btn-primary px-5 ms-2" :disabled="isLoading">
                                        <span v-if="isLoading" class="spinner-border spinner-border-sm"
                                            aria-hidden="true"></span>
                                        Create
                                    </button>
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
import TitleAlert from '../components/TitleAlert'
import Breadcrumb from '../components/Breadcrumb'
import Input from '../components/Input'
import ListGroup from '../components/ListGroup'
import { mapGetters } from 'vuex';
import axios from 'axios'
import Swal from 'sweetalert2'
import { debounce,throttle } from 'lodash'

export default {
    components: {
        TitleAlert,
        Breadcrumb,
        Input, ListGroup
    },

    data() {
        return {
            errors: {},
            isLoading: false,
        }
    },

    computed: {
        ...mapGetters([
            'getUrl',
        ])
    },

    methods: {
        showToast(message, icon = "success") {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icon,
                title: message
            });
        },

        createProduct: debounce(function () {
            this.isLoading = true;

            let formData = new FormData(this.$refs.productCreate);
            // console.log(formData.get('name'));
            axios.post(this.getUrl("products"), formData)
                .then(res => {
                    // console.log(res);
                    this.errors = {};
                    if (res.data.success) {
                        this.$refs.productCreate.reset();

                        // Show Tost if product is created is successfully
                        this.showToast(res.data.message)

                    }
                })
                .catch(e => {
                    if (e.response.status == 422) {
                        // console.log(e.response.data.errors.name[0])
                        this.errors = e.response.data.errors;
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                })
        },500)
    },

}
</script>

<style lang="scss"></style>