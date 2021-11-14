<template>
  <div class="pagination">
    <div class="pagination__container">
      <button
        class="
          pagination__button
          pagination__button--wide
          pagination__button--top-left
        "
        :disabled="current === 1"
        @click="$emit('page-change', current - 1)"
      >
        Prev
      </button>
      <div class="pagination-numbers__div">
        <button
          v-for="page in pages"
          v-show="page < 10"
          :key="page"
          :ref="'number' + page"
          :disabled="current === page"
          class="pagination__button pagination__button--small"
          @click="$emit('page-change', page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        class="
          pagination__button
          pagination__button--wide
          pagination__button--top-right
        "
        :disabled="current === pages"
        @click="$emit('page-change', current + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  watch: {
    current(val) {
      const refName = 'number' + val
      const button = this.$refs[refName][0]
      button.scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  margin: 30px 0;
  &__container {
    display: flex;
    gap: 5px;
  }
  &-numbers__div {
    max-width: 180px;
    display: inline-flex;
    overflow-x: scroll;
    gap: 5px;
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
    }
    @media (min-width: 768px) {
      max-width: 100%;
    }
  }
  &__button {
    background: transparent;
    border: 1px solid rgba(238, 238, 238, 0.4);
    color: #fff;
    height: 40px;
    box-sizing: border-box;
    transition: all 300ms ease-in-out;
    padding: 8px 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &:disabled {
      cursor: not-allowed;
      background: rgba(238, 238, 238, 0.1);
      color: rgba(255, 255, 255, 0.5);
    }
    &:hover {
      font-size: 18px;
    }
    &--small {
      width: 30px;
      border-radius: 2px;
    }
    &--wide {
      width: 60px;
    }
    &--top-left {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &--top-right {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
