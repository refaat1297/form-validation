<template>
  <div class="form-validation">
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name">
        <p>{{ $v.$getError('name') }}</p>
      </div>

      <div>
        <label for="name">Email:</label>
        <input type="text" v-model="email">
        <p>{{ $v.$getError('email') }}</p>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  name: "FormValidationSingleProps",
  data() {
    return {
      name: "",
      email: "",
      num: 20
    }
  },
  validations: {
    name: {
      validators: [
        { key: 'required' },
        {
          key: 'between',
          params: {
            min: 4,
            max: 10
          }
        },
      ],
      validate() {

      },
    },
    email: {
      validators: [
        { key: 'required' },
        { key: 'email' },
      ],
      validate() {}
    },
  },
  methods: {
    submitForm() {
      this.$v.$submit()
      // console.log("vvv", this.$v.$isValid)
    },
  },
}
</script>

<style scoped>

</style>
