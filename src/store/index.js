import Store from './store'
import storeConfig from './config'
import plugins from './plugin'

const store = new Store(storeConfig, { plugins })

export { store }