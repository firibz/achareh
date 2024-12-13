<template>
    <Form ref="test" @submit="handleSubmit" class="system-form">
        <b-container class="system-form-container flex-column justify-center">
                <b-row class="py-5">
                    <b-col lg="2" md="1"></b-col>
                    <b-col v-if="completed" lg="8" md="10">
                        <b-row>
                            <b-col cols="12" class="pb-2 mt-5 text-center">
                                <img class="cursor-pointer" @click="showMap = false" src="@/assets/completed.svg"/>
                            </b-col>
                            <b-col cols="12" class="pb-3 mb-3 text-center">
                               اطلاعات شما با موفقیت ثبت شد.
                            </b-col>
                            <b-col cols="12" class="px-0 text-center">
                                <b-button href="/addresses" type="button" class="submit-btn outline">
                                    مشاهده اطلاعات
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col v-else-if="!showMap" lg="8" md="10">
                        <b-row>
                            <b-col class="pb-3" cols="12">ثبت آدرس</b-col>
                        </b-row>
                        <b-row class="bg-white p-4">
                            <b-col md="12" class="pb-5 font-weight-bold">
                                لطفا مشخصات و آدرس خود را وارد کنید
                            </b-col>
                            <b-col md="4" class="mb-4">
                                <form-input
                                    v-model="form.firstName"
                                    label="نام"
                                    name="firstName"
                                    placeholder="مثال: محمد"
                                    rules="required|min:3"/>
                            </b-col>
                            <b-col md="4" class="mb-4">
                                <form-input
                                    v-model="form.lastName"
                                    label="نام خانوادگی"
                                    name="lastName"
                                    placeholder="مثال: رضایی"
                                    rules="required|min:3"/>
                            </b-col>
                            <b-col md="4" class="mb-4">
                                <form-input
                                    v-model="form.mobile"
                                    label="تلفن همراه"
                                    name="mobile"
                                    placeholder="مثال: 09123456789"
                                    inputmode="numeric"
                                    rules="required|mobile"/>
                            </b-col>
                            <b-col md="4" class="mb-4">
                                <form-input
                                    v-model="form.phone"
                                    name="phone"
                                    placeholder="مثال: 0211234567"
                                    inputmode="numeric"
                                    rules="numeric|length:11">
                                    <template #starting-label>
                                        <span>تلفن ثابت</span>
                                        <span class="text-subtitle">(اختیاری)</span>
                                    </template>
                                    <template #ending-label>
                                        <span class="text-hint"> *با پیش شماره</span>
                                    </template>
                                </form-input>
                            </b-col>
                            <b-col md="8" class="mb-4">
                                <form-input
                                    v-model="form.address"
                                    label="آدرس"
                                    name="address"
                                    placeholder="مثال: تهران، خیابان انقلاب، پلاک ۱۰"
                                    rules="required|min:10"/>
                            </b-col>
                            <b-col md="12" class="mb-4">
                                <b-row>
                                    <b-col md="2">جنسیت</b-col>
                                    <b-col md="10">
                                        <Field
                                            v-model="form.gender"
                                            name="gender"
                                            rules="required"
                                            v-slot="{ errorMessage, value, handleChange, meta }"
                                        >
                                            <b-form-radio-group
                                                class="system-radio"
                                                :model-value="value"
                                                @update:model-value="handleChange"
                                                :options="genderOptions"
                                                name="gender"
                                                :state="meta.validated ? !errorMessage : null"
                                            >
                                                <b-form-invalid-feedback :state="meta.validated ? !errorMessage : null">
                                                    {{errorMessage}}
                                                </b-form-invalid-feedback>
                                            </b-form-radio-group>
                                        </Field>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>

                    </b-col>
                    <b-col v-else lg="8" md="10">
                        <b-row>
                            <b-col cols="12" class="pb-3">
                                <img class="cursor-pointer" @click="showMap = false" src="@/assets/back.svg"/>
                                انتخاب آدرس
                            </b-col>
                            <b-col cols="12" class="py-3 bg-white">
                                موقعیت مورد نظر خود را روی نقشه انتخاب کنید.
                            </b-col>
                            <b-col cols="12" class="px-0 bg-white">
                                <MapComponent @location-found="handleLocationFound" />
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col lg="2" md="1"></b-col>
                </b-row>
        </b-container>
        <b-navbar v-if="!completed" fixed="bottom" type="light" variant="white">
            <footer class="bg-white text-center mx-auto">
                <div class="container py-3">
                    <b-button v-show="!showMap" type="submit" class="submit-btn primary">
                        ثبت و ادامه
                    </b-button>
                    <b-button v-show="showMap" :disabled="isSubmitting" @click="handleMapSubmit" type="button" class="submit-btn primary">
                        <template v-if="isSubmitting">
                            <b-spinner label="Loading..." small type="grow"></b-spinner>
                            در حال ارسال...
                        </template>
                        <template v-else>
                            ثبت و ادامه
                        </template>
                    </b-button>
                </div>
            </footer>
        </b-navbar>
    </Form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../apiService'
import FormInput from '../components/FormInput.vue'
import { Field, Form } from "vee-validate"
import MapComponent from '../components/MapComponent.vue'

export default {
    components: { Field, FormInput, Form, MapComponent },
    setup() {
        const router = useRouter()
        const form = ref({
            firstName: '',
            lastName: '',
            mobile: '',
            phone: '',
            address: '',
            gender: ''
        })
        const genderOptions = [
            { text: 'آقا', value: 'male' },
            { text: 'خانم', value: 'female' },
        ]
        const showMap = ref(false)
        const latLng = ref({lat: null, lng: null})
        const isSubmitting = ref(false)
        const completed = ref(false)

        const handleSubmit = () => {
            showMap.value = true
        }

        const handleLocationFound = (location) => {
            latLng.value = location
        }

        const handleMapSubmit = async () => {
            if(latLng.value && latLng.value.lat && latLng.value.lng)
            {
                isSubmitting.value = true
                const addressData = {
                    first_name: form.value.firstName,
                    last_name: form.value.lastName,
                    coordinate_mobile: form.value.mobile,
                    coordinate_phone_number: form.value.phone || '',
                    address: form.value.address,
                    region: 1,
                    lat: latLng.value.lat,
                    lng: latLng.value.lng,
                    gender: form.value.gender
                }
                try {
                    await apiService.postAddress(addressData)
                    completed.value = true;
                    // router.push('/addresses')
                } catch (error) {
                    console.error('Error submitting address:', error)
                } finally {
                    isSubmitting.value = false
                }
            }
            else{
                alert("لطفا مختصات را انتخاب کنید")
            }
        }

        return {
            form,
            genderOptions,
            showMap,
            handleSubmit,
            handleMapSubmit,
            handleLocationFound,
            isSubmitting,
            completed
        }
    }
}
</script>




<style scoped>
b-form-group {
    margin-bottom: 1rem;
}

.system-form-container {
    background-color: #F6F9FA;
}

.system-form {
    height: calc(100% - 72px - 86px);
    overflow: auto;
}
</style>
