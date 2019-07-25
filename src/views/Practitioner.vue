<template>
  <div class="practitioner">
    <h1>My informations</h1>
    <div>
      <v-avatar size="200">
        <img src="/avatar-5.png" margin-left="200%">
      </v-avatar>
      <v-card flat>
      <v-layout row wrap class="pa-3">
        <v-flex xs12 md2>
          <div class="display-1">Name</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="display-1">Birth Date</div>
        </v-flex>
          <v-flex xs6 sm4 md2>
          <div class="display-1">Gender</div>
        </v-flex>
        <v-flex xs6 sm4 md4>
          <div class="display-1">Address</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div class="display-1">Phone</div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap class="pa-3">
        <v-flex md2>
          <div>{{ practitioner.fullName }}</div>
        </v-flex>
        <v-flex md2>
          <div>{{ practitioner.birthDate }}</div>
        </v-flex>
        <v-flex md2>
          <div>{{ practitioner.gender }}</div>
        </v-flex>
        <v-flex md4>
          <div>{{ practitioner.address }}</div>
        </v-flex>
        <v-flex md2>
          <div>{{ practitioner.phone }}</div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
    </div>

    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'practitioner',
      'practitionerId'
    ])
  },
  async created () {
    await this.$store.dispatch('getPractitioner', this.practitionerId)
  }
}
</script>
