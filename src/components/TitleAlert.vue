<template>
    <div>
        <div class="alert alert-primary py-2 fw-bold" role="alert">
            {{ title }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Title"
        },
    },
}
</script>

<style lang="scss" scoped></style>