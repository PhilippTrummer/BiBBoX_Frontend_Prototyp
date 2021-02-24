<template>
  <div style="display: flex; flex-flow: row wrap;">
    <div v-for="appGroup in this.apps.value" :key="appGroup">
      <br><h1><a style="color: #176bae; text-align: left; padding: 0 10px; margin-bottom: 15px; font-size: 20px;">{{ appGroup.group_name }}</a></h1>
      <div class="storeApp" v-for="appName in appGroup.group_members" :key="appName.app_dispay_name" >
        <div class="container" v-on:click="openModal(appName)">
          <img class="img" v-bind:src="appName.icon_url" alt="AppLogo" />
          <span class="name">{{ appName.app_dispay_name }}</span>
          <p>Short Description</p>
        </div>
      </div>
    </div>
    <div>
      <b-modal id="appModal" centered :title="appInfo.value.short_name" hide-footer >
        <div>
          <p><a style="color:#176bae; font-weight:bold">Name</a>
            <br>
            {{appInfo.name}}
          </p>
          <p>{{appInfo.name}}</p>
        </div>
        <b-button block @click="$bvModal.hide('appModal')">Install</b-button>
      </b-modal>    
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  components: {
  },

  methods: {
    openModal(appName){
      this.appInfo.value="";
      this.$bvModal.show('appModal');
      const axios = require("axios");
      var self = this;
      axios.get(appName.versions[0].appinfo).then((response) => {
      Vue.set(self.appInfo, "value", response.data);
      console.log(response.data);
    });
      console.log(this.appInfo);
    }
  },

  mounted() {
    const axios = require("axios");
    var self = this;
    axios.get("http://127.0.0.1:5010/api/v1/apps").then((response) => {
      Vue.set(self.apps, "value", response.data);
      console.log(response.data);
    });
  },

  data() {
    return {
      apps: {},
      appInfo: {value:""},
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
}

.img {
  height: 90px;
  width: 90px;
  float: left;
  margin-bottom: 10px;
  margin: 0 0 0 6px;
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