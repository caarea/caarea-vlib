import AbstractService from "../AbstractService"

export const INTERNAL_ADMIN = 1
export const DISTRIBUTOR_ADMIN = 2
export const INTERNAL_USER = 3
export const SELLER_DISTRIBUTOR = 4
export const BENEFICIARY = 5
export const GUEST = 6

class Group extends AbstractService {
  mappingGroups = {
    1: "internal_admin",
    2: "distributor_admin",
    3: "internal_user",
    4: "seller_distributor",
    5: "beneficiary",
    6: "guest",
  }

  get INTERNAL_ADMIN() {
    return 1
  }
  get DISTRIBUTOR_ADMIN() {
    return 2
  }
  get INTERNAL_USER() {
    return 3
  }
  get SELLER_DISTRIBUTOR() {
    return 4
  }
  get BENEFICIARY() {
    return 5
  }
  get GUEST() {
    return 6
  }
  getCodeById(id) {
    return this.mappingGroups[id]
  }
}

let GroupService = new Group()
export default GroupService
