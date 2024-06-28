import {describe, it, expect, vi} from 'vitest'
import {shallowMount, flushPromises} from '@vue/test-utils'
import Movie from '@/components/Movie.vue'
import axios from 'axios'

describe('Movie', () => {
    const movieResponse = [
        {id: 1, title: 'Test Movie', imageUrl: 'http://test.com', description: 'Test Description'}
    ]

    vi.mock('axios')
    it('should render the component', () => {
        vi.mocked(axios, true).get.mockResolvedValueOnce({data: movieResponse})

        const wrapper = shallowMount(Movie)
        expect(wrapper.exists()).toBe(true)
    })
})