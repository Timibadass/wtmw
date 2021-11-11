const apiKey = '?apiKey=39df5a84&'
const actions = {
    async fetchMovie({ commit }, { param, searchType }) {
        try {
            const response = await this.$axios({
                url: `${apiKey}${searchType}=${param}`,
                method: 'GET',
            })
            const { data } = response
            commit('SET_MOVIE_INFO', data)
            return data
        } catch (error) {
            return error
        }
    },
    async searchForMovie({ commit, state }, title) {
        let url = null
        const totalPages = state.totalPages
        if (totalPages) {
            url = `${apiKey}s=${title}`
        } else {
            url = `${apiKey}s=${title}`
        }
        try {
            const response = await this.$axios({
                url,
                method: 'GET',
            })
            const { data } = response
            const movies = data.Search ? data.Search : data
            commit('SET_MOVIES', movies)
            if (data.Search) {
                const totalPages = Math.floor(Math.round(data.totalResults / 10))
                commit('SET_TOTAL_PAGES', totalPages)
            }
            return movies
        } catch (error) {
            return error
        }
    },
}
export default actions