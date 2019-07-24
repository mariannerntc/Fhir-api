<template>
  <v-dialog v-model="dialog">
    <v-btn flat slot="activator" class="info"><v-icon dark>create</v-icon></v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit device</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="deviceForm">
          <v-text-field label="Name of the device" v-model="deviceEdit.display" :rules="inputRules"></v-text-field>
          <v-select
          :items="allDeviceTypes"
          item-value="value"
          item-text="text"
          label="Device type"
          v-model="deviceEdit.code"
          ></v-select>
          <v-text-field label="Version of the device" v-model="deviceEdit.version" :rules="inputRules"></v-text-field>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="deviceEdit.expirationDate"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="deviceEdit.expirationDate"
                  label="Expiration date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="deviceEdit.expirationDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(deviceEdit.expirationDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-switch v-model="deviceEdit.active" label="Device active"></v-switch>

          <v-spacer></v-spacer>

          <v-btn flat class="success mx-0 mt-3" @click.prevent="edit" :loading="buttonLoading">Save device</v-btn>
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
      inputRules: [v => !!v || 'The input is required'],
      buttonLoading: false,
      deviceEdit: {
        id: '',
        display: '',
        deviceType: '',
        version: 0,
        active: true,
        expirationDate: new Date().toISOString().substr(0, 10)
      }
    }
  },
  props: ['id'],
  methods: {
    async edit () {
      if (this.$refs.deviceForm.validate()) {
        this.buttonLoading = true
        await this.$store.dispatch('editDevice', this.deviceEdit)
        let devices = this.$store.getters.devices
        this.$set(devices, this.id, this.deviceEdit)
        this.buttonLoading = false
        this.dialog = false
      }
    }
  },
  async created () {
    this.deviceEdit = await this.$store.dispatch('deviceById', this.id)
    this.deviceEdit.display = this.deviceEdit.type.coding[0].display
    this.deviceEdit.code = this.deviceEdit.type.coding[0].code
    this.deviceEdit.active = this.deviceEdit.status === 'active'
  },
  computed: {
    ...mapGetters([
      'allDeviceTypes'
    ]),
    formattedDate () {
      return this.due
    }
  }
}
</script>
