<template>
  <main class="main">
    <section class="main__section">
      <Nuxt />
    </section>
  </main>
</template>

<script>
export default {
  name: 'Default',
  transition: {
    name: 'fade-transform',
    mode: 'out-in',
  },
}
</script>

<style lang="scss">
.main {
  background: #121010;
  color: #fff;
  min-height: 100vh;
  &__section {
    max-width: 1300px;
    margin: auto;
  }
}
</style>
