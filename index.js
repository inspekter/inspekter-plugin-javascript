'use strict'

const escomplex = require('typhonjs-escomplex')
const path = require('path')
const read = require('read-file')

function sanitize (fileName, filePath, result) {
  return {
    cyclomatic: result.methodAggregate.cyclomatic,
    cyclomaticDensity: result.methodAggregate.cyclomaticDensity,
    file: {
      name: fileName,
      path: filePath
    },
    halstead: {
      bugs: result.methodAggregate.halstead.bugs,
      difficulty: result.methodAggregate.halstead.difficulty,
      effort: result.methodAggregate.halstead.effort,
      length: result.methodAggregate.halstead.length,
      time: result.methodAggregate.halstead.time,
      vocabulary: result.methodAggregate.halstead.vocabulary,
      volume: result.methodAggregate.halstead.volume
    },
    maintainability: result.maintainability,
    sloc: {
      logical: result.methodAggregate.sloc.logical,
      physical: result.methodAggregate.sloc.physical
    }
  }
}

module.exports.analyze = (source) => {
  const reports = []
  let report
  let result

  if (Array.isArray(source)) {
    source.forEach((filePath) => {
      let fullPath = path.resolve(__dirname, filePath)
      let content = read.sync(fullPath, 'utf8')
      result = escomplex.analyzeModule(content)
      report = sanitize(path.basename(filePath), filePath, result)
      reports.push(report)
    })
  }

  return reports
}

module.exports.extension = 'js'
