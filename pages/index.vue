<template>
  <section class="movie-search">
    <h1 class="movie-search__heading">WTMR</h1>
    <Search @search-title="findMovies" />
    <div v-if="moviesArray && moviesArray.length > 0" class="movies">
      <MovieCard
        v-for="movie in moviesArray"
        :key="movie.imdbID"
        :movie="movie"
      />
    </div>
    <p v-else-if="movies && movies.Error">{{ movies.Error }}</p>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Landing',
  async asyncData({ store }) {
    const moviesArray = [
      'Avatar',
      'The Shawshank Redemption',
      'Interstellar',
      'Black Widow',
      'Marriage Story',
      'Gibby',
      'Snatch',
      'A Royal Winter',
      'Marley Me',
      'Animal House',
      'Finding Neverland',
      'Howards End',
      'Kung Fury',
      'Quadrophenia',
      'West of Memphis',
      'Cocaine Cowboys',
      'Trust',
      'Ozark',
      'White Lines',
      'Mr Robot',
      'Robotech The Movie',
    ]
    const moviesInfo = []
    await Promise.all(
      moviesArray.map(async (title) => {
        try {
          const response = await store.dispatch('fetchMovie', {
            param: title,
            searchType: 't',
          })
          moviesInfo.push(response)
        } catch (error) {}
      })
    )
    return { moviesInfo }
  },
  data() {
    return {
      isFiltered: false,
    }
  },
  computed: {
    ...mapGetters(['movies']),
    moviesArray() {
      if (this.isFiltered) {
        return this.movies
      } else return this.moviesInfo
    },
  },
  methods: {
    ...mapActions(['fetchMovie', 'searchForMovie']),
    async findMovies(val) {
      if (val) {
        try {
          await this.searchForMovie(val)
          this.isFiltered = true
        } catch (error) {}
      } else {
        this.isFiltered = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
}

.movie-search {
  padding: 30px;
  box-sizing: border-box;
  &__heading {
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
    font-weight: 700;
  }
}

.movies {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 768px) {
    gap: 20px;
    max-width: 1300px;
    margin: auto;
  }
}
</style>
