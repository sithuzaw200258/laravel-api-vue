<template>
    <div class="input-group mb-3 w-50">
        <input type="text" v-model="keyword" class="form-control" placeholder="Search by product name">
        <button @click="search" class="input-group-text btn btn-primary px-4">
            <i class="bi bi-search"></i>
        </button>
    </div>
</template>

<script>
import {debounce,throttle} from 'lodash'
export default {
    data() {
        return {
            keyword: null
        }
    },
    methods: {
        search() {
            // console.log(this.keyword)
            this.$emit('search',this.keyword);
        }
    },
    watch: {
        keyword:debounce(function(){
            // console.log(this.keyword)
            this.$emit('search',this.keyword);
        },500)
        // keyword(newValue, oldValue) {
        //     console.log(newValue, oldValue)
        //     this.$emit('search',this.keyword);
        // }
        
    },
}
</script>

<style lang="scss" scoped></style>