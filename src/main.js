import Vue from 'vue'
import App from './App.vue'
import FormValidations from './plugins/form-validations/index'

Vue.use(FormValidations)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
