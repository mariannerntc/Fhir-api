import Vue from 'vue'
import Vuex from 'vuex'
import {fhirApi} from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    practitioner: { fullName : '', birthDate : '' },
    practitionerId: 1984415,
    deviceListId: 1986152,
    devicesIdList: [],
    devices: [],
    deviceTypes: [
      {'value' : 'balance', 'text' : 'Balance'},
      {'value' : 'blood monitor', 'text' : 'Blood pressure monitor'},
      {'value' : 'thermometer', 'text' : 'Thermometer'},
      {'value' : 'ecg', 'text' : 'Electrocardiogram'},
      {'value' : 'ultrasound', 'text' : 'ultrasound'},
    ]
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
    },
    allDeviceTypes (state) {
      return state.deviceTypes
    }
  },
  mutations: {
    setPractitioner (state, practitioner) {
      state.practitioner = practitioner
    },
    setDevicesIdList (state, devicesIdList) {
      state.devicesIdList = devicesIdList
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
    async getDevicesIdList ({commit}, deviceListId) {
      let response = await fhirApi({
        method: 'get',
        url: 'List/' + deviceListId
      })
      let devicesIdList = [];
      response.data.entry.forEach(e => {
        devicesIdList.push(e.item.reference);
      });
      console.log(devicesIdList);
      commit('setDevicesIdList', devicesIdList)
    }
  }
})
