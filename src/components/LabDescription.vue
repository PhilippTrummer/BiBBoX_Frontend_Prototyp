<template>
  <a>Test</a>
</template>

<script>
export default {};

const LabDescription = { template: '<div>LabDescription</div>' }
const routes = [
  { path: '/LabDescription', component: LabDescription },
]
const router = new VueRouter({
  routes // short for `routes: routes`
})
const app = new Vue({
  router
}).$mount('#app')
</script>

