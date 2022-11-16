<template>
  <div class="form-validation">
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="form.name">
        <p>{{ $v.$getError('form.name') }}</p>
      </div>

      <div>
        <label for="name">Email:</label>
        <input type="text" v-model="form.email">
        <p>{{ $v.$getError('form.email') }}</p>
      </div>

<!--      <div>-->
<!--        <label for="name">User age:</label>-->
<!--        <input type="text" v-model="form.user.age">-->
<!--        <p>{{ $v.$getError('form.user.age') }}</p>-->
<!--      </div>-->

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'FormValidation',
  data() {
    return {
      form: {
        name: "",
        email: "",
        // user: {
        //   age: ''
        // }
      },

      num: 20
    }
  },
  validations: {
    form: {
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

      // user: {
      //   age: {
      //     validators: [
      //       {
      //         key: 'required'
      //       }
      //     ],
      //     validate() {}
      //   }
      // }
    }
  },
  methods: {
    submitForm() {
      this.$v.$submit()
      // console.log("vvv", this.$v.$isValid)
    },
  },
}
</script>
