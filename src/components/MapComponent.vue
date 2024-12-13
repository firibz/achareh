<template>
    <div id="map" style="height: 400px; width: 100%; overflow: hidden">
        <div className="bg-white location-icon">
            <img @click="getCurrentLocation" src="@/assets/current-location.svg"/>
        </div>
    </div>
</template>

<script>
import {ref, nextTick, onMounted} from 'vue'
import L from 'leaflet'

export default {
    emits: ['location-found'],
    setup(props, {emit}) {
        const latLng = ref({lat: null, lng: null})
        const mapInstance = ref(null)
        let currentMarker = null

        onMounted(() => {
            nextTick(() => {
                if (!mapInstance.value) {
                    mapInstance.value = L.map('map').setView([35.6892, 51.3890], 13)
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(mapInstance.value)

                    mapInstance.value.on('click', function (e) {
                        if (currentMarker) {
                            mapInstance.value.removeLayer(currentMarker)
                        }
                        latLng.value = e.latlng
                        currentMarker = L.marker(e.latlng).addTo(mapInstance.value)
                        emit('location-found', e.latlng)
                    })
                } else {
                    mapInstance.value.invalidateSize()
                }
            })
        })

        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const {latitude, longitude} = position.coords
                    if (mapInstance.value) {
                        const currentLocation = L.latLng(latitude, longitude)
                        latLng.value = currentLocation
                        mapInstance.value.setView(currentLocation, 13)
                        if (currentMarker) {
                            mapInstance.value.removeLayer(currentMarker)
                        }
                        currentMarker = L.marker(currentLocation).addTo(mapInstance.value)
                        emit('location-found', currentLocation)
                    }
                }, error => {
                    console.error('Error getting current location:', error)
                })
            } else {
                console.error('Geolocation is not supported by this browser.')
            }
        }

        return {
            latLng,
            getCurrentLocation,
            mapInstance
        }
    }
}
</script>

<style scoped>
#map {
    height: 400px;
    width: 100%;
}

.location-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 58px; /* Adjust size as needed */
    height: 58px; /* Adjust size as needed */
    cursor: pointer;
    z-index: 999999;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
