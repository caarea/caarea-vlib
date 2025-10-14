import AbstractService from "../AbstractService"
import dayjs from "dayjs"
import fr from "dayjs/locale/fr"
import en from "dayjs/locale/en"
import es from "dayjs/locale/es"
import ko from "dayjs/locale/ko"

class DateUtils extends AbstractService {
  constructor() {
    super()
    dayjs.locale(fr)
    this.localeLang = {
      en: en,
      fr: fr,
      es: es,
      ko: ko,
    }
  }

  /**
   *
   * @returns {dayjs.Dayjs}
   */
  now() {
    return dayjs()
  }

  /**
   * Return the first day of the month for the given date
   * @param {Date|string|number|import('dayjs').Dayjs} date
   * @returns {import('dayjs').Dayjs}
   */
  getFirstDayOfMonth(date) {
    const d = dayjs(date)
    return d.startOf("month")
  }

  /**
   * Return the last day of the month for the given date
   * @param {Date|string|number|import('dayjs').Dayjs} date
   * @returns {import('dayjs').Dayjs}
   */
  getLastDayOfMonth(date) {
    const d = dayjs(date)
    return d.endOf("month")
  }

  /**
   * Shift a date/time by relative amounts, inspired by Python's Arrow.shift.
   * Usage examples:
   *  - shift({ days: 1 }) // from now, plus 1 day
   *  - shift(date, { months: -2, days: 3 })
   * Supported keys: years, months, weeks, days, hours, minutes, seconds, milliseconds.
   * Positive values move forward in time; negative values move backward.
   *
   * @param {Date|string|number|import('dayjs').Dayjs} date - base date
   * @param {Object} [deltas] - deltas to apply
   * @returns {import('dayjs').Dayjs} a dayjs instance with the applied shift
   */
  shift(date, deltas) {
    let d = dayjs(date)
    if (!d.isValid()) {
      throw new Error(`Invalid date: ${date}`)
    }

    const {
      years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0,
    } = deltas || {}

    // dayjs add accepts negative values, so we simply add all components
    // weeks are converted to days
    const totalDays = Number(days) + Number(weeks) * 7

    const parts = [
      ["year", Number(years)],
      ["month", Number(months)],
      ["day", totalDays],
      ["hour", Number(hours)],
      ["minute", Number(minutes)],
      ["second", Number(seconds)],
      ["millisecond", Number(milliseconds)],
    ]

    for (const [unit, amount] of parts) {
      if (amount && !Number.isNaN(amount) && amount !== 0) {
        d = d.add(amount, unit)
      }
    }

    return d
  }

  /**
   * @param date
   * @param date2 optional
   * @returns {number}
   */
  diffDaysBetweenDates(date, date2 = this.now()) {
    return dayjs(date).diff(date2, "days")
  }

  /**
   * @param numberOfDays
   * @returns {string}
   */
  getFormattedDateDaysAgoFromNow(numberOfDays) {
    console.log("numberOfDays", numberOfDays)
    return this.format(this.now().subtract(numberOfDays, "days"), "YYYY-MM-DD")
  }

  /**
   * @param numberOfMonths
   * @returns {string}
   */
  getFormattedDateMonthsAgoFromNow(numberOfMonths) {
    console.log("numberOfMonths", numberOfMonths)
    return this.format(this.now().subtract(numberOfMonths, "months"), "YYYY-MM-DD")
  }

  /**
   * @param numberOfYears
   * @returns {string}
   */
  getFormattedDateYearsAgoFromNow(numberOfYears) {
    console.log("numberOfYears", numberOfYears)
    return this.format(this.now().subtract(numberOfYears, "years"), "YYYY-MM-DD")
  }

  /**
   * @param date
   * @param format
   * @param localLanguageParam
   * @returns {string}
   */
  format(date, format = "dd/mm/YYYY", localLanguageParam = "fr") {
    dayjs.locale(this.localeLang[localLanguageParam])
    return dayjs(date).format(format)
  }

  /**
   * Convert date to MySQL format
   * @param date
   * @returns {string}
   */
  to_mysql_date(date) {
    return this.format(date, "YYYY-MM-DD")
  }
}

let DateService = new DateUtils()

export default DateService
