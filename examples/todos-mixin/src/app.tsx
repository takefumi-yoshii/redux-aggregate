import { h, render } from 'preact'
import { AppProvider } from './views/root'
import { store } from './store'

// ______________________________________________________

render(<AppProvider store={store} />, document.getElementById('app'))
