import * as React from 'react'
import { render } from 'react-dom'
import { AppProvider } from './views/AppProvider'
import { store } from './store'

// ______________________________________________________

render(<AppProvider store={store} />, document.getElementById('app'))
