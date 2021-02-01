<template>
  <div>
    <div v-for="app in this.apps.value" :key="app">
      {{app.group_name}}
      <div v-for="appname in apps.value" :key="appname">
        {{appname.app_name}}
      </div>
    </div>
  </div>
</template>

<script>

//http://127.0.0.1:5010/api/v1/apps/
//import axios from "axios";
import Vue from "vue";

export default {
  //el: '#app',

  components: {
  },

  data() {
    return {
      apps: {}
    }
  },
  mounted() {
    const axios = require("axios");
    var self = this;
    axios.get("http://127.0.0.1:5010/api/v1/apps").then((response) => {
      Vue.set(self.apps, "value", response.data);
      console.log(response.data);
    });
  }
};

</script>

<style>
</style>