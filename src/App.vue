<template>
  <div class="">
    <Navbar/>
    <!-- <router-link to="/">Home</router-link> -->
  </div>
  <router-view/>
</template>

<script>
  import * as bootstrap from "bootstrap";
  import Navbar from "./components/Navbar.vue";
  import axios from "axios";
  export default{
    components: {
      Navbar,
    },
    created () {
      if (localStorage.getItem('auth')  && localStorage.getItem('token')) {
        this.$store.dispatch('setAuth',JSON.parse(localStorage.getItem('auth')));
        this.$store.dispatch('setToken',localStorage.getItem('token'));

        // Global Config Axios
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
      }
    },
  }
</script>

<style lang="scss">
  @import "app.scss";
  body{
    overflow-x: hidden;
  }
  // .router-link-exact-active {
  //   color: white;
  //   background-color: blue;
  // }
</style>
