<template>
  <div style="display: flex; flex-flow: row wrap">
    <div class="row">
      <div class="col-2">
        <div style="padding-top: 80px; padding-left: 15px">
          <h3 style="padding-bottom: 15px">Tags</h3>
          <div v-for="tag in this.tags" :key="tag" class="">
            <div class="row">
              <!-- <ul class="">
                <li class="">
                  <p>{{ tag }}</p>
                </li>
              </ul> -->
              <div class="col-2"><input type="checkbox" /></div>
              <div class="col-10">
                <p>{{ tag }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div v-for="appGroup in this.apps.value" :key="appGroup">
          <br />
          <div>
            <h1>
              <a
                style="
                  color: #176bae;
                  text-align: left;
                  padding: 0 10px;
                  margin-bottom: 15px;
                  font-size: 20px;
                "
                >{{ appGroup.group_name }}</a
              >
            </h1>
          </div>
          <div class="row">
            <div
              class="storeApp"
              v-for="appName in appGroup.group_members"
              :key="appName.app_dispay_name"
            >
              <!-- <div class="container" v-on:click="openModal(appName)"> -->
              <div
                class=""
                @click.stop="dialog = true"
                v-on:click="openModal(appName)"
              >
                <img class="img" v-bind:src="appName.icon_url" alt="AppLogo" />
                <span class="name">{{ appName.app_dispay_name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                {{ appInfo.value.name }}
              </v-card-title>

              <v-card-text class="text-left">
                <p></p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Shortname</a
                  >
                  <br />
                  {{ appInfo.value.short_name }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Version</a
                  >
                  <br />
                  {{ appInfo.value.version }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >GitHub URL</a
                  >
                  <br />
                  {{ appInfo.value.application_documentation_url }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Catalogue URL</a
                  >
                  <br />
                  {{ appInfo.value.catalogue_url }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Application URL</a
                  >
                  <br />
                  {{ appInfo.value.application_url }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Tags</a
                  >
                  <br />
                  {{ appInfo.value.tags }}
                </p>
                <p>
                  <a style="color: #176bae; font-size: 15px; font-weight: bold"
                    >Description</a
                  >
                  <br />
                  {{ appInfo.value.description }}
                </p>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Install
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  components: {},

  methods: {
    openModal(appName) {
      this.appInfo.value = "";
      const axios = require("axios");
      var self = this;
      axios.get(appName.versions[0].appinfo).then((response) => {
        Vue.set(self.appInfo, "value", response.data);
        console.log(response.data);
      });
      console.log(this.appInfo);
    },
  },

  mounted() {
    const axios = require("axios");
    var self = this;
    axios.get("http://127.0.0.1:5010/api/v1/apps").then((response) => {
      Vue.set(self.apps, "value", response.data);
      console.log(response.data);

      for (var groups = 0; groups < response.data.length; groups++) {
        for (
          var member = 0;
          member < response.data[groups].group_members.length;
          member++
        ) {
          for (
            var tag = 0;
            tag < response.data[groups].group_members[member].tags.length;
            tag++
          ) {
            if (
              !checkIfTagExist(
                response.data[groups].group_members[member].tags[tag],
                self.tags
              )
            ) {
              self.tags.push(
                response.data[groups].group_members[member].tags[tag]
              );
            }
          }
        }
      }
      self.tags.sort();
      console.log(self.tags);
    });
  },

  data() {
    return {
      apps: {},
      appInfo: { value: "" },
      dialog: false,
      tags: [],
    };
  },
};
function checkIfTagExist(giventag, tags) {
  for (var i = 0; i < tags.length; i++) {
    if (tags[i] == giventag) {
      return true;
    }
  }
  return false;
}
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
</style>
