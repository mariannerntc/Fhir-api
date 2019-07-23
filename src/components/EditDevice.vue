<template>
  <v-dialog v-model="dialog">
    <v-btn flat slot="activator" class="info"><v-icon dark @click.prevent="editDevice">create</v-icon></v-btn>
    <v-card>
      <v-card-title>
        <h2>Edit device</h2>
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="deviceForm">
          <v-text-field label="Name of the device" v-model="display" :rules="inputRules"></v-text-field>
          <v-select
          :items="allDeviceTypes"
          item-value="value"
          item-text="text"
          label="Device type"
          v-model="code"
          ></v-select>
          <v-text-field label="Version of the device" v-model="version" :rules="inputRules"></v-text-field>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="expirationDate"
              persistent
              lazy
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="expirationDate"
                  label="Expiration date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="expirationDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.dialog.save(expirationDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
          <v-switch v-model="status" label="Device active"></v-switch>

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
      buttonLoading: false
    }
  },
  props: ['display', 'code', 'version', 'expirationDate', 'status', 'id'],
  methods: {
    async edit () {
      if (this.$refs.deviceForm.validate()) {
        this.buttonLoading = true
        await this.$store.dispatch('editDevice', this.display, this.code, this.version, this.expirationDate, this.status, this.id)
        this.buttonLoading = false
        this.dialog = false
      }
    }
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
