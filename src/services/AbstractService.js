class AbstractService {
  constructor() {
    if (this.constructor === AbstractService) {
      throw new TypeError(
        'Abstract class "AbstractService" cannot be instantiated directly',
      )
    }
    if (!this.instance) {
      this.instance = this
    }
    return this.instance
  }

  clear() {}

  isInitialized() {
    return true
  }

  checkIsInitialized() {
    if (this.isInitialized()) return true
    throw Error("Service should be initialized first")
  }
}

export default AbstractService
