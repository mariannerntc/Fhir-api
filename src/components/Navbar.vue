<template>
  <nav>
    <v-toolbar color="navy">
      <span background-size="contain">
        <v-img src="/k.jpg" width="30px" height="30px" ></v-img>
      </span>
      <v-toolbar-title class="white--text">Kligo solution</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat class="white--text" v-for="link in links" :key="link.text" router :to="link.route">
          <span>{{ link.text }}</span>
          <v-icon right>{{ link.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>

      <v-btn flat class="white--text">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { icon: 'account_box', text: 'Me', route: '/practitioner' },
        { icon: 'healing', text: 'Devices', route: '/' }
      ]
    }
  }
}
</script>
