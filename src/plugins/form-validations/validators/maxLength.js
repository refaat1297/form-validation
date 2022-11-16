export default function maxLength({ field, value, params: { max } }) {
  const isValid = value.length <= max

  return {
    isValid,
    errorMsg: `The ${field} should be max ${max} characters`
  }
}
