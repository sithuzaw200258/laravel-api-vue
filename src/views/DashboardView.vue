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
                    <h3>Welcome To Dashboard</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ListGroup from '../components/ListGroup'
export default {
    components: { ListGroup },

}
</script>

<style lang="scss"></style>