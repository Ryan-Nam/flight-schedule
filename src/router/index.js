import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/index.vue';
import FlightDetails from '../pages/flightdetails/index.vue';
import FlightDetail from '../pages/flightdetails/_id.vue';


// Page 1: Home
// Page 2: flight-details/:flightnumber => flight-details/6345
// Page 3: Documentation 
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/flightdetails',
      name: 'flightdetails',
      component: FlightDetails,
    },
    {
        path: '/flightdetails/:id',
        name: 'flightdetail',
        component: FlightDetail,
      },
    // {
    //   path: '/flight-details/:flight_number',
    //   name: 'flight-details',
    //   component: FlightDetails,
    //   props: true,
    // },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
