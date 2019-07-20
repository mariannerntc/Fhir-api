<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">Add new device</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new device</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="deviceForm">
          <v-text-field label="Name of the device" v-model="device.display" :rules="inputRules"></v-text-field>
          <v-select
          :items="allDeviceTypes"
          item-value="value"
          item-text="text"
          label="Device type"
          v-model="device.deviceType"
          ></v-select>
          <v-text-field label="Version of the device" v-model="device.version" :rules="inputRules"></v-text-field>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="device.expirationDate"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="device.expirationDate"
                  label="Expiration date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="device.expirationDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(device.expirationDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-switch v-model="device.status" label="Device active"></v-switch>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click.prevent="submit" :loading="buttonLoading">Add device</v-btn>
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
      modal: false,
      dialog: false,
      inputRules: [v => !!v || "The input is required"],
      buttonLoading: false,
      device : {
        display : '',
        deviceType: '',
        version: 0,
        status: true,
        expirationDate: new Date().toISOString().substr(0, 10)
      }
    }
  },
  methods: {
    async submit () {
      if (this.$refs.deviceForm.validate()) {
        this.buttonLoading = true;
        await this.$store.dispatch('addDevice', this.device);
        this.buttonLoading = false;
        this.dialog = false;
        // this.$emit('projectAdded')
      }
    }
  },
  computed: {
    ...mapGetters([
      'allDeviceTypes'
    ]),
    formattedDate () {
      return this.due;
    }
  }
}
</script>
