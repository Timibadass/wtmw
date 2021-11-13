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
        <p class="movie__text movie__text--faded">
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
          if (url !== 'N/A') {
            image.src = url
            image.onload = resolve
          }
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
  flex-basis: 100%;
  /* max-width: 350px; */
  width: 100%;
  height: 250px;
  border: 1px solid rgba(238, 238, 238, 0.4);
  &:hover {
    box-shadow: 4px 4px 20px rgba(249, 249, 249, 0.15);
  }
  &-image {
    &__container {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      height: 180px;
      position: relative;
      overflow: hidden;
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
    transition: transform 0.3s cubic-bezier(1, 0.08, 0, 0.35);
    &:hover {
      transform: scale(1.5);
    }
  }
  &__text {
    font-family: 'Source Sans Pro', sans-serif;
    margin-top: 10px;
    font-weight: 300;
    &--bold {
      font-weight: 700;
    }
    &--faded {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  @media (min-width: 768px) {
    flex-grow: 2;
    flex-basis: 48%;
  }
  @media (min-width: 1024px) {
    max-width: 300px;
  }
  @media (min-width: 1280px) {
    max-width: 395px;
    flex-basis: 33%;
  }
}
</style>
