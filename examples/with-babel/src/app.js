import { render } from 'preact'
import { store } from './store'
import { AppProvider } from './views/root'

// ______________________________________________________

render(<AppProvider store={store} />, document.getElementById('app'))
