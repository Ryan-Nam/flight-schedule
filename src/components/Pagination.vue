<template>
  <div class="d-flex justify-content-center my-3">
    <nav aria-label="Page navigation for flight schedule">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPage(1)">First</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">&laquo;</a>
        </li>
        <template v-for="page in totalPages" :key="page">
          <li v-if="Math.abs(currentPage - page) <= 5 || page === 1 || page === totalPages" class="page-item"
            :class="{ 'active': currentPage === page }">
            <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
          </li>
          <li v-if="page === 1 && currentPage > 7" class="page-item disabled">
            <span class="page-link">...</span>
          </li>
          <li v-if="page === totalPages && currentPage < totalPages - 6" class="page-item disabled">
            <span class="page-link">...</span>
          </li>
        </template>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">&raquo;</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="goToPage(totalPages)">Last</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ["changePage"],

  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit("changePage", page);
      }
    }
  }
};
</script>

<style>
.pagination .page-link {
  color: #003D70;
}

.pagination .page-item.active .page-link {
  background-color: #003D70;
  border-color: #003D70;
  color: white;
}

.pagination .page-item:hover .page-link {
  background-color: rgba(0, 61, 112, 0.1);
  border-color: #003D70;
}

.pagination .page-item.disabled .page-link {
  color: #aaa;
  pointer-events: none;
  cursor: not-allowed;
}
</style>