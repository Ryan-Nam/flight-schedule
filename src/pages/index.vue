<template>
  <SearchBar v-model:query="searchQuery" />
  <AirportSelect :airports="airports" v-model:value="selectedAirport" />
  <CategorySelect v-model:current="currentCategory" @fetch="fetchFlights" />


  <div v-if="isLoading">
    <Loading :active.sync="isLoading" loader="dots" color="#000"></Loading>
  </div>

  <div v-else>
    <FlightTable :flights="paginatedFlights" @show="showDetails" @navigate="moveToPage" />
    <Pagination :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />
  </div>
  <Modal :flight="selectedFlight" :category="currentCategory" @close="closeDetails" />
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from 'vue-router';


// components
import SearchBar from "@/components/SearchBar.vue";
import AirportSelect from "@/components/AirportSelect.vue";
import CategorySelect from "@/components/CategorySelect.vue";
import FlightTable from "@/components/FlightTable.vue";
import Pagination from "@/components/Pagination.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    SearchBar,
    AirportSelect,
    CategorySelect,
    FlightTable,
    Pagination,
    Modal,
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    }
  },

  setup() {
    const isLoading = ref(false);


    const $route = useRoute();
    const $router = useRouter();
    const handleOutsideClick = () => {
      closeDetails();
    };

    // Route
    const router = useRouter();
    const moveToPage = (data) => {
      // console.log(data);

      // option 1 - Simple
      // router.push(data);

      // option 2 - good for maintenance
      router.push({
        name: 'flightdetail',
        params: {
          // Passing these 3 to request API
          id: data.flight_number,
          flight_icao: data.flight_icao,
          flight_iata: data.flight_iata,
        }
      });
    };

    // can be 'departures' or 'arrivals'
    const currentCategory = ref(null);

    // Modal
    const selectedFlight = ref(null);

    const showDetails = (flight) => {
      selectedFlight.value = flight;
      // console.log("Current Category:", currentCategory.value);
    }

    const closeDetails = () => {
      selectedFlight.value = null;
    }

    const airports = ref([]);

    onMounted(async () => {
      const API_KEY = process.env.VUE_APP_AIRLABS_API_KEY;
      const API_URL = `https://airlabs.co/api/v9/airports?country_code=AU&api_key=${API_KEY}`;
      // const MOCK_URL = '/Airlabs/airport.json';

      try {
        const response = await axios.get(API_URL);
        airports.value = response.data.response.filter(
          (airport) => airport.is_major === 1 // major only
        );
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    });

    // For Search
    const searchQuery = ref('');

    const filteredFlights = computed(() => {
      if (searchQuery.value) {
        return flights.value.filter(flight =>
          (flight.flight_iata && flight.flight_iata.includes(searchQuery.value)) ||
          (flight.airline_iata && flight.airline_iata.includes(searchQuery.value))
        );
      }
      return flights.value;
    });

    // For Pagination
    const itemsPerPage = ref(8);
    const currentPage = ref(1);

    // when searchQuery is changed. init currentPage to 1
    watch(searchQuery, () => {
      currentPage.value = 1;
    });

    // when currentCategory is changed. init currentPage to 1
    // watch(currentCategory, () => {
    //   currentPage.value = 1;
    // });

    const totalPages = computed(() => {
      return Math.ceil(filteredFlights.value.length / itemsPerPage.value);
    });

    const paginatedFlights = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredFlights.value.slice(start, end);
    });


    // Displaying Flight Data
    const selectedAirport = ref(null);
    const flights = ref([]);

    const fetchFlights = async (type) => {
      // Loading start
      isLoading.value = true;
      // set the current category
      currentCategory.value = type;
      try {
        const API_KEY = process.env.VUE_APP_AIRLABS_API_KEY;
        const endpoint =
          type === "departures"
            ? `https://airlabs.co/api/v9/schedules?dep_icao=${selectedAirport.value}&api_key=${API_KEY}`
            : `https://airlabs.co/api/v9/schedules?arr_icao=${selectedAirport.value}&api_key=${API_KEY}`;

        const response = await axios.get(endpoint);
        flights.value = response.data.response;
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        // Loading completed 
        isLoading.value = false;
      }
    };

    // init state based on query parameters
    const initializeStateFromQuery = (fetchRequired = true) => {
      if ($route.query.airport) {
        selectedAirport.value = $route.query.airport;
      }
      if ($route.query.category && fetchRequired) {
        currentCategory.value = $route.query.category;
        fetchFlights($route.query.category);
      }
      if ($route.query.page) {
        currentPage.value = Number($route.query.page);
      }
    };
    onMounted(initializeStateFromQuery);

    watch(() => $route.query, () => {
      // watch query parameters change
      const fetchRequired = $route.query.category !== currentCategory.value;
      initializeStateFromQuery(fetchRequired);
    });

    // update url, when major airport is changed
    watch(selectedAirport, (newAirport) => {
      $router.push({
        query: {
          ...$route.query,
          airport: newAirport
        }
      });
    });

    // update url when the category is changed
    watch(currentCategory, (newCategory) => {
      $router.push({
        query: {
          ...$route.query,
          category: newCategory
        }
      });
    });

    // update url when the current page is changed
    watch(currentPage, (newPage) => {
      $router.push({
        query: {
          ...$route.query,
          page: newPage
        }
      });
    });

    return {
      isLoading,
      handleOutsideClick,
      currentCategory,
      airports,
      selectedAirport,
      fetchFlights,
      flights,
      searchQuery,
      currentPage,
      totalPages,
      paginatedFlights,
      selectedFlight,
      showDetails,
      closeDetails,
      moveToPage,
    };
  },
};
</script>

<style></style>
