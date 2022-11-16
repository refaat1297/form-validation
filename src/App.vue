<template>
  <div id="app">
    <h4>Nested Props</h4>
    <FormValidation />
    <hr>
    <h4>Single Props</h4>
    <FormValidationSingleProps />
  </div>
</template>

<script>
import FormValidation from './components/FormValidation.vue'
import FormValidationSingleProps from './components/FormValidationSingleProps.vue'

export default {
  name: 'App',
  components: {
    FormValidation,
    FormValidationSingleProps
  }
}
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
</style>
