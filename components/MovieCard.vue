<template>
  <section class="movie">
    <router-link :to="{ name: 'id', params: { id: movie.imdbID } }">
      <div class="movie-image__container">
        <img
          ref="image"
          src="@/assets/images/placeholder.jpeg"
          :alt="movie.Title"
          :data-src="movie.Poster"
          class="movie__image"
        />
      </div>
      <div class="movie-info__div">
        <p class="movie__text">
          <span class="movie__text--bold">Title:</span> {{ movie.Title }}
        </p>
        <p class="movie__text">
          <span class="movie__text--bold">Production Year:</span>
          {{ movie.Year }}
        </p>
      </div>
    </router-link>
  </section>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.lazyLoadImages()
  },
  methods: {
    lazyLoadImages() {
      const image = this.$refs.image

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }

      const fetchImage = (url) => {
        return new Promise((resolve, reject) => {
          const image = new Image()
          image.src = url
          image.onload = resolve
          image.onerror = reject
        })
      }

      const loadImage = (image) => {
        const src = image.dataset.src
        fetchImage(src).then(() => {
          image.src = src
        })
      }

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            loadImage(entry.target)
          }
        })
      }

      // The observer for the images on the page
      const observer = new IntersectionObserver(handleIntersection, options)

      observer.observe(image)
    },
  },
}
</script>

<style lang="scss" scoped>
.movie {
  border-radius: 8px;
  margin-top: 30px;
  max-width: 300px;
  width: 100%;
  height: 250px;
  border: 1px solid #eee;
  &:hover {
    box-shadow: 1px 3px 4px 1px rgb(227 227 227 / 83%);
  }
  &-image {
    &__container {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      height: 180px;
      position: relative;
    }
    &__overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: #fff;
      top: 0;
    }
  }
  &-info {
    &__div {
      padding: 0 16px;
    }
  }
  &__image {
    height: 100%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    object-fit: cover;
    height: 180px;
    width: 100%;
  }
  &__text {
    margin-top: 10px;
    font-weight: 300;
    &--bold {
      font-weight: 700;
    }
  }
  @media (min-width: 1024px) {
    max-width: 350px;
  }
}
</style>
