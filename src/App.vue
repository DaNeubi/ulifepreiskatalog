<template>
  <v-app>
    <v-app-bar
      app
      color="#1A237E"
      dark
    >
      <div class="d-flex align-center">
        <a href="https://preisliste.jobermeier.cloud">
          <v-img
              alt="JO-Cloud Logo"
              class="shrink mr-2"
              contain
              src="@/assets/logo.png"
              transition="scale-transition"
              width="60"
          />
        </a>
        <span transition="scale-transition">JO-Cloud</span>
      </div>
      <v-spacer></v-spacer>
      <span class="d-none d-sm-flex">Vielen Dank an Seb für die Daten aus seinem Preiskatalog:
        <a href="https://docs.google.com/spreadsheets/d/13pvY4JKA2erg9-9wXV4gs5v0bR-ebuSgd0B8xOHlynA/edit#gid=0"
           style="color: red; text-decoration: none;" target="_blank">HIER</a></span>
    </v-app-bar>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
    <v-footer color="#1A237E">
      <v-row>
        <v-col>
          <span class="white--text">JO-Cloud © {{new Date().getFullYear()}}</span>
        </v-col>
        <v-col>
          <span class="white--text">Hosting with <v-icon color="white">mdi-heart-outline</v-icon> by
            <a class="footer-links sahnee-hosting" href="https://sahnee.dev" target="_blank">Sahnee.dev</a></span>
        </v-col>
        <v-col>
          <a href="https://github.com/DaNeubi/ulifepreiskatalog" target="_blank"><v-icon color="white">mdi-github</v-icon></a>
        </v-col>
        <v-col>
          <span class="white--text"><a class="footer-links" href="https://sahnee.dev/de/impressum/" target="_blank">Impressum</a></span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
});
</script>
<style scoped>
/***
Styling the footer links
 */
.footer-links{
  text-decoration: none;
  color: white;
}
.sahnee-hosting{
  -webkit-text-fill-color: transparent;
  background: -webkit-linear-gradient(left, pink, lightblue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
