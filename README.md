# Overview

Very simple function to allow persistence of a reducer's state to local storage.
Note that this makes the reducer "impure" since it will have the side effect of
persisting its state.

This works only in the browser.

# Usage

    import {saveState, restoreState} from 'persist-reducer'

    const saveConfig = {
        storageKey: 'something unique',
        keysToSave: ['key1', key2']  // optional list of keys to include in saved state
    }

    const defaultState = restoreState(saveConfig, ...)

    const reducer = saveState(saveConfig, function(state, action) {
        // normal reducer stuff
    })

# Comparison with redux-persist

`redux-persist` is much more featureful.  It also registers at the store level,
as opposed to `persist-reducer` which is applied on a single reducer.  This makes
`persist-reducer` less intrusive in the project.
