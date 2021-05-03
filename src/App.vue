<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn flat>
        <router-link class="navLinkStyle" exact to="/">Home</router-link>
      </v-btn>

      <v-btn flat>
        <router-link to="/store" exact>Store</router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer color="grey darken-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2">
          <router-link to="/contact" class="footerLinkStyle"
            >Contact</router-link
          >
        </v-btn>
        <v-btn color="white" text rounded class="my-2">
          <router-link to="/partners" class="footerLinkStyle"
            >Partners</router-link
          >
        </v-btn>
        <v-btn color="white" text rounded class="my-2">
          <router-link to="/imprint" class="footerLinkStyle"
            >Imprint</router-link
          >
        </v-btn>
        <v-col class="grey darken-1 py-4 text-center white--text" cols="12">
          ©BiBBoX {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>
.navLinkStyle {
  display: inline-block;
  text-decoration: none;
  color: white !important;
}

.footerLinkStyle {
  display: inline-block;
  text-decoration: none;
  color: white !important;
}

.router-link-active.navLinkStyle {
  background: rgb(255, 6, 6);
  color: white;
}
</style>
