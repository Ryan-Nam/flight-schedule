<template>
  <Navbar />
  <div class="container my-5">
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style>
body,
html {
  background-color: #F2F2F2;
}

.container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
