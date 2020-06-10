export default {
  external (id) {
    return !/^[./]/.test(id)
  }
}
