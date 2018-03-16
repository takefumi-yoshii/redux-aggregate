import { render } from 'preact'
import { RootView } from './views/root'
import { store } from './store'

// ______________________________________________________

render(<RootView store={store} />, document.getElementById('app'))
