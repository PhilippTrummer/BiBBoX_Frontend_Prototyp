<template>
  <div>
    <Navbar />
    <Store />
    <Footer />
  </div>
</template>

<script>
import Store from "./components/Store.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Store,
    Navbar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-application--wrap {
  min-height: 10vh;
}
</style>
