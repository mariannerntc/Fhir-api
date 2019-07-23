<template>
    <v-card flat>
        {{ id }}
      <v-layout row wrap class="pa-3 project ">
        <v-flex xs6 md2>
          <div>{{ display }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>{{ code }}</div>
        </v-flex>
          <v-flex xs6 sm4 md2>
          <div>{{ version }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>{{ expirationDate }}</div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>
            <v-chip small class="white--text my-2 caption success">{{ status }}</v-chip>
          </div>
        </v-flex>
        <v-flex xs6 sm4 md2>
          <div>
            <EditDevice :id="id" :display="display" :code="code" :version="version" :expirationDate="expirationDate" :status="status" />
            <v-btn color="error"><v-icon dark @click.prevent="deleteDevice">delete</v-icon></v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-card>
</template>

<script>
import EditDevice from '../components/EditDevice'

export default {
  components: { EditDevice },
  props: ['display', 'code', 'version', 'expirationDate', 'status', 'id'],
  methods: {
    async deleteDevice () {
      await this.$store.dispatch('deleteDevice', this.id)
    }
  }
}
</script>
