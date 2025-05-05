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

  now() {
    return dayjs()
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
