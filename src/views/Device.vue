<template>
  <div class="device">
    <h1>My devices</h1>
    <Popupform />

    <v-card flat>
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md2>
          <div>Device name</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>Device type</div>
        </v-flex>
          <v-flex xs6 sm4 md2>
          <div>Version</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>Expiration date</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>Satus</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>Actions</div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>

    <DeviceDisplay v-for="deviceDisplay in devices" :key="deviceDisplay.id"
    v-bind:display="deviceDisplay.type.coding[0].display"
    v-bind:code="deviceDisplay.type.coding[0].code"
    v-bind:version="deviceDisplay.version"
    v-bind:expirationDate="deviceDisplay.expirationDate"
    v-bind:status="deviceDisplay.status"
    v-bind:id="deviceDisplay.id"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Popupform from '../components/Popupform'
import DeviceDisplay from '../components/DeviceDisplay'

export default {
  components: { Popupform, DeviceDisplay },
  computed: {
    ...mapGetters([
      'devices'
    ])
  },
  async created () {
    await this.$store.dispatch('getDevicesIdList')
    await this.$store.dispatch('getDevices')
  }
}
</script>
