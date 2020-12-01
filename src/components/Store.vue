<template>
  <div style="display:flex;flex-flow:row wrap">
    <div v-for="app in this.apps.value" :key="app">
      <StoreApp :appName="app" class="storeApp" />
    </div>
  </div>
</template>

<script>
import StoreApp from "./StoreApp.vue";
import Vue from "vue";

export default {
  components: {
    StoreApp,
  },

  mounted() {
    const axios = require("axios");
    var self = this;
    axios.get("http://127.0.0.1:5000/api/v1/apps").then((response) => {
      Vue.set(self.apps, "value", response.data);
    });
  },

  data() {
    return {
      apps: {},
    };
  },
};
</script>

<style>
.storeApp {
  padding: 15px 10px 10px 10px;
  text-align: center;
  width: 150px;
  float: left;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  color: #555f7d;
  margin: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  position: relative;
}
</style>