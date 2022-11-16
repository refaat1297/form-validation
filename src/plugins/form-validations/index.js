import * as validatorsMethods from "./validators/index"

const formValidations = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          rules: {
            isValid: true,
            isSubmitted: false,
            errors: {},
          },
        }
      },

      computed: {
        validations() {
          return this.$options.validations
        },

        isValid() {
          const isNotValid = Object.keys(this.validations).some((key) => this[key] === "")

          return !isNotValid && Object.keys(this.rules.errors).length === 0 && this.rules.isSubmitted
        },

        $v() {
          return {
            $submit: this.submit,
            $isSubmitted: this.rules.isSubmitted,
            $isValid: this.isValid,
            $errors: this.rules.errors,
            $addError: this.addError,
            $getError: this.getError,
          }
        },
      },

      watch: {
        lang() {
          if (this.rules.isSubmitted) {
            this.submit()
          }
        },
      },

      created() {
        if (this.validations) {
          Object.keys(this.validations).forEach((key) => {

            if (typeof this[key] === 'object') {

              Object.keys(this[key]).forEach(el => {
                this.$watch(key, () => {
                  this.clear(`${key}.${el}`)
                }, {
                  deep: true
                })
              })

            } else {

              this.$watch(key, () => {
                this.clear(key)
              }, {
                deep: true
              })
            }

          })
        }
      },

      methods: {
        // { props: [parent1, parent1, child] , validators}
        registerValidators(prop, validators, parent) {
          if (!validators) return

          let isErrorExist = false

          for (const validator of validators) {
            const { key, params = {} } = validator
            try {
              const { isValid, errorMsg } = validatorsMethods[key].call(this, {
                field: prop,
                value: parent ? this[parent][prop] : this[prop],
                params,
              })

              if (!isValid) {
                this.rules.errors = {
                  ...this.rules.errors,
                  [parent ? `${parent}.${prop}` : prop]: errorMsg,
                }

                isErrorExist = true
                break
              }
            } catch (e) {
              isErrorExist = true
              /* eslint-disable */
              throw Error(`[${key}] is not a valid validator`)
              /* eslint-enable */
            }
          }

          return isErrorExist
        },

        submit() {
          this.rules.isValid = true

          Object.keys(this.validations).forEach((prop) => {
            const rule = this.validations[prop]

            if (typeof this[prop] === 'object') {

              Object.keys(this[prop]).forEach(key => {
                const value = this[prop][key]
                const { validators, validate } = rule[key]


                const isValidatorPassed = !this.registerValidators(key, validators, prop)

                if (isValidatorPassed) {
                  const result = validate?.call(this, value)

                  if (!result) {
                    this.rules.isValid = false
                  }
                }

              })





            } else {
              const value = this[prop]
              const { validators } = rule

              const isValidatorPassed = !this.registerValidators(prop, validators)

              if (isValidatorPassed) {
                const result = rule.validate?.call(this, value)

                if (!result) {
                  this.rules.isValid = false
                }
              }
            }



            // if (typeof this.validations[prop] === 'object') {
            //   console.log('re')
            //
            //
            //   // console.log('rule', rule)
            //   Object.keys(this.validations[prop]).forEach((key) => {
            //     const rule = this.validations[prop][key]
            //     // console.log(rule)
            //     const { validators } = rule
            //
            //     const isValidatorPassed = !this.registerValidators(key, validators, prop)
            //     console.log('isValidatorPassed', isValidatorPassed)
            //     //
            //     // if (isValidatorPassed) {
            //     //   const result = validate?.call(this, value)
            //     //
            //     //   if (!result) {
            //     //     this.rules.isValid = false
            //     //   }
            //     // }
            //   })
            //
            //
            // }
            //
            // else {
            //   console.log('eslee')

            // }
          })

          this.rules.isSubmitted = true
        },

        clear(key) {
          console.log('key', key)
          delete this.rules.errors[key]
          this.rules.isSubmitted = false
          this.rules.isValid = false
        },

        getError(key) {
          return this.rules.errors[key]
        },

        addError({ prop, errMsg }) {
          this.rules.errors = {
            ...this.rules.errors,
            [prop]: errMsg,
          }
        },
      },

    })
  },
}

export default formValidations
