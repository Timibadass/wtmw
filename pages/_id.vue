<template>
  <section>
    <div class="">
      <img :src="movie.Poster" :alt="movie.Title" />
    </div>
    <h1 class="">
      {{ movie.Title }} <span class="">({{ movie.Year }})</span>
    </h1>
    <p class="">{{ movie.Plot }}</p>
    <p class="">Rated: {{ movie.Rated }}</p>
    <p class="">Genre: {{ movie.Genre }}</p>
    <h2 class="">Ratings</h2>
    <p v-for="(rating, index) in movie.Ratings" :key="index" class="">
      {{ rating.Value }} ({{ rating.Source }})
    </p>
  </section>
</template>

<script>
export default {
  name: 'MovieInfo',
  async asyncData({ params, store, error }) {
    const imdbID = params.id
    try {
      const response = await store.dispatch('fetchMovie', {
        param: imdbID,
        searchType: 'i',
      })
      const movie = response
      return { movie }
    } catch (e) {
      error(e)
    }
  },
}
</script>

<style lang="scss" scoped></style>
