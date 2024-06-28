import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header', () => {
  it('should render the component', () => {
    const wrapper = shallowMount(Header)
    expect(wrapper.exists()).toBe(true)
  })
})