<template>
  <div id="app">
    <router-view/>
    <!-- ApiTest コンポーネントを呼び出す -->
    <ApiTest/>
  </div>
</template>

<script>
import ApiTest from './components/ApiTest.vue';

export default {
  name: 'App',
  components: {
    ApiTest
  }
}
</script>