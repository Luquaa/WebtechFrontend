import {describe, it, expect, vi} from 'vitest'
import {shallowMount, flushPromises} from '@vue/test-utils'
import Watchlist from '@/components/Watchlist.vue'
import axios from 'axios'

describe('Watchlist', () => {
    const emptyResponse = []
    const twoItemResponse = [
        {id: 1, title: 'Movie 1', poster_path: '/path1', overview: 'Overview 1'},
        {id: 2, title: 'Movie 2', poster_path: '/path2', overview: 'Overview 2'}
    ]


    vi.mock('axios')
    it('should render the component', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: emptyResponse})

        const wrapper = shallowMount(Watchlist)
        expect(wrapper.exists()).toBe(true)
    })

    it('should render the movies from the backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const movie = twoItemResponse[0].title
        const wrapper = shallowMount(Watchlist)

        await flushPromises()

        expect(wrapper.text()).toContain(movie)
    })

    it('should render message when no movies received from backend', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: emptyResponse})

        const msg = 'No movies in watchlist'
        const wrapper = shallowMount(Watchlist)

        await flushPromises()

        expect(wrapper.text()).toContain(msg)
    })

    it('should remove a movie from the watchlist', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const wrapper = shallowMount(Watchlist)

        await flushPromises()

        wrapper.vm.removeFromWatchlist(twoItemResponse[0].id)

        expect(wrapper.vm.watchlist).not.toContain(twoItemResponse[0])
    })

    it('should remove a movie from the watched list', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const wrapper = shallowMount(Watchlist)

        await flushPromises()

        wrapper.vm.markAsWatched(twoItemResponse[0].id)
        expect(wrapper.vm.isMovieWatched(twoItemResponse[0].id)).toBe(true)

        wrapper.vm.removeFromWatched(twoItemResponse[0].id)
        expect(wrapper.vm.isMovieWatched(twoItemResponse[0].id)).toBe(false)
    })

    it('should toggle the watched status of a movie', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const wrapper = shallowMount(Watchlist)

        await flushPromises()

        wrapper.vm.toggleWatched(twoItemResponse[0].id)

        expect(wrapper.vm.isMovieWatched(twoItemResponse[0].id)).toBe(true)

        wrapper.vm.toggleWatched(twoItemResponse[0].id)

        expect(wrapper.vm.isMovieWatched(twoItemResponse[0].id)).toBe(false)
    })

    it('should mark a movie as watched', async () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: twoItemResponse})

        const wrapper = shallowMount(Watchlist)

        wrapper.vm.watchlist.push(twoItemResponse[0])

        await flushPromises()

        wrapper.vm.markAsWatched(twoItemResponse[0].id)

        expect(wrapper.vm.isMovieWatched(twoItemResponse[0].id)).toBe(true)
    })
})