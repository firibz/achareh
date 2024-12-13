<script setup>
import { defineModel } from 'vue';
import { Field } from "vee-validate";

const model = defineModel({
    type: [String, null],
    required: true,
    default: ''
});

defineProps({
    name: String,
    label: {
        type: [String, null],
        default: null
    },
    rules: {
        type: [String, null],
        default: null
    },
    description: {
        type: [String, null],
        default: null
    },
})
</script>

<template>
    <Field
        v-model="model"
        :name="name"
        :rules="rules"
        v-slot="{ errorMessage, value, handleChange, meta }"
    >
        <b-form-group
            :id="name + 'group'"
            class="system-input-group"
            :description="description"
        >
            <template #label>
                <slot name="label">
                    <label :for="name" class="label-container">
                        <slot name="starting-label">
                            {{label}}
                        </slot>
                        <div class="system-space"></div>
                        <slot name="ending-label">
                        </slot>
                    </label>
                </slot>
            </template>
            <b-form-input
                :id="name"
                class="system-input"
                :model-value="value"
                @update:model-value="handleChange"
                :state="meta.validated ? !errorMessage : null"
                v-bind="$attrs"
            ></b-form-input>
            <b-form-invalid-feedback v-if="errorMessage">
                {{ errorMessage }}
            </b-form-invalid-feedback>
        </b-form-group>
    </Field>
</template>

<style scoped>
    .system-input-group .invalid-feedback{
        text-align: start;
    }
    .system-input {
        background-image: unset !important;
        padding-right: 12px !important;
    }
    .label-container{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    }
    .system-space{
        flex-grow: 1 !important;
    }
</style>
<style>
.system-input::placeholder {
    color: #B6B6B6 !important;
}

.system-input:-ms-input-placeholder {
    color: #B6B6B6 !important;
}

.system-input::-ms-input-placeholder {
    color: #B6B6B6 !important;
}

</style>