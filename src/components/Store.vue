<template>
  <div >
    <div>{{ this.appInfo.short_name }}</div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    appName: String,
  },

  data() {
    return {
      appInfo: {},
      appIcon: {},
    };
  },

  mounted() {
    var urlinfo =
      "https://raw.githubusercontent.com/bibbox/" +
      this.appName +
      "/master/appinfo.json";

    this.appIcon =
      "https://raw.githubusercontent.com/bibbox/" +
      this.appName +
      "/master/icon.png";

    const axios = require("axios");
    var self = this;
    
    axios
      .get(urlinfo)
      .then((response) => {
          Vue.set(self, "appInfo", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
</style>