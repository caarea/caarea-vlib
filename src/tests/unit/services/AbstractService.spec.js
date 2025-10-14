import AbstractService from "../../../services/AbstractService"
import DummyService1 from "../../fixtures/datasets/services/dummy.service"
import DummyService2 from "../../fixtures/datasets/services/dummy.service"
import { describe, expect, it } from "vitest"

describe("AbstractService", () => {
  it("should not be able to be instantiate directly", () => {
    expect(() => new AbstractService()).toThrowError(
      'Abstract class "AbstractService" cannot be instantiated directly',
    )
  })

  it("should be a singleton", () => {
    expect(DummyService1.getValue()).toEqual("default")
    DummyService1.setValue("dummy1")
    expect(DummyService1.getValue()).toEqual(DummyService2.getValue())
  })
})
