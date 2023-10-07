<template>
    <div class="d-flex justify-content-center mb-3">
        <select v-model="selected" class="ovatu__airport-select">
            <option v-for="airport in airports" :key="airport.slug" :value="airport.icao_code">
                {{ airport.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "AirportSelect",
    props: {
        airports: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            default: null
        }
    },
    emits: ["update:value"],

    computed: {
        selected: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("update:value", val);
            }
        }
    }
};
</script>

<style>
.ovatu__airport-select {
    border: 1px solid #ccc;
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: border-color 0.2s;
    width: 400px;
}

.ovatu__airport-select:hover {
    border-color: #003D70;
}
</style>