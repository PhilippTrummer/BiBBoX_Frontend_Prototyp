<template>
  <div id="app">
    <v-app id="inspire">
      <v-footer absolute color="grey darken-1" padless>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
          >
            {{ link }}
          </v-btn>
          <v-col class="grey darken-1 py-4 text-center white--text" cols="12">
            ©BiBBoX {{ new Date().getFullYear() }}
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: ["Contact", "Partners", "Imprint"],
  }),
};
</script>

<style></style>
