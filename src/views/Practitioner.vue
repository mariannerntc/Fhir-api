<template>
  <div class="practitioner">
    <h1>My informations</h1>
    <v-container class="my-5">
      <v-avatar size="100">
        <img src="/avatar-5.png">
      </v-avatar>

      <v-card flat>
        <v-layout>
          <v-flex m4>
            <div>Name</div>
            <div>{{ practitioner.fullName }}</div>
          </v-flex>
          <v-flex m4>
            <div>Birth Date</div>
            <div>{{ practitioner.birthDate }}</div>
          </v-flex>
          <v-flex m4>
            <div>Phone</div>
            <div>{{ practitioner.birthDate }}</div>
          </v-flex>
          <v-flex m4>
            <div>Birth Date</div>
            <div>{{ practitioner.birthDate }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // data () {
  //   return {
  //     practitioner: {fullName : '', birthDate : ''}
  //   }
  // },
  // mounted () {
  //   let practitioner = this.$resource('Practitioner/1984415')
  //   practitioner.query()
  //     .then((response) => {
  //       this.practitioner.fullName = response.data.name[0].text
  //       this.practitioner.birthDate = response.data.birthDate
  //       console.log(response.data)
  //     }, (response) => {
  //       console.log('erreur', response)
  //     })
  // }
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
