export default function minLength({ field, value, params: { min } }) {
  const isValid = value.length >= min

  return {
    isValid,
    errorMsg: `The ${field} should be min ${min} characters`
  }
}
