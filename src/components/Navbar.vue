<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-content">
      <router-link class="navbar-brand" to="/">Flights Schedule</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/flightdetails">Documentation</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>

<style>
.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
