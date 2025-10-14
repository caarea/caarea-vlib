/* eslint-disable no-undef */
export default {
  sanitize(name) {
    return name.replace(/_/g, "-")
  },
  getInputId(name) {
    return `input-${this.sanitize(name)}`
  },
  getInput(name) {
    return cy.get(`input[id='${this.getInputId(name)}']`)
  },
  getDataCy(name) {
    cy.get(`div[data-cy='${this.sanitize(name)}']`)
  },
  openDropDown(name) {
    this.getInput(name).click()
  },
  getDate(name) {
    return this.getInput(name).invoke("val")
    //yarn b.then((date) => {})
  },
  assertSelectedDateIsNotEmpty(name) {
    this.getDate(name).then((date) => {
      expect(date).not.to.be.empty
    })
  },
  assertSelectedDateIsEmpty(name) {
    this.getInput(name).then((date) => {
      expect(date).to.be.empty
    })
  },
  getPreviousMonthButton(name) {
    return cy.get(
      `div[data-cy='${this.sanitize(name)}'] [class*="popout-day"] > [class*="__heading"] button[class*="heading__button__left"]`,
    )
  },
  clickPreviousMonth(name) {
    this.getPreviousMonthButton(name).click()
  },
  assertDateInPastCantBeSelected(name) {
    this.openDropDown(name)
    this.getPreviousMonthButton(name).should("be.disabled")
  },
  selectNewDate(name) {
    // Choose a day
    cy.get('button[class*="element__button__day"]:nth-child(18)').click()
    return this.getDate(name)
  },
  selectYear(year) {
    cy.get(`button[class*="element__button__year"]:nth-child(${year})`).click()
  },
  selectMonth(month) {
    cy.get(`button[class*="element__button__month"]:nth-child(${month})`).click()
  },
  selectDay(day) {
    cy.get(`button[class*="element__button__day"]:nth-child(${day})`).click()
  },
}
