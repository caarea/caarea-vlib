import { UrlService } from "../../../../services"
import { describe, expect, beforeAll, test } from "vitest"
const urls = {
  url1: "/uri/one",
  url2: "/uri/two",
  urlWithParams: "uri/{params1}/{params2}/",
}

const queryParams = {
  value: "value1",
  text: "it's a text! need to be encoded",
}

describe("UrlService", () => {
  beforeAll(() => {
    UrlService.initialize(urls)
  })

  /**
   * initialize
   */
  describe("initialize", () => {
    test("should succeed", () => {
      expect(UrlService._urls).toBeEqualResultSet()
    })
  })

  /**
   * getQueryString
   */
  describe("getQueryString", () => {
    test("should succeed", () => {
      let qs = UrlService.getQueryString(queryParams)
      expect(qs).toBeEqualResultSet()
    })
  })

  /**
   * render
   */
  describe("render", () => {
    test("should throw Error if service is not initialized", () => {
      UrlService.clear()
      expect(() => UrlService.render("url_name")).toThrow(
        Error("Service should be initialized first"),
      )
      UrlService.initialize(urls)
    })

    test("should throw Error if url name is unknown", () => {
      expect(() => UrlService.render("unknown")).toThrow(
        Error("url name 'unknown' not found in urls"),
      )
    })

    test("should render simple url", () => {
      expect(UrlService.render("url1")).toEqual("/uri/one")
    })

    test("should render url with params", () => {
      const params = {
        params1: "value1",
        params2: "value2",
      }
      expect(UrlService.render("urlWithParams", params)).toEqual("uri/value1/value2/")
    })

    test("should render url with query string", () => {
      expect(UrlService.render("url2", null, queryParams)).toEqual(
        "/uri/two?value=value1&text=it's%20a%20text!%20need%20to%20be%20encoded",
      )
    })
  })
})
