<template>
  <div style="display: flex; flex-flow: row wrap">
    <div class="row">
      <div class="col-2">
        <div style="padding-top: 24px; padding-left: 15px;">
          <h1>
            <a style="font-size: 20px; color: #176bae">Searchbar</a>
          </h1>
          <div style="padding-bottom: 20px">
            <input type="text" placeholder="Search.." name="search" style="background-color: #e4e4e4"
              @change="checksearch($event)" value="search" v-model="searchbar" />
          </div>
          <div>
            <h1>
              <a style="font-size: 20px; color: #176bae">Groups</a>
            </h1>
            <ul id="grouplist">
              <li v-for="group in this.groups" :key="group" style="list-style-type: none">
                <input type="checkbox" @change="checkgroups($event)" v-model="groupsSelected" :value="group" />
                {{ group }}
              </li>
            </ul>
            <h1>
              <a style="font-size: 20px; color: #176bae">Tags</a>
            </h1>
            <ul id="taglist">
              <li v-for="tag in this.tags" :key="tag" style="list-style-type: none">
                <input type="checkbox" @change="checktags($event)" v-model="tagsSelected" :value="tag" />
                {{ tag }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <div class="col-10">
        <div class="appDivider" v-for="appGroup in this.apps.value" :key="appGroup.group_name"
          :value="appGroup.group_name" :id="appGroup.group_name">

          <div>
            <br>
            <h1>
              <a style="margin-bottom: 15px; font-size: 20px; color: #176bae">{{
                appGroup.group_name
              }}</a>
            </h1>
          </div>
          <div class="row">
            <div class="storeApp flex-container" style="justify-content: center; position: relative"
              v-for="appName in appGroup.group_members" :key="appName.app_display_name" :value="appName"
              :id="appName.app_name">
              <div @click.stop="dialog = true" v-on:click="openModal(appName)">
                <div v-if="appName.decoration == 'new'">
                  <img class="img decoration" src="../assets/new.png" />
                </div>
                <div v-else-if="appName.decoration == 'announced'">
                  <img class="img decoration" src="../assets/announced.png" />
                </div>
                <img class="img" v-bind:src="appName.icon_url" alt="AppLogo" />
                <span class="name">{{ appName.app_display_name }}</span>
                <p class="shortDescription">{{ appName.short_description }}</p>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div>
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].short_name
                  }}</a>
              </v-card-title>

              <v-card-text class="text-left">
                <p></p>

                <p>
                  <a class=dialogEntries>Docker Versions</a>
                </p>
                <select name="versions" id="v">
                  <option v-for="(appVersion, index) in allVersions" :key="index" v-on:click="allVersionIndex = index">
                    {{ appVersion.dVersion }}
                  </option>
                </select>
                <br />
                <p>
                  <a class=dialogEntries>Version</a>
                  <br />
                  <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].version
                  }}</a>
                </p>
                <p>
                  <a class=dialogEntries>Catalogue URL</a>
                  <br />
                  <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].catalogue_url
                  }}</a>
                </p>
                <p>
                  <a class=dialogEntries>Application URL</a>
                  <br />
                  <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].application_url
                  }}</a>
                </p>
                <p>
                  <a class=dialogEntries>Tags</a>
                  <br />
                  <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].tags
                  }}</a>
                </p>
                <p>
                  <a class=dialogEntries>Description</a>
                  <br />
                  <a v-if="allVersions[allVersionIndex]">{{
                    allVersions[allVersionIndex].description
                  }}</a>
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
        console.log(appName);
        this.allVersions = [];
        for (var i = 0; i < appName.versions.length; i++) {
          let current = appName.versions[i].docker_version;
          axios.get(appName.versions[i].appinfo).then((response) => {
            console.log(current);
            response.data["dVersion"] = current;
            this.allVersions.push(response.data);
            console.log(response.data);
          });
        }
      },

      checksearch: function (e) {
        this.$nextTick(() => {
          console.log(this.searchbar, e);
          let allApps = this.apps.value;

          if (this.searchbar == "") {
            this.checktags();
          } else {
            this.setappsonnone();

            for (let group = 0; group < allApps.length; group++) {
              for (
                let groupmember = 0;
                groupmember < allApps[group].group_members.length;
                groupmember++
              ) {
                if (
                  allApps[group].group_members[groupmember].app_display_name
                    .toLowerCase()
                    .includes(this.searchbar.toLowerCase()) ||
                  allApps[group].group_members[groupmember].app_name
                    .toLowerCase()
                    .includes(this.searchbar.toLowerCase()) ||
                  allApps[group].group_members[groupmember].short_description
                    .toLowerCase()
                    .includes(this.searchbar.toLowerCase())
                ) {
                  console.log(allApps[group].group_members[groupmember].app_name);
                  document.getElementById(
                    allApps[group].group_members[groupmember].app_name
                  ).style.display = "block";
                  document.getElementById(
                    allApps[group].group_name
                  ).style.display = "block";
                }
              }
            }
          }
        });
      },

      setappsonblock: function () {
        let allApps = this.apps.value;
        for (let group = 0; group < allApps.length; group++) {
          document.getElementById(allApps[group].group_name).style.display =
            "block";
          for (
            let groupmember = 0;
            groupmember < allApps[group].group_members.length;
            groupmember++
          ) {
            document.getElementById(
              allApps[group].group_members[groupmember].app_name
            ).style.display = "block";
          }
        }
      },

      setappsonnone: function () {
        let allApps = this.apps.value;
        for (let group = 0; group < allApps.length; group++) {
          document.getElementById(allApps[group].group_name).style.display =
            "none";
          for (
            let groupmember = 0;
            groupmember < allApps[group].group_members.length;
            groupmember++
          ) {
            document.getElementById(
              allApps[group].group_members[groupmember].app_name
            ).style.display = "none ";
          }
        }
      },

      checkgroups: function (e) {
        this.$nextTick(() => {
          console.log(this.groupsSelected, e);
          let allApps = this.apps.value;

          if (this.groupsSelected == "") {
            this.setappsonblock();
          } else {
            this.setappsonnone();
            for (let group = 0; group < allApps.length; group++) {
              for (let l = 0; l < this.groupsSelected.length; l++) {
                if (allApps[group].group_name == this.groupsSelected[l]) {
                  document.getElementById(
                    allApps[group].group_name
                  ).style.display = "block";
                  for (
                    let groupmember = 0;
                    groupmember < allApps[group].group_members.length;
                    groupmember++
                  ) {
                    console.log(
                      allApps[group].group_members[groupmember].app_name
                    );
                    document.getElementById(
                      allApps[group].group_members[groupmember].app_name
                    ).style.display = "block";
                  }
                }
              }

            }
          }
        });
      },

      checktags: function (e) {
        this.$nextTick(() => {
          console.log(this.tagsSelected, e);
          let allApps = this.apps.value;

          if (this.tagsSelected == "") {
            this.setappsonblock();
          } else {
            this.setappsonnone();

            for (let group = 0; group < allApps.length; group++) {
              for (
                let groupmember = 0;
                groupmember < allApps[group].group_members.length;
                groupmember++
              ) {
                for (
                  let tagsperapp = 0;
                  tagsperapp <
                  allApps[group].group_members[groupmember].tags.length;
                  tagsperapp++
                ) {
                  for (
                    let selectedtag = 0;
                    selectedtag < this.tagsSelected.length;
                    selectedtag++
                  ) {
                    if (
                      allApps[group].group_members[groupmember].tags[
                      tagsperapp
                      ] == this.tagsSelected[selectedtag]
                    ) {
                      console.log(
                        allApps[group].group_members[groupmember].app_name
                      );
                      document.getElementById(
                        allApps[group].group_members[groupmember].app_name
                      ).style.display = "block";
                      document.getElementById(
                        allApps[group].group_name
                      ).style.display = "block";
                    }
                  }
                }
              }
            }
          }
        });
      },
    },

    mounted() {
      const axios = require("axios");
      var self = this;
      axios.get("http://127.0.0.1:5010/api/v1/apps").then((response) => {
        Vue.set(self.apps, "value", response.data);
        console.log(response.data);

        for (var groups = 0; groups < response.data.length; groups++) {
          if (
            !checkIfGroupExist(
              response.data[groups].group_name,
              self.groups
            )
          ) {
            self.groups.push(
              response.data[groups].group_name
            );
          }
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
        self.groups.sort();
        console.log(self.tags, groups);
      });
    },

    data() {
      return {
        apps: {},
        appInfo: { value: "" },
        dialog: false,
        tags: [],
        tagsSelected: [],
        allVersions: [0],
        allVersionIndex: 0,
        groups: [],
        groupsSelected: [],
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

  function checkIfGroupExist(givengroup, groups) {
    for (var i = 0; i < groups.length; i++) {
      if (groups[i] == givengroup) {
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
    width: 170px;
    float: center;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
    margin: 10px;
    font-size: 13px;
    height: 280px;
  }

  .storeApp:hover {
    color: white;
    background-color: #176bae !important;
    cursor: pointer;
  }

  .img {
    height: 90px;
    width: 90px;
    float: center;
    margin-bottom: 10px;
    margin: 0 0 0 6px;
  }

  .name {
    float: left;
    width: 100%;
    height: 50px;
    font-size: 16px;
    margin-bottom: 10px;
    border-bottom: solid 1px #176bae;
  }

  .shortDescription {
    text-align: left;
    float: left;
    font-size: 12px;
    scroll-behavior: auto;
  }

  .storeApp:hover .name {
    border-bottom: solid 1px white;
  }

  .modal .modal-huge {
    max-width: 1000px;
    width: 1000px !important;
  }

  .decoration {
    position: absolute;
    height: 80px;
    width: 80px;
    top: 0;
    right: 0;
  }

  .col-2 {
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: rgb(204, 204, 204);
    padding: 10px;
  }

  .appDivider {
    margin-bottom: 20px;
    border-bottom: solid 1px #DDD;
    padding-bottom: 30px;
  }

  .dialogEntries {
    font-size: 15px;
    font-weight: bold;
    text-decoration: none !important;
    color: #176bae !important;
  }
</style>