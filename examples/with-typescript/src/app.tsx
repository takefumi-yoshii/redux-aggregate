import { h, render } from 'preact'
import { RootView } from './views/root'
import { Store } from './store'
// ______________________________________________________

render(<RootView store={Store} />, document.getElementById('app'))
