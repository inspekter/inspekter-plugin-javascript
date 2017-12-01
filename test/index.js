/* global describe it */

'use strict'

const expect = require('chai').expect
const ipj = require('../index.js')

const properties = [
  {
    name: 'cyclomatic',
    type: 'number'
  },
  {
    name: 'cyclomaticDensity',
    type: 'number'
  },
  {
    name: 'file.name',
    type: 'string'
  },
  {
    name: 'file.path',
    type: 'string'
  },
  {
    name: 'halstead.bugs',
    type: 'number'
  },
  {
    name: 'halstead.difficulty',
    type: 'number'
  },
  {
    name: 'halstead.effort',
    type: 'number'
  },
  {
    name: 'halstead.length',
    type: 'number'
  },
  {
    name: 'halstead.time',
    type: 'number'
  },
  {
    name: 'halstead.vocabulary',
    type: 'number'
  },
  {
    name: 'halstead.volume',
    type: 'number'
  },
  {
    name: 'maintainability',
    type: 'number'
  },
  {
    name: 'sloc.logical',
    type: 'number'
  },
  {
    name: 'sloc.physical',
    type: 'number'
  }
]

describe('inspekter-plugin-javascript', () => {
  describe('analyze', () => {
    it('should always return an array', () => {
      const source = ['test/fixtures/file1.js']
      const actual = ipj.analyze(source)

      expect(actual).to.be.an('array')
      expect(actual).to.have.lengthOf(1)
    })

    it('should return one report object for each file', () => {
      const source = ['test/fixtures/file1.js', 'test/fixtures/file2.js']
      const actual = ipj.analyze(source)

      expect(actual).to.be.an('array')
      expect(actual).to.have.lengthOf(2)
    })

    it('should return an object with all standard properties', () => {
      const source = ['test/fixtures/file1.js']
      const actual = ipj.analyze(source)[0]

      properties.forEach((property) => {
        expect(actual).to.have.nested.property(property.name).that.is.a(property.type)
      })
    })
  })

  describe('getExtension', () => {
    it('should return js', () => {
      const actual = ipj.getExtension()

      expect(actual).to.equal('js')
    })
  })
})
