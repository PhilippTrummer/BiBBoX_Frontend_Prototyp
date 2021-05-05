<template>
  <v-app>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <router-link exact to="/">
        <img class="nav" alt="logo" src="./assets/logo.png" />
      </router-link>
      <router-link exact to="/">
        <b-navbar-brand>silicolab</b-navbar-brand>
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item><router-link class="navLinkStyle" to="/labdescription" exact >Lab Description</router-link></b-nav-item>
            <b-nav-item><router-link class="navLinkStyle" to="/applications" exact >Applications</router-link></b-nav-item>
            <b-nav-item><router-link class="navLinkStyle" to="/store" exact>Store</router-link></b-nav-item>
            <b-nav-item><router-link class="navLinkStyle" to="/activities" exact>Activities</router-link></b-nav-item>
            <b-nav-item><router-link class="navLinkStyle" to="/settings" exact>Settings</router-link></b-nav-item>
            <b-avatar :size="40"></b-avatar>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
    
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
export default {};
</script>

<style>
.navLinkStyle {
  display: inline-block;
  text-decoration: none !important;
  color: white !important;
}

.footerLinkStyle {
  display: inline-block;
  text-decoration: none !important;
  color: white !important;
}

.router-link-active.navLinkStyle {
  color: white;
  text-decoration: underline !important;
}

.navbar.navbar-dark.bg-dark {
  background-color: #176bae !important;
  font-family: "Verdana", "sans-serif";
  font-size: 18px;
}

.nav {
  height: 40px;
  width: 60px;
  padding-right: 15px;
  margin-right: 15px;
  border-right: solid 2px #ffffff;
}

.navbar-dark .navbar-nav .nav-link {
  color: #ffffff;
}

.navbar-dark .navbar-brand {
  font-family: "Verdana", "sans-serif";
  font-size: 28px;
}

.navbar-dark .navbar-nav .nav-link:hover {
  background-color: #005090;
  border-radius: 28px;
  color: #ffffff;
}
</style>
