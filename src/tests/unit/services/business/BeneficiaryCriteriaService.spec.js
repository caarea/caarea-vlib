import { BeneficiaryCriteriaService } from "../../../../services"
import { describe, expect, it } from "vitest"
import { caareaVlibI18n, caareaVlibI18nNumberFormats } from "../../../../i18n"
import { createI18n } from "vue-i18n"

const i18n = createI18n({
  locale: "fr",
  messages: caareaVlibI18n,
  numberFormats: caareaVlibI18nNumberFormats,
})
BeneficiaryCriteriaService.setI18n(i18n.global)

describe("Beneficiary Criteria Service", () => {
  describe("hasCoverageCriteria", () => {
    it("should return true", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      expect(BeneficiaryCriteriaService.hasCoverageCriteria(beneficiaryCriteria)).toBe(
        true,
      )
    })
    it("should return false", () => {
      const beneficiaryCriteria = {
        annual_rolling: "10_000_km",
        ew_duration: "24_mois",
      }
      expect(BeneficiaryCriteriaService.hasCoverageCriteria(beneficiaryCriteria)).toBe(
        false,
      )
    })
  })
  describe("getCoverageCritNames", () => {
    it("should return couple names", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      const expectedResult = {
        duration: "coverage_duration_egvn",
        km: "coverage_km_egvn",
      }
      expect(
        BeneficiaryCriteriaService.getCoverageCritNames(beneficiaryCriteria),
      ).toEqual(expectedResult)
    })
    it("should return duration name", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "24_mois",
      }
      const expectedResult = {
        duration: "coverage_duration_maintenance",
      }
      expect(
        BeneficiaryCriteriaService.getCoverageCritNames(beneficiaryCriteria),
      ).toEqual(expectedResult)
    })
  })
  describe("hasCoverageDurationKmCouple", () => {
    it("should return true", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      expect(
        BeneficiaryCriteriaService.hasCoverageDurationKmCouple(beneficiaryCriteria),
      ).toBe(true)
    })
    it("should return false", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "36_mois",
      }
      expect(
        BeneficiaryCriteriaService.hasCoverageDurationKmCouple(beneficiaryCriteria),
      ).toBe(false)
    })
  })
  describe("isCriterionValueInCovDurationOptions", () => {
    it("should return true", () => {
      const beneficiaryCriteria = {
        ew_duration: "108_mois",
        annual_rolling: "10_000_km",
      }
      const coverageDurationOptions = {
        "24_mois": "24 mois",
        "36_mois": "36 mois",
        "48_mois": "48 mois",
        "60_mois": "60 mois",
        "72_mois": "72 mois",
        "84_mois": "84 mois",
        "108_mois": "108 mois",
      }
      expect(
        BeneficiaryCriteriaService.isCriterionValueInCovDurationOptions(
          beneficiaryCriteria,
          coverageDurationOptions,
          "ew_duration",
        ),
      ).toBe(true)
    })
    it("should return false", () => {
      const beneficiaryCriteria = {
        ew_duration: "108_mois",
        annual_rolling: "+20000km",
      }
      const coverageDurationOptions = {
        "24_mois": "24 mois",
        "36_mois": "36 mois",
        "48_mois": "48 mois",
        "60_mois": "60 mois",
        "72_mois": "72 mois",
        "84_mois": "84 mois",
      }
      expect(
        BeneficiaryCriteriaService.isCriterionValueInCovDurationOptions(
          beneficiaryCriteria,
          coverageDurationOptions,
          "ew_duration",
        ),
      ).toBe(false)
    })
  })
  describe("getValidCoverageDurationWithoutSelectValues", () => {
    describe("without criterion", () => {
      it("should return default value", () => {
        const defaultValue = "24_mois"
        const coverageDurationOptions = {
          "24_mois": "24 mois",
          "36_mois": "36 mois",
          "48_mois": "48 mois",
          "60_mois": "60 mois",
          "72_mois": "72 mois",
          "84_mois": "84 mois",
        }
        expect(
          BeneficiaryCriteriaService.getValidCoverageDurationWithoutSelectValues(
            defaultValue,
            coverageDurationOptions,
          ),
        ).toEqual(defaultValue)
      })
      it("should return first coverage options value", () => {
        const defaultValue = "108_mois"
        const coverageDurationOptions = {
          "24_mois": "24 mois",
          "36_mois": "36 mois",
          "48_mois": "48 mois",
          "60_mois": "60 mois",
          "72_mois": "72 mois",
          "84_mois": "84 mois",
        }
        expect(
          BeneficiaryCriteriaService.getValidCoverageDurationWithoutSelectValues(
            defaultValue,
            coverageDurationOptions,
          ),
        ).toEqual("24_mois")
      })
    })

    describe("with criterion", () => {
      it("should return default value", () => {
        const defaultValue = {
          ew_duration: "24_mois",
          annual_rolling: "10_000_km",
        }
        const coverageDurationOptions = {
          "24_mois": "24 mois",
          "36_mois": "36 mois",
          "48_mois": "48 mois",
          "60_mois": "60 mois",
          "72_mois": "72 mois",
          "84_mois": "84 mois",
        }
        expect(
          BeneficiaryCriteriaService.getValidCoverageDurationWithoutSelectValues(
            defaultValue,
            coverageDurationOptions,
            "ew_duration",
          ),
        ).toEqual(defaultValue)
      })
      it("should return first coverage options value", () => {
        const defaultValue = {
          ew_duration: "108_mois",
          annual_rolling: "10_000_km",
        }
        const coverageDurationOptions = {
          "24_mois": "24 mois",
          "36_mois": "36 mois",
          "48_mois": "48 mois",
          "60_mois": "60 mois",
          "72_mois": "72 mois",
          "84_mois": "84 mois",
        }
        expect(
          BeneficiaryCriteriaService.getValidCoverageDurationWithoutSelectValues(
            defaultValue,
            coverageDurationOptions,
            "ew_duration",
          ),
        ).toEqual({ ew_duration: "24_mois", annual_rolling: "10_000_km" })
      })
    })
  })
  describe("getValidCoverageDuration", () => {
    it("should return same value", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "24_mois",
      }
      const defaultValue = {
        coverage_duration_maintenance: "36_mois",
      }
      const userSelectableValues = {
        duration: {
          "12_mois": false,
          "24_mois": true,
          "36_mois": true,
          "48_mois": false,
          "60_mois": true,
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageDuration(
          beneficiaryCriteria,
          defaultValue,
          userSelectableValues,
        ),
      ).toEqual(beneficiaryCriteria)
    })
    it("should return default value", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "24_mois",
      }
      const defaultValue = {
        coverage_duration_maintenance: "36_mois",
      }
      const userSelectableValues = {
        duration: {
          "12_mois": true,
          "24_mois": false,
          "36_mois": true,
          "48_mois": false,
          "60_mois": true,
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageDuration(
          beneficiaryCriteria,
          defaultValue,
          userSelectableValues,
        ),
      ).toEqual(defaultValue)
    })
    it("should return first selectable value", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "24_mois",
      }
      const defaultValue = {
        coverage_duration_maintenance: "36_mois",
      }
      const userSelectableValues = {
        duration: {
          "12_mois": false,
          "24_mois": false,
          "36_mois": false,
          "48_mois": true,
          "60_mois": true,
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageDuration(
          beneficiaryCriteria,
          defaultValue,
          userSelectableValues,
        ),
      ).toEqual({ coverage_duration_maintenance: "48_mois" })
    })
  })
  describe("getValidCoverageCoupleOnDurationChange", () => {
    it("should return same km", () => {
      const beneficiaryCriteria = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "30000km",
      }
      const userSelectableValues = {
        duration_km: {
          "36_mois": {
            "30000km": true,
            "50000km": true,
            "60000km": true,
            illimite: true,
          },
        },
      }
      const expectedResult = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "30000km",
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCoupleOnDurationChange(
          beneficiaryCriteria,
          userSelectableValues,
        ),
      ).toEqual(expectedResult)
    })
    it("should return first km selectable for selected duration", () => {
      const beneficiaryCriteria = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "20000km",
      }
      const userSelectableValues = {
        duration_km: {
          "36_mois": {
            "30000km": false,
            "50000km": false,
            "60000km": true,
            illimite: true,
          },
        },
      }
      const expectedResult = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "60000km",
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCoupleOnDurationChange(
          beneficiaryCriteria,
          userSelectableValues,
        ),
      ).toEqual(expectedResult)
    })
    it("should return same km if no km selectable for selected duration", () => {
      // Robustness check, this should not happen !
      const beneficiaryCriteria = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "20000km",
      }
      const userSelectableValues = {
        duration_km: {
          "36_mois": {
            "30000km": false,
            "50000km": false,
            "60000km": false,
            illimite: false,
          },
        },
      }
      const expectedResult = {
        coverage_duration_body_care: "36_mois",
        coverage_km_body_care: "20000km",
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCoupleOnDurationChange(
          beneficiaryCriteria,
          userSelectableValues,
        ),
      ).toEqual(expectedResult)
    })
  })

  describe("getValidCoverageCouple", () => {
    it("should return same values", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      const defaultValues = {
        coverage_duration_egvn: "12_mois",
        coverage_km_egvn: "illimite",
      }
      const userSelectableValues = {
        duration_km: {
          "12_mois": { "+0km": true, "+20000km": true, illimite: true },
          "24_mois": { "+0km": true, "+20000km": true, illimite: true },
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCouple(
          beneficiaryCriteria,
          defaultValues,
          userSelectableValues,
        ),
      ).toEqual(beneficiaryCriteria)
    })
    it("should return default values", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      const defaultValues = {
        coverage_duration_egvn: "12_mois",
        coverage_km_egvn: "illimite",
      }
      const userSelectableValues = {
        duration_km: {
          "12_mois": { "+0km": true, "+20000km": true, illimite: true },
          "24_mois": { "+0km": true, "+20000km": false, illimite: true },
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCouple(
          beneficiaryCriteria,
          defaultValues,
          userSelectableValues,
        ),
      ).toEqual(defaultValues)
    })
    it("should return first selectable values", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      const defaultValues = {
        coverage_duration_egvn: "12_mois",
        coverage_km_egvn: "illimite",
      }
      const userSelectableValues = {
        duration_km: {
          "12_mois": {
            "+0km": false,
            "+10000km": true,
            "+20000km": true,
            illimite: false,
          },
          "24_mois": {
            "+0km": true,
            "+10000km": true,
            "+20000km": false,
            illimite: true,
          },
        },
      }
      expect(
        BeneficiaryCriteriaService.getValidCoverageCouple(
          beneficiaryCriteria,
          defaultValues,
          userSelectableValues,
        ),
      ).toEqual({
        coverage_duration_egvn: "12_mois",
        coverage_km_egvn: "+10000km",
      })
    })
  })
  describe("getCoverageDurationOptions", () => {
    it("should return duration options - duration only case", () => {
      const beneficiaryCriteria = {
        coverage_duration_maintenance: "24_mois",
      }
      const userSelectableValues = {
        duration: {
          "12_mois": false,
          "24_mois": true,
          "36_mois": false,
          "48_mois": true,
          "60_mois": true,
        },
      }
      const expectedResult = {
        "24_mois": "criteria.durations.24_mois",
        "48_mois": "criteria.durations.48_mois",
        "60_mois": "criteria.durations.60_mois",
      }
      expect(
        BeneficiaryCriteriaService.getCoverageDurationOptions(
          beneficiaryCriteria,
          userSelectableValues,
        ),
      ).toEqual(expectedResult)
    })
    it("should return duration options - couple case", () => {
      const beneficiaryCriteria = {
        coverage_duration_egvn: "24_mois",
        coverage_km_egvn: "+20000km",
      }
      const userSelectableValues = {
        duration_km: {
          "12_mois": { "+0km": false, "+20000km": false, illimite: false },
          "24_mois": { "+0km": true, "+20000km": true, illimite: true },
          "36_mois": { "+0km": true, "+20000km": false, illimite: false },
        },
      }
      const expectedResult = {
        "24_mois": "criteria.durations.24_mois",
        "36_mois": "criteria.durations.36_mois",
      }
      expect(
        BeneficiaryCriteriaService.getCoverageDurationOptions(
          beneficiaryCriteria,
          userSelectableValues,
        ),
      ).toEqual(expectedResult)
    })
  })
  describe("getCoverageKmOptionsForDuration", () => {
    it("should return km options for given duration", () => {
      const userSelectableValues = {
        duration_km: {
          "12_mois": {
            "+0km": true,
            "+20000km": false,
            "+30000km": false,
            "+50000km": false,
            illimite: true,
          },
          "24_mois": {
            "+0km": true,
            "+20000km": true,
            "+30000km": false,
            "+50000km": true,
            illimite: false,
          },
          "36_mois": {
            "+0km": false,
            "+20000km": false,
            "+30000km": true,
            "+50000km": false,
            illimite: true,
          },
        },
      }
      const expectedResult = {
        "+0km": "criteria.kms.+0km",
        "+20000km": "criteria.kms.+20000km",
        "+50000km": "criteria.kms.+50000km",
      }
      expect(
        BeneficiaryCriteriaService.getCoverageKmOptionsForDuration(
          userSelectableValues,
          "24_mois",
        ),
      ).toEqual(expectedResult)
    })
  })
})
