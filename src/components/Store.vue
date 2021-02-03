<template>
  <div class="container">
    <div v-for="app in this.apps.value" :key="app" style="padding-top: 10px">
      <div class="text-center">
        <h3>{{app.group_name}}</h3>
      </div>

      <div class="row">
        <div class="col-lg-3" style="padding-top: 10px" v-for="appname in app.group_members" :key="appname">
        
        <div class="card" style="height: 400px">
          <div class="card-header text-center"><img v-bind:src="appname.icon_url" style="width: 100px; height: 100px"></div>
          <div class="card-body"><b>{{appname.app_dispay_name}}</b><br>
                                    {{appname.short_description}}
          </div>
          <div class="card-footer">
            <div class="row">
              <!-- bootstrap-vue.org/docs/icons -->
              <div class="col-sm text-center">
                <button><b-icon icon="info-circle"></b-icon></button>
                <button><b-icon icon="gear-fill"></b-icon></button>
                <button><b-icon icon="power"></b-icon></button>
              </div>
            </div>
          </div>
        </div>

      </div>
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