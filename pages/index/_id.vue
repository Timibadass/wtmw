<template>
  <div class="overlay" @click.self="$router.push('/')">
    <section ref="movieDiv" class="movie">
      <button class="back__button" @click="$router.push('/')">Back</button>
      <div class="movie-image__container">
        <img :src="movie.Poster" :alt="movie.Title" class="movie__image" />
      </div>
      <div class="movie-info__container">
        <h1 class="movie__heading">
          {{ movie.Title }} <span class="">({{ movie.Year }})</span>
        </h1>
        <p class="movie__text">{{ movie.Plot }}</p>
        <p class="movie__text">
          <span class="movie-info__title">Rated:</span> {{ movie.Rated }}
        </p>
        <p class="movie__text">
          <span class="movie-info__title">Genre:</span> {{ movie.Genre }}
        </p>
        <p class="movie__text">
          <span class="movie-info__title">Released:</span> {{ movie.Released }}
        </p>
        <p class="movie__text">
          <span class="movie-info__title">Actors:</span> {{ movie.Actors }}
        </p>
        <h2 class="movie__subheading">Ratings</h2>
        <div
          v-for="(rating, index) in movie.Ratings"
          :key="index"
          class="movie-rating__container"
        >
          <client-only>
            <star-rating
              class="movie__rating"
              :rating="formatRating(rating.Value, rating.Source)"
              :star-style="{ starWidth: 30, starHeight: 30 }"
              :is-indicator-active="false"
            ></star-rating>
          </client-only>
          <p class="movie__text">{{ rating.Value }} ({{ rating.Source }})</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StarRating from 'vue-dynamic-star-rating'
export default {
  name: 'MovieInfo',
  components: {
    StarRating,
  },
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
  mounted() {
    this.displayInfo()
  },
  methods: {
    formatRating(val, source) {
      let rating = null
      switch (source) {
        case 'Internet Movie Database':
          rating = (parseInt(val) / 10) * 5
          break
        case 'Rotten Tomatoes':
          rating = (parseInt(val) / 100) * 5
          break
        case 'Metacritic':
          rating = (parseInt(val) / 100) * 5
          break
      }
      return rating
    },
    displayInfo() {
      const movieDiv = this.$refs.movieDiv
      setTimeout(() => {
        movieDiv.classList.add('movie--active')
      }, 300)
    },
  },
}
</script>

<style lang="scss" scoped>
.back {
  &__button {
    margin: 30px 20px;
    border: 1px solid rgba(238, 238, 238, 0.4);
    color: #fff;
    height: 40px;
    box-sizing: border-box;
    transition: all 300ms ease-in-out;
    padding: 8px 16px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 4px;
    &:hover {
      font-size: 18px;
    }
    @media (min-width: 768px) {
      margin-left: 50px;
    }
    @media (min-width: 1024px) {
      margin-left: 100px;
    }
  }
}
.movie {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  background: #121010;
  transition: all 300ms ease-in-out;
  min-height: 100vh;
  &--active {
    transform: translateX(0);
  }
  &-info__container {
    padding: 0 16px;
    padding-bottom: 30px;
  }
  &-image__container {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
    margin-bottom: 30px;
    overflow: hidden;
  }
  &__image {
    width: 100%;
    object-fit: contain;
  }
  &__heading {
    font-weight: 700;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 22px;
    margin-bottom: 20px;
  }
  &__subheading {
    font-size: 20px;
    margin: 15px 0;
  }
  &__text {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 21px;
  }
  &-info__title {
    background: rgba(255, 255, 0.2);
    color: #000;
    display: inline-block;
    padding: 3px;
    border-radius: 3px;
  }
  &-rating__container {
    margin-bottom: 20px;
  }
  &__rating {
    margin-bottom: 10px;
  }
  @media (min-width: 768px) {
    width: 500px;
    transform: translateX(500px);
    &--active {
      transform: translateX(0);
    }
    &-image__container {
      margin: auto;
      margin-top: 50px;
      border-radius: 8px;
      max-width: 400px;
      height: 350px;
      flex-grow: 2;
    }
    &-info__container {
      max-width: 400px;
      margin: auto;
      margin-top: 30px;
    }
  }
  @media (min-width: 1024px) {
    flex-direction: column;
    width: 600px;
  }
}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
