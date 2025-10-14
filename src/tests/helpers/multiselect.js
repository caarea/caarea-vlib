/* eslint-disable no-undef */
export default {
  _getDataCyLabel(name) {
    return `[data-cy="${name}-select"]`
  },
  get(name) {
    return cy.get(this._getDataCyLabel(name))
  },

  click(name) {
    this.get(name).click({ force: true })
  },

  getSearchValueInput(name) {
    return cy.get(this._getDataCyLabel(name) + " input")
  },

  typeSearch(name, text) {
    this.click(name)
    this.getSearchValueInput(name).type(text)
  },

  select(name, itemNumber = 1) {
    cy.get(
      this._getDataCyLabel(name) +
        "  > .multiselect__content-wrapper > .multiselect__content > " +
        ":nth-child(" +
        itemNumber +
        ")" +
        " > .multiselect__option ",
    ).click({ force: true })
  },

  clickAndSelect(name, itemNumber = 1) {
    this.click(name)
    this.select(name, itemNumber)
  },

  assertValueSelected(name, value) {
    cy.get(this._getDataCyLabel(name) + " .multiselect__single").contains(value)
  },

  assertValueMultiSelected(name, value) {
    cy.get(this._getDataCyLabel(name)).contains(value)
  },
}
