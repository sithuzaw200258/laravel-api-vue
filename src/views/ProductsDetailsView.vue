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
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                                <li class="breadcrumb-item"><router-link to="/products">Products</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">Product Details</li>
                            </ol>
                        </nav>
                    </div>

                    <TitleAlert title="Product Details"></TitleAlert>

                    <div class="row">
                        <div class="col-12">
                            <div class="">
                                <div class="card shadow">
                                    <div class="card-body">
                                        <h5 class="">{{ product.name }}</h5>
                                        <p class="">{{ product.price }}</p>
                                        <p class="">{{ product.stock }} <span>{{ product.stock_status }}</span> </p>
                                    </div>
                                </div>

                                <div class="text-end mt-4">
                                    <router-link :to="{ name: 'products' }" class="btn btn-sm btn-outline-secondary px-5">
                                        Cancel
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleAlert from '../components/TitleAlert'
import ListGroup from '../components/ListGroup'
import { mapGetters } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    components: {
        TitleAlert, ListGroup
    },

    data() {
        return {
            product: {},
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
        fetchProduct(id){
            axios.get(this.getUrl("products/" + id))
            .then(res => {
                // console.log(res);
                this.product = res.data.data;
            })
        },
        deleteProduct(id) {
            axios.delete(this.getUrl('products/') + id)
                .then(res => {
                    // console.log(res);
                    this.fetchProducts(this.rows.meta.links.find(link => link.active == true).url);
                    this.showToast(res.data.message);
                })
        }
    },

    mounted() {
        this.fetchProduct(this.$route.params.id);
    },

}
</script>

<style lang="scss">
.breadcrumb-item {
    font-size: .9rem;
}
</style>