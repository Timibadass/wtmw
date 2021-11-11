const mutations = {
    SET_MOVIE_INFO(state, movieInfo) {
        state.movieInfo = movieInfo
    },
    SET_MOVIES(state, movies) {
        state.movies = movies
    },
    SET_TOTAL_PAGES(state, totalPages) {
        state.totalPages = totalPages
    },
}

export default mutations