import { dirname } from "path"
import fs from "fs"
import { execSync } from "child_process"
import TestHelper from "./TestHelper.js"
import { expect } from "vitest"

expect.extend({
  toBeEqualResultSet(actual) {
    const workingDir = TestHelper.getWorkingDir()
    const callingFilename = this.testPath
    const callingMethod = this.currentTestName
      .replace(new RegExp(" > ", "g"), "_")
      .replace(/ /g, "_")
      .toLowerCase()
    const splitted = callingFilename.replace(workingDir, "").split("/").slice(2)

    const resultSetFilename =
      `${TestHelper.getResultSetsPath()}` +
      `/${splitted.join("/").replace(/.spec.js/, "/")}` +
      `${callingMethod}.json`

    // get expected result sets or initialize it
    let expected = null
    fs.mkdirSync(dirname(resultSetFilename), { recursive: true })
    if (fs.existsSync(resultSetFilename)) {
      expected = JSON.parse(fs.readFileSync(resultSetFilename))
    } else {
      fs.writeFileSync(resultSetFilename, JSON.stringify(null))
    }
    try {
      expect(actual).toEqual(expected)
      return { message: () => "ok", pass: true }
    } catch (e) {
      const tmp_filename = `${TestHelper.getTmpDir()}/${splitted
        .join("_")
        .replace(".spec.js", "")}${callingMethod}_ACTUAL.json`
      fs.mkdirSync(dirname(tmp_filename), { recursive: true })
      fs.writeFileSync(tmp_filename, JSON.stringify(actual, null, 2))
      execSync(`pycharm diff ${resultSetFilename} ${tmp_filename}`)
      throw e
    }
  },
})
