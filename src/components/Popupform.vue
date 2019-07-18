<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new device</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new device</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="deviceForm">
          <v-select
          :items="allDeviceTypes"
          item-value="value"
          item-text="text"
          label="Device type"
          v-model="deviceType"
        ></v-select>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialog: false,
      deviceType: ''
      // deviceType : []
    }
  },
  computed: {
    ...mapGetters([
      'allDeviceTypes'
    ])
  }
}
</script>
