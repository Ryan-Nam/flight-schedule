<template>
    <div class="d-flex justify-content-center mb-3">
        <form class="search-form">
            <input v-model="internalQuery" class="form-control search-input" type="search"
                placeholder="Enter flight # or airline" aria-label="Search" @input="updateQuery">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-search search-icon" viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </form>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        query: {
            type: String,
            default: ""
        }
    },
    emits: ["update:query"],
    data() {
        return {
            internalQuery: this.query
        }
    },
    methods: {
        updateQuery() {
            this.$emit("update:query", this.internalQuery);
        }
    }
};
</script>

<style>
.search-form {
    position: relative;
    width: 400px;
}

.search-input {
    width: 100%;
    box-sizing: border-box;
    padding-right: 35px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    outline: none;
}

.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}

.search-input:focus {
    border-bottom: 2px solid #003D70;
}
</style>