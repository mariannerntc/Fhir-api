import Vue from 'vue'
import Vuex from 'vuex'
import { fhirApi } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    practitioner: { fullName: '', birthDate: '' },
    practitionerId: 1984415,
    deviceListId: 1989586,
    devicesIdList: [],
    devicesEntryList: [],
    // devices: [{resourceType : '', status : '',type: { coding : [{ code: '', display: ''}]}, expirationDate: '', version: ''}],4
    devices: [],
    deviceTypes: [
      { 'value': 'balance', 'text': 'Balance' },
      { 'value': 'blood pressure monitor', 'text': 'Blood pressure monitor' },
      { 'value': 'thermometer', 'text': 'Thermometer' },
      { 'value': 'ecg', 'text': 'Electrocardiogram' },
      { 'value': 'ultrasound', 'text': 'Ultrasound' }
    ]
  },
  getters: {
    allDevices (state) {
      return state.devices
    },
    practitioner (state) {
      return state.practitioner
    },
    practitionerId (state) {
      return state.practitionerId
    },
    deviceListId (state) {
      return state.deviceListId
    },
    allDeviceTypes (state) {
      return state.deviceTypes
    },
    devicesEntryList (state) {
      return state.devicesEntryList
    },
    devicesIdList (state) {
      return state.devicesIdList
    },
    devices (state) {
      return state.devices
    }
  },
  mutations: {
    setPractitioner (state, practitioner) {
      state.practitioner = practitioner
    },
    setDevicesIdList (state, devicesIdList) {
      state.devicesIdList = devicesIdList
    },
    setDevicesEntryList (state, devicesEntryList) {
      state.devicesEntryList = devicesEntryList
    },
    setDevices (state, devices) {
      state.devices = devices
    },
    addNewDeviceToList (state, newDevice) {
      state.devices.push(newDevice)
    }
  },
  actions: {
    async getPractitioner ({ commit }, practitionerId) {
      let response = await fhirApi({
        method: 'get',
        url: '/Practitioner/' + practitionerId
      })
      const practitioner = {
        fullName: response.data.name[0].text,
        birhtDate: response.data.birthDate
      }
      commit('setPractitioner', practitioner)
    },
    async getDevicesIdList ({ commit, getters }) {
      const deviceListId = getters.deviceListId
      let response = await fhirApi({
        method: 'get',
        url: 'List/' + deviceListId
      })
      let devicesIdList = []
      let devicesEntryList = []
      response.data.entry.forEach(e => {
        devicesIdList.push(e.item.reference.split('/')[1])
        devicesEntryList.push(e)
      })
      commit('setDevicesIdList', devicesIdList)
      commit('setDevicesEntryList', devicesEntryList)
    },
    async getDevices ({ commit, getters }) {
      const devicesIdList = getters.devicesIdList
      let devices = []
      let response = null
      for (let i = 0; i < devicesIdList.length; i++) {
        response = await fhirApi.get('/Device/' + devicesIdList[i])
        devices.push(response.data)
      }
      commit('setDevices', devices)
    },
    async addDevice ({ commit, dispatch }, { status, deviceType, display, expirationDate, version }) {
      const toSend = {
        resourceType: 'Device',
        status: status ? 'active' : 'inactive',
        type: {
          coding: [{
            code: deviceType,
            display: display
          }]
        },
        expirationDate: expirationDate,
        version: version
      }
      let response = await fhirApi({
        method: 'post',
        url: '/Device',
        headers: { 'Content-Type': 'application/fhir+json' },
        data: toSend
      })
      const newDeviceId = response.data.id
      await dispatch('updateList', newDeviceId)
      commit('addNewDeviceToList', toSend)
    },
    async updateList ({ getters }, newDeviceId) {
      let deviceListId = getters.deviceListId
      let devicesEntryList = getters.devicesEntryList
      devicesEntryList.push({
        date: new Date().toISOString().substr(0, 10),
        item: {
          reference: 'Device/' + newDeviceId
        }
      })
      const newList = {
        resourceType: 'List',
        id: deviceListId,
        status: 'current',
        title: "Practitioner's devices",
        source: 'Practitioner/1984415',
        entry: devicesEntryList
      }
      await fhirApi({
        method: 'put',
        url: '/List/' + deviceListId,
        headers: { 'Content-Type': 'application/fhir+json' },
        data: newList
      })
    }
  }
})
