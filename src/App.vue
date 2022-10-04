<script setup>
import { onMounted } from '@vue/runtime-core'
import test from './components/Test.vue'

onMounted(() => {
    console.log('from test')
})
</script>

<template>
  <test/>
  <p class="custom-class">testing nodemons test7</p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.custom-class {
  background: black;
  width: 100px;
  height: 100px;
}
</style>
