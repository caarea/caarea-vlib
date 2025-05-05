import fs from "fs"
import { DateService } from "../services"
import dayjs from "dayjs"
import { fileURLToPath } from "node:url"
import path from "path"
import { vi } from "vitest"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export default class TestHelper {
  static workingDir

  static getWorkingDir() {
    if (!this.workingDir) {
      let listSplit = __dirname.split("/")
      this.workingDir = "/" + listSplit.slice(1, listSplit.length - 1).join("/")
    }
    return this.workingDir
  }

  static getFixturesPath() {
    return this.getWorkingDir() + "/tests/fixtures"
  }

  static _getFixturesRelativePath() {
    return "./fixtures"
  }

  static _getDatasetDirname() {
    return "datasets"
  }

  static getDataSetsPath(relativeFilename) {
    let path = this.getFixturesPath() + "/" + this._getDatasetDirname()
    if (relativeFilename) path += "/" + relativeFilename
    return path
  }

  static getDataSetsRelativePath(relativeFilename) {
    let path = this._getFixturesRelativePath() + "/" + this._getDatasetDirname()
    if (relativeFilename) path += "/" + relativeFilename
    return path
  }

  static async retrieveDataset(relativeFilename) {
    const absoluteFilename = this.getDataSetsPath(relativeFilename)
    let dataset = null

    if (!fs.existsSync(absoluteFilename)) {
      throw Error("Cannot found dataset: " + absoluteFilename)
    }
    dataset = await import(this.getDataSetsRelativePath(relativeFilename))
    return dataset.default
  }

  static getResultSetsPath() {
    return this.getFixturesPath() + "/resultsets"
  }

  static getTmpDir() {
    let tmpDir = this.getFixturesPath() + "/.donotcommit_tmp"
    fs.mkdirSync(tmpDir, { recursive: true })
    return tmpDir
  }

  static mockDateNow(today_is) {
    vi.spyOn(DateService, "now").mockImplementation(() => dayjs(today_is))
  }

  /**
   * mock HttpService.get
   * @param HttpService we need the HttpService imported into the test
   * @param fixtureName
   * @returns {Promise<void>}
   */
  static async mockHttpGet(HttpService, fixtureName) {
    const data = await TestHelper.retrieveApiFixture(fixtureName)
    HttpService.get.mockResolvedValue(data)
  }

  /**
   * mock HttpService.post
   * @param HttpService we need the HttpService imported into the test
   * @param fixtureName
   * @returns {Promise<void>}
   */
  static async mockHttpPost(HttpService, fixtureName) {
    const data = await TestHelper.retrieveApiFixture(fixtureName)
    HttpService.post.mockResolvedValue(data)
  }

  /**
   * mock HttpService.put
   * @param HttpService we need the HttpService imported into the test
   * @param fixtureName
   * @returns {Promise<void>}
   */
  static async mockHttpPut(HttpService, fixtureName) {
    const data = await TestHelper.retrieveApiFixture(fixtureName)
    HttpService.put.mockResolvedValue(data)
  }
}
