<template>
    <div>
        <label :for="name" class="form-label">{{ label }}</label>
        <input :type="type" class="form-control" :class="{'is-invalid':errors[name]}" :id="name" :name="name" :value="value" :placeholder="placeholder">
        <div class="invalid-feedback" v-if="errors[name]">{{ errors[name][0] }}</div>
        <!-- <div class="text-danger" v-if="errors[name]">{{ errors[name][0] }}</div> -->
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: "Input Label"
        },
        type: {
            type: String,
            default: "text"
        },
        name: {
            type: String,
            default: "inputName"
        },
        value: {
            default: null
        },
        placeholder: {
            type: String,
            default: "Enter input name"
        },
        errors: {
            type: Object,
        },
    },

}
</script>

<style lang="scss" scoped>

    .form-label{
        font-weight: 600;
    }

    input,
    input::placeholder {
        font-size: .8rem;
    }
</style>