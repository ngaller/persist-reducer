import {should, expect} from 'chai'

global.window = {
  localStorage: {}
}
should()
global.should = should
global.expect = expect
