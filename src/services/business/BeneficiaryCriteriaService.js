import AbstractService from "../AbstractService"

class BeneficiaryCriteria extends AbstractService {
  constructor() {
    super()
    this._i18n_t = null
  }

  setI18n(i18n) {
    this._i18n_t = i18n.t
  }

  hasCoverageCriteria(beneficiaryCriteria) {
    return Object.keys(this.getCoverageCritNames(beneficiaryCriteria)).length > 0
  }

  getCoverageCritNames(beneficiaryCriteria) {
    return Object.keys(beneficiaryCriteria).reduce((names, criterionKey) => {
      if (criterionKey.includes("coverage_duration")) names.duration = criterionKey
      else if (criterionKey.includes("coverage_km")) names.km = criterionKey
      return names
    }, {})
  }

  hasCoverageDurationKmCouple(beneficiaryCriteria) {
    const names = this.getCoverageCritNames(beneficiaryCriteria)
    return ["duration", "km"].every((elem) => Object.keys(names).includes(elem))
  }

  isCriterionValueInCovDurationOptions(
    beneficiaryCriteria,
    coverageDurationOptions,
    criterion,
  ) {
    return Object.keys(coverageDurationOptions).includes(beneficiaryCriteria[criterion])
  }

  getValidCoverageDurationWithoutSelectValues(
    defaultValue,
    coverageDurationOptions,
    criterion = null,
  ) {
    const coverageDurationOptionsKeys = Object.keys(coverageDurationOptions)
    if (criterion) {
      if (coverageDurationOptionsKeys.includes(defaultValue[criterion])) {
        return defaultValue
      }
      defaultValue[criterion] = coverageDurationOptionsKeys[0]
      return defaultValue
    }

    // no criterion provided
    if (coverageDurationOptionsKeys.includes(defaultValue)) {
      return defaultValue
    }
    return coverageDurationOptionsKeys[0]
  }

  getValidCoverageDuration(beneficiaryCriteria, defaultValue, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria)
    const selectedDuration = beneficiaryCriteria[critNames.duration]
    const durationDefaultValue = defaultValue[critNames.duration]

    if (userSelectableValues.duration[selectedDuration]) {
      return beneficiaryCriteria
    }
    if (
      selectedDuration !== durationDefaultValue &&
      userSelectableValues.duration[durationDefaultValue]
    ) {
      return defaultValue
    }
    // Return the first selectable value
    return {
      [critNames.duration]: Object.keys(userSelectableValues.duration).filter(
        (duration) => userSelectableValues.duration[duration] === true,
      )[0],
    }
  }

  getCoverageDurationFirstSelectableValue(userSelectableValues) {
    const selectableDurations = Object.keys(userSelectableValues.duration_km).filter(
      (duration) =>
        this._isCoverageCoupleDurationSelectable(userSelectableValues, duration),
    )
    return selectableDurations[0]
  }

  getValidCoverageCouple(beneficiaryCriteria, defaultValues, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria)
    const selectedDuration = beneficiaryCriteria[critNames.duration]
    const selectedKm = beneficiaryCriteria[critNames.km]
    const durationDefaultValue = defaultValues[critNames.duration]
    const kmDefaultValue = defaultValues[critNames.km]

    if (userSelectableValues.duration_km[selectedDuration][selectedKm]) {
      return beneficiaryCriteria
    }
    if (
      (selectedDuration !== durationDefaultValue || selectedKm !== kmDefaultValue) &&
      userSelectableValues.duration_km[durationDefaultValue][kmDefaultValue]
    ) {
      return defaultValues
    }
    // Return the first selectable couple
    return {
      [critNames.duration]:
        this.getCoverageDurationFirstSelectableValue(userSelectableValues),
      [critNames.km]: this.getCoverageKmFirstSelectableValue(userSelectableValues),
    }
  }

  getValidCoverageCoupleOnDurationChange(beneficiaryCriteria, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria)
    const selectedDuration = beneficiaryCriteria[critNames.duration]
    const selectedKm = beneficiaryCriteria[critNames.km]

    const firstSelectableKm = this.getCoverageKmFirstSelectableValueForDuration(
      userSelectableValues,
      selectedDuration,
    )

    if (
      userSelectableValues.duration_km[selectedDuration][selectedKm] ||
      firstSelectableKm === null
    ) {
      // If there are no kms selectable for the selected duration
      // return the same km, to avoid application crash
      return {
        [critNames.duration]: selectedDuration,
        [critNames.km]: selectedKm,
      }
    }
    return {
      [critNames.duration]: selectedDuration,
      [critNames.km]: firstSelectableKm,
    }
  }

  getCoverageKmFirstSelectableValue(userSelectableValues) {
    for (const duration of Object.keys(userSelectableValues.duration_km)) {
      const firstSelectableKm = this.getCoverageKmFirstSelectableValueForDuration(
        userSelectableValues,
        duration,
      )
      if (firstSelectableKm !== null) {
        return firstSelectableKm
      }
    }
  }

  getCoverageDurationOptions(beneficiaryCriteria, userSelectableValues) {
    if (this.hasCoverageDurationKmCouple(beneficiaryCriteria)) {
      return Object.keys(userSelectableValues.duration_km).reduce(
        (options, duration) => {
          if (
            this._isCoverageCoupleDurationSelectable(userSelectableValues, duration)
          ) {
            options[duration] = this._i18n_t(`criteria.durations.${duration}`)
          }
          return options
        },
        {},
      )
    }
    return Object.keys(userSelectableValues.duration).reduce((options, duration) => {
      if (userSelectableValues.duration[duration]) {
        options[duration] = this._i18n_t(`criteria.durations.${duration}`)
      }
      return options
    }, {})
  }

  getCoverageKmOptionsForDuration(userSelectableValues, duration) {
    return Object.keys(userSelectableValues.duration_km[duration]).reduce(
      (options, km) => {
        if (userSelectableValues.duration_km[duration][km]) {
          options[km] = this._i18n_t(`criteria.kms.${km}`)
        }
        return options
      },
      {},
    )
  }

  getCoverageKmFirstSelectableValueForDuration(userSelectableValues, duration) {
    const selectableKms = Object.keys(
      userSelectableValues.duration_km[duration],
    ).filter((km) => userSelectableValues.duration_km[duration][km] === true)
    if (selectableKms.length > 0) {
      // Need to sort (because of '+xxx_km for egvn)!!
      selectableKms.sort((a, b) => {
        return a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      })
      return selectableKms[0]
    }
    return null
  }

  _isCoverageCoupleDurationSelectable(userSelectableValues, duration) {
    return Object.values(userSelectableValues.duration_km[duration]).some(
      (isSelectable) => isSelectable === true,
    )
  }

  areAllCoverageUserSelectableValuesFalse(userSelectableValues) {
    let userBooleanValuesArray = []
    if (Object.prototype.hasOwnProperty.call(userSelectableValues, "duration_km")) {
      userBooleanValuesArray = Object.values(userSelectableValues.duration_km)
        .map((obj) => Object.values(obj))
        .flat()
    } else {
      userBooleanValuesArray = Object.values(userSelectableValues.duration).flat()
    }
    return !userBooleanValuesArray.some((value) => value === true)
  }

  areAllCoverageUserSelectableValuesTrue(userSelectableValues) {
    let userBooleanValuesArray = []
    if (Object.prototype.hasOwnProperty.call(userSelectableValues, "duration_km")) {
      userBooleanValuesArray = Object.values(userSelectableValues.duration_km)
        .map((obj) => Object.values(obj))
        .flat()
    } else {
      userBooleanValuesArray = Object.values(userSelectableValues.duration).flat()
    }
    return !userBooleanValuesArray.some((value) => value === false)
  }
}

let BeneficiaryCriteriaService = new BeneficiaryCriteria()
export default BeneficiaryCriteriaService
