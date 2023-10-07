<template>
    <div class="flight-detail-container">
        <div class="header-container">
            <h2>Flight Details</h2>
            <span class="status" :class="{
                'status-active': selectedFlight.status && selectedFlight.status.toUpperCase() === 'ACTIVE',
                'status-scheduled': selectedFlight.status && selectedFlight.status.toUpperCase() === 'SCHEDULED',
                'status-landed': selectedFlight.status && selectedFlight.status.toUpperCase() === 'LANDED',
                'status-cancelled': selectedFlight.status && selectedFlight.status.toUpperCase() === 'CANCELLED'
            }">
                {{ selectedFlight.status ? selectedFlight.status.toUpperCase() : 'N/A' }}
            </span>
        </div>
        <!-- Airline & Flight Information -->
        <div class="flight-info">
            <span>
                <strong>Airline:</strong>
                {{ selectedFlight.airline_iata ?? 'N/A' }}
            </span>
            <span>
                <strong>Flight Number:</strong>
                {{ selectedFlight.flight_iata ?? 'N/A' }}
            </span>
            <span>
                <strong>Aircraft:</strong>
                {{ selectedFlight.aircraft_icao ?? 'N/A' }}
            </span>
        </div>

        <div class="status-info">
            <div class="flight-route" :class="{
                'flight-landed': selectedFlight.status && selectedFlight.status.toUpperCase() === 'LANDED',
                'flight-cancelled': selectedFlight.status && selectedFlight.status.toUpperCase() === 'CANCELLED',
                'flight-scheduled': selectedFlight.status && selectedFlight.status.toUpperCase() === 'SCHEDULED'
            }">
                <div class="airport">
                    <span class="airport-code">{{ selectedFlight.dep_iata ?? 'N/A' }}</span>
                    <div class="airport-dot"></div>
                </div>
                <span class="flight-line">
                    <i class="fas fa-plane"></i>
                </span>
                <div class="airport">
                    <div class="airport-dot"></div>
                    <span class="airport-code">{{ selectedFlight.arr_iata ?? 'N/A' }}</span>
                </div>
            </div>

            <div class="status-details">
                <span class="delay-departure">
                    <strong>Departure Delay:</strong>
                    {{ selectedFlight.dep_delayed ?? 'N/A' }}
                </span>
                <span class="delay-duration">
                    <strong>Duration:</strong>
                    {{ formattedDuration ?? 'N/A' }}
                </span>
                <span class="delay-arrival">
                    <strong>Arrival Delay:</strong>
                    {{ selectedFlight.arr_delayed ?? 'N/A' }}
                </span>
            </div>
        </div>

        <div class="flight-details-grid">
            <!-- Departure Information -->
            <div class="departure-info">
                <h3>Departure</h3>
                <div class="grid">
                    <strong>Airport:</strong> <span>{{ selectedFlight.dep_iata ?? 'N/A' }}</span>
                    <strong>Estimated Time:</strong> <span>{{ selectedFlight.dep_estimated ?? 'N/A' }}</span>
                    <strong>Terminal:</strong> <span>{{ selectedFlight.dep_terminal ?? 'N/A' }}</span>
                    <strong>Gate:</strong> <span>{{ selectedFlight.dep_gate ?? 'N/A' }}</span>
                    <strong>Scheduled Time:</strong> <span>{{ selectedFlight.dep_time ?? 'N/A' }}</span>
                </div>
            </div>

            <!-- Arrival Information -->
            <div class="arrival-info">
                <h3>Arrival</h3>
                <div class="grid">
                    <strong>Airport:</strong> <span>{{ selectedFlight.arr_iata ?? 'N/A' }}</span>
                    <strong>Estimated Time:</strong> <span>{{ selectedFlight.arr_estimated ?? 'N/A' }}</span>
                    <strong>Terminal:</strong> <span>{{ selectedFlight.arr_terminal ?? 'N/A' }}</span>
                    <strong>Gate:</strong> <span>{{ selectedFlight.arr_gate ?? 'N/A' }}</span>
                    <strong>Scheduled Time:</strong> <span>{{ selectedFlight.arr_time ?? 'N/A' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useRoute } from 'vue-router'

import { ref, onMounted, computed } from "vue";
import axios from 'axios';

export default {
    computed: {
        formattedDuration() {
            const hours = Math.floor(this.selectedFlight.duration / 60);
            const minutes = this.selectedFlight.duration % 60;
            return `${hours} hrs ${minutes} mins`;
        }
    },
    setup() {
        const route = useRoute();
        // const flight_number = route.params.id;
        const flight_icao = route.params.flight_icao;
        const flight_iata = route.params.flight_iata;

        // console.log(flight_number);
        // console.log(flight_icao);

        const selectedFlight = ref({});

        onMounted(async () => {

            const API_KEY = process.env.VUE_APP_AIRLABS_API_KEY;
            let API_URL;

            if (flight_icao) {
                API_URL = `https://airlabs.co/api/v9/schedules?flight_icao=${flight_icao}&api_key=${API_KEY}`;
            } else if (flight_iata) {
                API_URL = `https://airlabs.co/api/v9/schedules?flight_iata=${flight_iata}&api_key=${API_KEY}`;
            } else {
                console.error("Both flight_icao and flight_iata are missing!");
                return;
            }
            try {
                const response = await axios.get(API_URL);
                selectedFlight.value = response.data.response[0];
                // console.log(selectedFlight.value);
            } catch (error) {
                console.error("Error fetching flight details:", error);
            }
        });
        return {
            selectedFlight
        }
    }
}
</script>

<style>
.departure-info {
    margin-right: 5px;  
}
.flight-info {
    display: flex;
    justify-content: space-between;
}
.flight-info>strong,
.flight-info>span {
    flex: 1;
    text-align: center;
}
.flight-info>strong:first-child,
.flight-info>span:first-child {
    text-align: left;
}
.flight-info>strong:last-child,
.flight-info>span:last-child {
    text-align: right;
}
.status-info {
    padding: 20px;
}
.status-details {
    display: flex;
    justify-content: space-between;
    padding-top: 10px; 
}
.status-details > span {
    font-size: 14px; 
    flex: 1;
    text-align: center;
}
.status-details > span:first-child {
    text-align: left;
}
.status-details > span:last-child {
    text-align: right;
}
.status {
    font-weight: normal;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
}
.status-scheduled,
.status-active {
    color: #212529;
    border: 2px solid #212529;
    border-radius: 4px;
}
.status-landed {
    color: #28a745;
    border: 2px solid #28a745;
    border-radius: 4px;
}
.status-cancelled {
    color: #dc3545;
    border: 2px solid #dc3545;
    border-radius: 4px;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flight-detail-container {
    padding: 20px;
    font-size: 16px;
}
h2,
h3 {
    border-bottom: 2px solid #003D70;
    padding-bottom: 10px;
}
h3 {
    padding-top: 10px;
}
strong {
    font-weight: bold;
    margin-right: 10px;
}
.flight-route {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    position: relative;
}
.airport {
    display: flex;
    align-items: center;
}
.airport-dot {
    width: 10px;
    height: 10px;
    background-color: #333;
    border-radius: 50%;
    margin: 0 10px;
}
.airport-code {
    margin: 0 10px;
    font-weight: bold;
}
.flight-line {
    flex-grow: 1;
    border-bottom: 2px dotted #889;
    position: relative;
}
.flight-line .fa-plane {
    position: absolute;
    top: -0.7rem;
    right: 50%;
    transform: translateX(50%);
    font-size: 1.4em;
    color: black;
}
.flight-landed .airport-dot,
.flight-landed .flight-line {
    background-color: green;
}
.flight-landed .fa-plane {
    color: green;
    right: 0%;
    transform: translateX(0%);
}
.flight-cancelled .airport-dot,
.flight-cancelled .flight-line {
    background-color: red;
}
.flight-cancelled .fa-plane {
    color: red;
    right: 100%;
    transform: translateX(0%);
}
.flight-scheduled .fa-plane {
    color: black;
    right: 100%;
    transform: translateX(0%);
}
.flight-info,
.departure-info,
.arrival-info,
.status-info {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
}
.flight-details-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.departure-info,
.arrival-info {
    flex: 1;
    padding: 0 20px;
    background-color: #f6f6f6;
    border-radius: 5px;
    transition: background-color 0.3s;
}
.departure-info:hover,
.arrival-info:hover {
    background-color: #eaeaea;
}
.grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px 20px;
    align-items: center;
    margin-bottom: 15px;
}
.grid strong,
.grid span {
    display: block;
    margin-bottom: 5px;
}
</style>