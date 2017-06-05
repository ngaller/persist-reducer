import restoreState from '../src/restoreState'

describe('restoreState', () => {
  beforeEach(() => {
    delete window.localStorage['storage-key']
  })

  it('extracts state from JSON', () => {
    window.localStorage['storage-key'] = '{"somestate":"somevalue"}'
    const state = restoreState({storageKey: 'storage-key'}, {})
    state.should.eql({somestate: 'somevalue'})
  })

  it('uses default state, if nothing in local storage', () => {
    const state = restoreState({storageKey: 'storage-key'}, {something: 'lala'})
    state.should.eql({something: 'lala'})
  })

  it('merges default state with restored state', () => {
    window.localStorage['storage-key'] = '{"somestate":"somevalue"}'
    const state = restoreState({storageKey: 'storage-key'}, {something: 'lala'})
    state.should.eql({something: 'lala', somestate: 'somevalue'})
  })

  it('uses default state, if invalid JSON', () => {
    window.localStorage['storage-key'] = 'booo'
    const state = restoreState({storageKey: 'storage-key'}, {something: 'lala'})
    state.should.eql({something: 'lala'})
  })

  it('only restores specified keys', () => {
    window.localStorage['storage-key'] = '{"somestate":"somevalue","foo":"bar"}'
    const state = restoreState({storageKey: 'storage-key', keysToSave: ['somestate']}, {})
    state.should.eql({somestate: 'somevalue'})
  })
})
