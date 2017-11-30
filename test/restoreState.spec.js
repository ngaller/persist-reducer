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

  it('restores from key path', () => {
    window.localStorage['storage-key'] = '{"somestate.someprop":"somevalue"}'
    const state = restoreState({storageKey: 'storage-key', keysToSave: ['somestate.someprop']}, {})
    state.should.eql({somestate: { someprop: 'somevalue' }})
  })

  it('restores from key path, when there are other props on the object', () => {
    window.localStorage['storage-key'] = '{"somestate.someprop":"somevalue"}'
    const state = restoreState({storageKey: 'storage-key', keysToSave: ['somestate.someprop']}, {
      somestate: {
        someprop: 'oldval',
        otherprop: 'should not be touched'
      }
    })
    state.should.eql({somestate: { someprop: 'somevalue', otherprop: 'should not be touched' }})
  })

  it('restores from key path, with key path comprising dots', () => {
    window.localStorage['storage-key'] = '{"somestate,dotted.prop":"somevalue"}'
    const state = restoreState({storageKey: 'storage-key', keysToSave: [['somestate', 'dotted.prop']]}, {})
    state.should.eql({somestate: { 'dotted.prop': 'somevalue' }})
  })

  it('only restores keys when there is source data', () => {
    window.localStorage['storage-key'] = '{}'
    const state = restoreState({storageKey: 'storage-key', keysToSave: ['somestate']}, {})
    state.should.eql({})
  })
})
