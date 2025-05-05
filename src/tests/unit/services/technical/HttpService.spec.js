import { HttpService, HttpError } from "../../../../services"
import { describe, expect, it } from "vitest"

function assertHttpErrorExceptionThrown(exception, status) {
  expect(exception instanceof HttpError).toBe(true)
  expect(exception.status).toEqual(status)
}

describe("HttpService", () => {
  /**
   * get
   */
  describe("get", () => {
    it("should throw HttpError exception on failure", async () => {
      try {
        // get on post api => should failed
        await HttpService.get("http://137.74.92.46:8888/post")
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 405)
      }
    })
    it("should throw HttpError exception on status 404", async () => {
      try {
        await HttpService.get("http://137.74.92.46:8888/status/404")
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 404)
        expect(e.data).toBeEqualResultSet()
      }
    })
    it("should return response data on success", async () => {
      const actual = await HttpService.get(
        "http://137.74.92.46:8888/base64/SFRUUEJJTiBpcyBhd2Vzb21l",
      )
      expect(actual).toBeEqualResultSet()
    })
  })

  /**
   * post
   */
  describe("post", () => {
    it("should throw HttpError exception on failure", async () => {
      try {
        // post on get api => should failed
        await HttpService.post("http://137.74.92.46:8888/get", {
          d1: "valueA",
          d2: "valueB",
        })
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 405)
      }
    })
    it("should throw HttpError exception on status 404", async () => {
      try {
        await HttpService.post("http://137.74.92.46:8888/status/404")
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 404)
        expect(e.data).toBeEqualResultSet()
      }
    })
    it("should return response data on success", async () => {
      const actual = await HttpService.post("http://137.74.92.46:8888/post", {
        d1: "valueA",
        d2: "valueB",
      })
      expect(actual.data).toBeEqualResultSet()
    })
  })

  /**
   * put
   */
  describe("put", () => {
    it("should throw HttpError exception on failure", async () => {
      try {
        // put on get api => should failed
        await HttpService.put("http://137.74.92.46:8888/get", {
          d1: "valueA",
          d2: "valueB",
        })
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 405)
      }
    })
    it("should throw HttpError exception on status 404", async () => {
      try {
        await HttpService.put("http://137.74.92.46:8888/status/404")
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 404)
        expect(e.data).toBeEqualResultSet()
      }
    })
    it("should return response data on success", async () => {
      const actual = await HttpService.put("http://137.74.92.46:8888/put", {
        d1: "valueA",
        d2: "valueB",
      })
      expect(actual.data).toBeEqualResultSet()
    })
  })

  /**
   * delete
   */
  describe("delete", () => {
    it("should throw HttpError exception on failure", async () => {
      try {
        // delete on get api => should failed
        await HttpService.delete("http://137.74.92.46:8888/get", {
          d1: "valueA",
          d2: "valueB",
        })
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 405)
      }
    })
    it("should throw HttpError exception on status 404", async () => {
      try {
        await HttpService.delete("http://137.74.92.46:8888/status/404")
      } catch (e) {
        assertHttpErrorExceptionThrown(e, 404)
        expect(e.data).toBeEqualResultSet()
      }
    })
    it("should return response data on success", async () => {
      const actual = await HttpService.delete("http://137.74.92.46:8888/delete", {
        d1: "valueA",
        d2: "valueB",
      })
      expect(actual.data).toBeEqualResultSet()
    })
  })
})
