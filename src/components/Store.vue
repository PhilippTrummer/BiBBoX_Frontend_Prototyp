<template>
  <div style="display: flex; flex-flow: row wrap">
    <div v-for="app in this.apps.value" :key="app">
      <StoreApp :appName="app" class="storeApp" v-on:cardClicked="handleClick"/>
    </div>
    <div>
      <b-modal size="huge" class="Modal" id="appModal" centered :title="appInfo.short_name" hide-footer>
        <div>
          <p style="font-family: 'Helvetica', 'sans-serif'"><a style="color:#176bae; font-weight:bold">Name</a>
            <br>
            {{appInfo.name}}
          </p>
          <p><a style="color:#176bae; font-weight:bold">Version</a>
            <br>
            {{appInfo.version}}
          </p>
          <p><a style="color:#176bae; font-weight:bold">Catalogue URL</a>
            <br>
            {{appInfo.catalogue_url}}
          </p>
          <p><a style="color:#176bae; font-weight:bold">Application URL</a>
            <br>
            {{appInfo.application_url}}
          </p>
          <p><a style="color:#176bae; font-weight:bold">Tags</a>
            <br>
            {{appInfo.tags}}
          </p>
          <p><a style="color:#176bae; font-weight:bold">Description</a>
            <br>
            {{appInfo.description}}
          </p>
        </div>
        <b-button block @click="$bvModal.hide('appModal')">Install</b-button>
      </b-modal>
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

  methods: {
    handleClick(appInfo) {
      this.appInfo = appInfo;
      this.$bvModal.show("appModal");
    },
  },

  mounted() {
    const axios = require("axios");
    var self = this;
    axios.get("http://127.0.0.1:5000/api/v1/apps").then((response) => {
      Vue.set(self.apps, "value", response.data);
      console.log(response.data);
    });
  },

  data() {
    return {
      apps: {},
      appInfo: {},
    };
  },
};
</script>

<style>
.storeApp {
  color: #555f7d;
  padding: 15px 10px 10px 10px;
  text-align: center;
  width: 150px;
  float: left;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
  margin: 10px;
  font-size: 13px;
}

.storeApp:hover {
  color: white;
  background-color: #176bae !important;
  cursor: pointer;
  border-radius: 0.25rem;
}

.img {
  height: 90px;
  width: 90px;
  float: left;
  margin-bottom: 10px;
  margin: 0 0 0 20px;
}

.name {
  float: left;
  width: 100%;
  height: 70px;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: solid 1px #176bae;
}

.storeApp:hover .name {
  border-bottom: solid 1px white;
}

.modal .modal-huge {
  max-width: 1000px;
  width: 1000px !important;
}
</style>