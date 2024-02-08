<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li v-for="link in links" class="page-item" :class="{ 'active': link.active ,'disabled':!link.url}" @click.prevent="go(link.url)">
                    <a class="page-link" href="#">{{ link.label }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        links: {
            type: Array,
        },
    },

    methods: {
        go(url) {
            // console.log(url)
            this.$emit('fetchLink', url);
        },
        changeLinks() {
            this.links[0].label = "Prev";
            this.links[this.links.length - 1].label = "Next";
        }
    },
    mounted() {
        this.changeLinks();
    },
    updated() {
        this.changeLinks();
    },
}
</script>

<style lang="scss" scoped></style>