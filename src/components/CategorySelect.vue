<template>
  <div class="d-flex justify-content-center my-3">
    <div class="ovatu__category-button--wrapper">
      <button @click="selectCategory('arrivals')" :class="{ active: current === 'arrivals' }"
        class="ovatu__category-button">Arrivals</button>
      <button @click="selectCategory('departures')" :class="{ active: current === 'departures' }"
        class="ovatu__category-button ml-2">Departures</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: {
    current: {
      type: String,
      default: null
    }
  },
  emits: ["update:current", "fetch"],

  methods: {
    selectCategory(category) {
      this.$emit("update:current", category);
      this.$emit("fetch", category);
    }
  }
};
</script>

<style>
.ovatu__category-button {
  font-size: 16px;
  padding: 8px 16px;

  background-color: white;
  color: #003D70;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #003D70;
  width: calc(50% - 1px);
}

.ovatu__category-button:hover {
  filter: drop-shadow(2px 4px 8px rgba(97, 97, 97, 0.2));
}

.ovatu__category-button.active {
  background-color: #003D70;
  color: white;
}

.ovatu__category-button--wrapper {
  width: 400px;
  display: flex;
  justify-content: space-between;
}
</style>