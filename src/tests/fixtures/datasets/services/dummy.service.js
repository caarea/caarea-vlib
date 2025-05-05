import AbstractService from "../../../../services/AbstractService"
class DummyService extends AbstractService {
  constructor() {
    super()
    this.value = "default"
  }
  setValue(value) {
    this.value = value
  }
  getValue() {
    return this.value
  }
}
export default new DummyService()
