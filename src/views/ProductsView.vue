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

                    <Breadcrumb page="Products"></Breadcrumb>

                    <TitleAlert title="Product Lists"></TitleAlert>

                    <div class="row">
                        <div class="col-12">
                            <div class="">
                                <div class="d-flex justify-content-end">
                                    <Search @search="search"></Search>
                                </div>
                                <table class="table table-bordered table-hover">
                                    <thead class="table-danger">
                                        <tr>
                                            <th scope="col">#</th>
                                            <!-- <th scope="col">Photo</th> -->
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Owner</th>
                                            <th scope="col">Date&Time</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody style="font-size: .8rem;">
                                        <tr v-for="row in rows.data">
                                            <th scope="row">{{ row.id }}</th>
                                            <!-- <td>
                                        <span v-for="photo in row.photos">
                                            <img :src="photo" alt="" width="100" height="100" class="" style="object-fit: cover;">
                                        </span>
                                    </td> -->
                                            <td>{{ row.name }}</td>
                                            <td>{{ row.show_price }}</td>
                                            <td>{{ row.stock }}</td>
                                            <td>{{ row.stock_status }}</td>
                                            <td>{{ row.owner.name }}</td>
                                            <td>{{ row.date }} <br> {{ row.time }}</td>
                                            <td>
                                                <div class="">
                                                    <router-link :to="{ name: 'products.details', params: { id: row.id } }"
                                                        type="button" class="btn me-1 btn-sm btn-outline-info">
                                                        <i class="bi bi-info-circle"></i>
                                                    </router-link>
                                                    <router-link :to="{ name: 'products.edit', params: { id: row.id } }"
                                                        class="btn me-1 btn-sm btn-outline-warning">
                                                        <i class="bi bi-pencil"></i>
                                                    </router-link>
                                                    <button @click="deleteProduct(row.id)" type="button"
                                                        class="btn btn-sm btn-outline-danger">
                                                        <i class="bi bi-trash2"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="d-flex justify-content-end">
                                    <Pagination v-if="rows.meta" @fetchLink="fetchProducts" :links="rows.meta.links">
                                    </Pagination>
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
import Search from '../components/Search'
import Breadcrumb from '../components/Breadcrumb'
import TitleAlert from '../components/TitleAlert'
import Pagination from '../components/Pagination'
import ListGroup from '../components/ListGroup'
import { mapGetters } from 'vuex';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    components: {
    Search,
        Breadcrumb,
        TitleAlert,
        Pagination, ListGroup
    },

    data() {
        return {
            rows: {},
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
        search(keyword){
            console.log(keyword)
            this.fetchProducts(this.getUrl("products?keyword="+keyword))
        },
        fetchProducts(url) {
            axios.get(url)
                .then(res => {
                    // console.log(res)
                    // console.log(res.data.data)
                    this.rows = res.data;
                })
        },
        fetchProduct(id) {
            axios.get(this.getUrl('products/') + id)
                .then(res => {
                    console.log(res);
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
        this.fetchProducts(this.getUrl("products"));
    },

}
</script>

<style lang="scss"></style>