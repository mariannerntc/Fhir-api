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

    <DeviceDisplay v-for="device in devices" :key="device.id"
    v-bind:display="device.type.coding[0].display"
    v-bind:code="device.type.coding[0].code"
    v-bind:version="device.version"
    v-bind:expirationDate="device.expirationDate"
    v-bind:status="device.status"
    v-bind:id="device.id"/>

    <!-- <v-card flat v-for="device in devices" :key="device.id">
      <v-layout row wrap class="pa-3 project ">
        <v-flex xs6 md2>
          <div>{{ device.type.coding[0].display }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>{{ device.type.coding[0].code }}</div>
        </v-flex>
          <v-flex xs6 sm4 md2>
          <div>{{ device.version }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>{{ device.expirationDate }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>
            <v-chip small class="white--text my-2 caption success">{{ device.status }}</v-chip>
          </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div></div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card> -->
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
