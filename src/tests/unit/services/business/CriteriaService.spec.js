import CriteriaService from "../../../../services/business/CriteriaService"
import { describe, expect, it } from "vitest"

describe.skip("Criteria Service", () => {
  describe("isSharedCriterion", () => {
    it("should return false when shared criteria list is empty", () => {
      const config = { shared_coefficient_criteria: [] }
      expect(CriteriaService.isSharedCriterion(config, "crit1")).toBe(false)
    })
    it("should return false when shared criteria list doesn't include criterion", () => {
      const config = { shared_coefficient_criteria: ["crit2", "crit3"] }
      expect(CriteriaService.isSharedCriterion(config, "crit1")).toBe(false)
    })
    it("should return true when shared criteria list includes criterion", () => {
      const config = { shared_coefficient_criteria: ["crit2", "crit1", "crit3"] }
      expect(CriteriaService.isSharedCriterion(config, "crit1")).toBe(true)
    })
  })

  describe("isMultipleSelectCriterion", () => {
    it("should return false when multiple select criteria list doesn't include criterion", () => {
      expect(CriteriaService.isMultipleSelectCriterion("crit1")).toBe(false)
    })
    it("should return true when multiple select criteria list includes criterion", () => {
      expect(CriteriaService.isMultipleSelectCriterion("coverage_type_body_care")).toBe(
        true,
      )
    })
  })

  describe("isWearCriterion", () => {
    it("should return false when wear criteria list doesn't include criterion", () => {
      expect(CriteriaService.isWearCriterion("crit1")).toBe(false)
    })
    it("should return true when wear criteria list includes criterion", () => {
      const expectedWearCriteria = ["wear_egvn", "wear_egvn_elec", "wear_vo"]
      expectedWearCriteria.forEach((criterion) =>
        expect(CriteriaService.isWearCriterion(criterion)).toBe(true),
      )
    })
  })

  describe("isWearCriterionGrid", () => {
    it("should return false when wear criteria list doesn't include criterion", () => {
      expect(CriteriaService.isWearCriterionGrid("crit1", "value1")).toBe(false)
    })
    it("should return false when grids list of wear criterion doesn't include criterion value", () => {
      expect(
        CriteriaService.isWearCriterionGrid("wear_vo", "usure_a_dire_d_expert"),
      ).toBe(false)
    })
    it("should return true when grids list of wear criterion includes criterion value", () => {
      const expectedGrids = ["grille_vetuste_1", "grille_vetuste_2"]
      expectedGrids.forEach((grid) =>
        expect(CriteriaService.isWearCriterionGrid("wear_vo", grid)).toBe(true),
      )
    })
  })

  describe("getWearGridInfo", () => {
    it("should return info of the provided wear criterion grid", () => {
      const grids = ["grille_vetuste_1", "grille_vetuste_2"]
      grids.forEach((grid) => {
        const info = CriteriaService.getWearGridInfo("wear_vo", grid)
        expect(info).toBeInstanceOf(Object)
        expect(info).toHaveProperty(["row_span"])
        expect(info).toHaveProperty(["grid_info"])
      })
    })
  })
})
