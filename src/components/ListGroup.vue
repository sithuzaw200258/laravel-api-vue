<template>
    <div>
        <div class="list-group">
            <router-link :to="{name: 'dashboard'}" class="list-group-item list-group-item-action" aria-current="true">
                Dashboard
            </router-link>
            <router-link to="/products" class="list-group-item list-group-item-action">Product Lists</router-link>
            <router-link :to="{name: 'products.create'}" class="list-group-item list-group-item-action">Create Product</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped></style>