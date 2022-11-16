export default function between({ field, value, params: { min, max } }) {
  const isValid = value.length >= min && value.length <= max

  return {
    isValid,
    errorMsg: `The ${field} chars must be between ${min} and ${max}`
  }
}
