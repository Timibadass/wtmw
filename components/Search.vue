<template>
  <div class="search">
    <form class="search__form" @input="emitUserInput" @submit.prevent>
      <input
        id="search"
        v-model="title"
        class="search__input-field"
        type="search"
        name="search"
        placeholder="Enter movie name"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    emitUserInput() {
      const currentValue = this.title
      setTimeout(() => {
        if (currentValue === this.title) {
          this.$emit('search-title', this.title)
        }
      }, 800)
    },
  },
}
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  max-width: 100%;
  margin: 16px 0;
  margin-right: auto;
  @media (min-width: 768px) {
    margin: 24px 0;
  }
  &__form {
    width: 100%;
  }
  &__input-field {
    height: 40px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    font-family: 'Source Sans Pro', sans-serif;
    text-transform: capitalize;
    &::placeholder {
      font-weight: 300;
    }
    border: 1px solid #495057;
  }
}
</style>
