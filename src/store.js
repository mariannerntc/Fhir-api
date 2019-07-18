import Vue from 'vue'
import Vuex from 'vuex'
import {fhirApi} from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    practitioner: { fullName : '', birthDate : '' },
    practitionerId: 1984415,
    deviceListId: 1986152,
    deviceIdsList: [],
    devices: []
  },
  getters: {
    allDevices (state) {
      return state.devices;
    },
    practitioner (state) {
      return state.practitioner;
    },
    practitionerId (state) {
      return state.practitionerId;
    },
    deviceListId (state) {
      return state.deviceListId;
    }
  },
  mutations: {
    setPractitioner (state, practitioner) {
      state.practitioner = practitioner
    },
    setDeviceIdsList (state, deviceIdsList) {
      state.deviceIdsList = deviceIdsList
    }
  },
  actions: {
    async getPractitioner ({commit}, practitionerId) {
      let response = await fhirApi({
        method: 'get',
        url: '/Practitioner/' + practitionerId,
      })
      const practitioner = {
        fullName: response.data.name[0].text,
        birhtDate: response.data.birthDate
      }
      commit('setPractitioner', practitioner)
    },
    async getDeviceIdsList ({commit}, deviceListId) {
      let response = await fhirApi({
        method: 'get',
        url: 'List/' + deviceListId
      })
      let deviceIdsList = [];
      response.data.entry.forEach(e => {
        deviceIdsList.push(e.item.reference);
      });
      console.log(deviceIdsList);
      commit('setDeviceIdsList', deviceIdsList)
    }
  }
})
