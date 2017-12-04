'use strict'

const escomplex = require('escomplex')
const path = require('path')
const read = require('read-file')

function sanitize (fileName, filePath, result) {
  return {
    cyclomatic: result.aggregate.cyclomatic,
    cyclomaticDensity: result.aggregate.cyclomaticDensity,
    file: {
      name: fileName,
      path: filePath
    },
    halstead: {
      bugs: result.aggregate.halstead.bugs,
      difficulty: result.aggregate.halstead.difficulty,
      effort: result.aggregate.halstead.effort,
      length: result.aggregate.halstead.length,
      time: result.aggregate.halstead.time,
      vocabulary: result.aggregate.halstead.vocabulary,
      volume: result.aggregate.halstead.volume
    },
    maintainability: result.maintainability,
    sloc: {
      logical: result.aggregate.sloc.logical,
      physical: result.aggregate.sloc.physical
    }
  }
}

module.exports.analyze = (source) => {
  const reports = []
  let report
  let result

  if (Array.isArray(source)) {
    source.forEach((filePath) => {
      // let fullPath = path.resolve(__dirname, filePath)
      let content = read.sync(filePath, 'utf8')
      result = escomplex.analyse(content)
      report = sanitize(path.basename(filePath), filePath, result)
      reports.push(report)
    })
  }

  return reports
}

module.exports.getExtension = () => {
  return 'js'
}
