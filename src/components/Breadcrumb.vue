<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/dashboard">Home</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ page }}</li>
            </ol>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        page: {
            type: String,
            default: 'Page Name'
        },
    },
}
</script>

<style lang="scss" scoped>
    .breadcrumb-item{
        font-size: .9rem;
    }
</style>