<template>
    <div v-if="flight" class="flight-details-modal" @click="handleOutsideClick">
        <div class="flight-details-content" @click.stop>
            <h2 class="text-capitalize text-center mb-4">{{ category ? category : 'No category set' }} Flight</h2>
            <div class="row">
                <div class="col-md-6 border-right">
                    <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                        <strong>Airline:</strong>
                        <span>{{ flight.airline_iata ?? 'N/A' }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                        <strong>Flight Number:</strong>
                        <span>{{ flight.flight_iata ?? 'N/A' }}</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                        <strong>Status:</strong>
                        <span class="status" :class="{
                            'status-active': flight.status.toUpperCase() === 'ACTIVE',
                            'status-scheduled': flight.status.toUpperCase() === 'SCHEDULED',
                            'status-landed': flight.status.toUpperCase() === 'LANDED',
                            'status-cancelled': flight.status.toUpperCase() === 'CANCELLED'
                        }">
                            {{ flight.status.toUpperCase() ?? 'N/A' }}
                        </span>
                    </div>
                </div>
                <div class="col-md-6">
                    <template v-if="category === 'departures'">
                        <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                            <strong>Terminal:</strong>
                            <span>{{ flight.dep_terminal ?? 'N/A' }}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                            <strong>Gate:</strong>
                            <span>{{ flight.dep_gate ?? 'N/A' }}</span>
                        </div>
                    </template>

                    <template v-if="category === 'arrivals'">
                        <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                            <strong>Terminal:</strong>
                            <span>{{ flight.arr_terminal ?? 'N/A' }}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                            <strong>Gate:</strong>
                            <span>{{ flight.arr_gate ?? 'N/A' }}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-3" style="width: 250px;">
                            <strong>Baggage:</strong>
                            <span>{{ flight.arr_baggage ?? 'N/A' }}</span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="mt-4">
                <button class="btn btn-dark" @click="closeModal">Close</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Modal",
    props: {
        flight: Object,
        category: String
    },
    emits: ["close"],

    methods: {
        handleOutsideClick() {
            this.$emit("close");
        },
        closeModal() {
            this.$emit("close");
        }
    }
};
</script>
<style>
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
.btn-dark {
    background-color: #003D70;
}
.flight-details-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
.flight-details-content {
    background: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 800px;
}
h2 {
    border-bottom: 2px solid #003D70;
    padding-bottom: 10px;
}
.btn-dark {
    background-color: #003D70;
}
.row.bg-light {
    background-color: #f7f7f7 !important;
}
p {
    line-height: 1.6;
}

strong {
    color: #888;
}

span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.mt-4 {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>