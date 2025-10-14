import AbstractService from "../AbstractService"

export class Criteria extends AbstractService {
  special_criteria = ["sales_mode_", "usage_"]

  getSpecialCriteriaValue(offerConfig, listCriteria, criteriaBeginningName) {
    for (let criteria in listCriteria) {
      const criteriaName = listCriteria[criteria]
      if (criteriaName.startsWith(criteriaBeginningName)) {
        return criteriaName
      }
    }
    return ""
  }

  getSpecialCriteriaName(listCriteria) {
    let specialCriteria = []
    for (let criteria in listCriteria) {
      const criteriaName = listCriteria[criteria]
      for (let criteriaBeginning in this.special_criteria) {
        if (criteriaName.startsWith(this.special_criteria[criteriaBeginning])) {
          specialCriteria.push(criteriaName)
        }
      }
    }
    return specialCriteria
  }
}

let CriteriaService = new Criteria()
export default CriteriaService
