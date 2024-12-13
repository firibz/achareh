<template>
    <div>
        <div v-if="isLoading" class="loading-spinner">
            <b-spinner label="Loading..."></b-spinner>
            <p class="loading-message">در حال بارگذاری اطلاعات... لطفا منتظر بمانید</p>
        </div>
        <b-container v-else class="system-form-container flex-column justify-center">
            <b-row class="py-5">
                <b-col lg="2" md="1"></b-col>
                <b-col lg="8" md="10">
                    <b-row>
                        <b-col class="pb-3" cols="12">آدرس‌ها و مشخصات</b-col>
                    </b-row>
                    <b-row>
                        <b-col
                            cols="12"
                            v-for="address in paginatedAddresses"
                            key="address.id">
                            <b-row
                                class="bg-white p-4 mb-3"
                            >
                                <b-col md="3" class="my-2">
                                    <p class="address-field-title">نام</p>
                                    <p class="address-filed-value">{{ address.first_name }}</p>
                                </b-col>
                                <b-col md="3" class="my-2">
                                    <p class="address-field-title">نام خانوادگی</p>
                                    <p class="address-filed-value">{{ address.last_name }}</p>
                                </b-col>
                                <b-col md="6" class="my-2">
                                    <p class="address-field-title">شماره تلفن همراه</p>
                                    <p class="address-filed-value">{{ address.coordinate_mobile }}</p>
                                </b-col>
                                <b-col md="3" class="my-2">
                                    <p class="address-field-title">شماره تلفن ثابت</p>
                                    <p class="address-filed-value">{{ address.coordinate_phone_number }}</p>
                                </b-col>
                                <b-col md="3" class="my-2">
                                    <p class="address-field-title">جنسیت</p>
                                    <p class="address-filed-value">{{ address.gender === 'male' ? 'آقا' : 'خانم' }}</p>
                                </b-col>
                                <b-col md="6" class="my-2">
                                    <p class="address-field-title">آدرس</p>
                                    <p class="address-filed-value">{{ address.address }}</p>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col lg="2" md="1"></b-col>
            </b-row>
            <b-row>
                <b-col class="pb-3 text-center" cols="12">
                    <b-pagination
                        class="system-pagination"
                        v-model="currentPage"
                        :per-page="perPage"
                        :total-rows="totalAddresses"
                        align="center"
                    ></b-pagination>
                    <div class="info-container">
                        <p>تعداد کل آدرس‌ها: {{ totalAddresses }}</p>
                        <p>تعداد صفحات: {{ totalPages }}</p>
                    </div>
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import apiService from '../apiService'

export default {
    setup() {
        const addresses = ref([])
        const fields = [
            {key: 'first_name', label: 'نام'},
            {key: 'last_name', label: 'نام خانوادگی'},
            {key: 'address', label: 'آدرس'},
            {key: 'gender', label: 'جنسیت'}
        ]
        const currentPage = ref(1)
        const perPage = ref(10)
        const totalAddresses = ref(0)
        const isLoading = ref(true)

        const fetchAddresses = async () => {
            try {
                const response = await apiService.fetchAddresses()
                addresses.value = response.data
                totalAddresses.value = addresses.value.length
            } catch (error) {
                console.error('Error fetching addresses:', error)
            } finally {
                isLoading.value = false
            }
        }

        const paginatedAddresses = computed(() => {
            const start = (currentPage.value - 1) * perPage.value
            return addresses.value.slice(start, start + perPage.value)
        })

        const totalPages = computed(() => {
            return Math.ceil(totalAddresses.value / perPage.value)
        })

        onMounted(() => {
            fetchAddresses()
        })

        return {
            addresses,
            fields,
            currentPage,
            perPage,
            totalAddresses,
            totalPages,
            paginatedAddresses,
            fetchAddresses,
            isLoading
        }
    }
}
</script>

<style scoped>
.loading-spinner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loading-message {
    margin-top: 10px;
    font-size: 1.2em;
    color: #555;
}

.address-field-title{
    color: #9B9B9B;
    font-weight: 400;
    font-size: 14px;
}

.address-filed-value{
    color: #37474F;
    font-weight: 700;
    font-size: 16px;
}
</style>
