<template>
    <table class="table table-hover mx-auto">
        <thead>
            <tr>
                <th>Airline</th>
                <th>Flight</th>
                <th>Departure</th>
                <th>Departure Time</th>
                <th>Arrival</th>
                <th>Arrival Time</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="flights.length === 0">
                <td colspan="8">No flight Available</td>
            </tr>
            <tr v-for="flight in flights" :key="flight.flight_iata">
                <td>{{ flight.airline_iata ?? 'N/A' }}</td>
                <td>{{ flight.flight_iata ?? 'N/A' }}</td>
                <td>{{ flight.dep_iata ?? 'N/A' }}</td>
                <td>{{ formatTime(flight.dep_time) ?? 'N/A' }}</td>
                <td>{{ flight.arr_iata ?? 'N/A' }}</td>
                <td>{{ formatTime(flight.arr_time) ?? 'N/A' }}</td>
                <td>
                    <span class="status" :class="{
                        'status-active': flight.status.toUpperCase() === 'ACTIVE',
                        'status-scheduled': flight.status.toUpperCase() === 'SCHEDULED',
                        'status-landed': flight.status.toUpperCase() === 'LANDED',
                        'status-cancelled': flight.status.toUpperCase() === 'CANCELLED'
                    }">
                        {{ flight.status.toUpperCase() ?? 'N/A' }}
                    </span>
                </td>
                <td>
                    <button @click.stop="showDetails(flight)" class="btn btn-light btn-sm btn-block">Quick</button>
                    <button @click.stop="moveToDetailsPage(flight)" class="btn btn-dark btn-sm btn-block">Full</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
export default {
    name: "FlightTable",
    props: {
        flights: {
            type: Array,
            required: true,
        },
    },
    emits: ["show", "navigate"],

    methods: {
        formatTime(dateTimeString) {
            if (!dateTimeString) return 'N/A';
            const date = new Date(dateTimeString);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        showDetails(flight) {
            this.$emit("show", flight);
        },

        moveToDetailsPage(flight) {
            this.$emit("navigate", flight);
        },
    },
};
</script>
  
  
<style>
.table td {
    vertical-align: middle;
}

thead th:nth-child(1) {
    width: 10%;
}

thead th:nth-child(2) {
    width: 12.5%;
}

thead th:nth-child(3) {
    width: 10%;
}

thead th:nth-child(4) {
    width: 13%;
}

thead th:nth-child(5) {
    width: 10%;
}

thead th:nth-child(6) {
    width: 13%;
}

thead th:nth-child(7) {
    width: 15%;
}

thead th:nth-child(8) {
    width: 14.5%;
}</style>
  