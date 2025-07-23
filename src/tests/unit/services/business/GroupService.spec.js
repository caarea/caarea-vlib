import { GroupService } from "../../../../services"
import { describe, expect, it } from "vitest"

describe("Group Service", () => {
  it("should return internal_admin code on id 1", () => {
    expect(GroupService.getCodeById(GroupService.INTERNAL_ADMIN)).toBe("internal_admin")
  })
  it("should return distributor_admin code on id 2", () => {
    expect(GroupService.getCodeById(GroupService.DISTRIBUTOR_ADMIN)).toBe(
      "distributor_admin",
    )
  })
  it("should return internal_user code on id 3", () => {
    expect(GroupService.getCodeById(GroupService.INTERNAL_USER)).toBe("internal_user")
  })
  it("should return seller_distributor code on id 4", () => {
    expect(GroupService.getCodeById(GroupService.SELLER_DISTRIBUTOR)).toBe(
      "seller_distributor",
    )
  })
  it("should return beneficiary code on id 5", () => {
    expect(GroupService.getCodeById(GroupService.BENEFICIARY)).toBe("beneficiary")
  })
  it("should return guest code on id 6", () => {
    expect(GroupService.getCodeById(GroupService.GUEST)).toBe("guest")
  })
})
