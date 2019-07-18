<template>
  <div class="device">
    <h1>My devices</h1>
    <Popupform />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Popupform from '../components/Popupform'

export default {
  components: { Popupform },
  computed: {
    ...mapGetters([
      'deviceListId'
    ])
  },
  async created () {
    await this.$store.dispatch('getDevicesIdList', this.deviceListId)
  }
}
</script>
