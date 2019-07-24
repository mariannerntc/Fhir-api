import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import DeviceDisplay from '@/components/DeviceDisplay.vue'

describe('DeviceDisplay.vue', () => {
  it('shows device info', () => {
    const display = 'Thermometer'
    const code = 'thermometer'
    const version = '1'
    const expirationDate = '2019-01-12'
    const status = 'active'
    const id = '15'
    const wrapper = shallowMount(DeviceDisplay, {
      propsData: { display, code, version, expirationDate, status, id }
    })
    expect(wrapper.text()).to.include(display, code, version, expirationDate, status)
  })
})
