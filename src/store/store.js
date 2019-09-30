const isObject = obj => typeof obj === 'object' && obj !== null

const throwError = str => { throw new Error(str) }

/**
 * store 类，用于构建store
 * 1.外部接口 dispatch
 * 2.内部使用的接口 $$init，$$use
 */
class Store {
  constructor(options = {}, plugins = {} ){
    const { ...rest } = options
    this.$$options = rest

    // 获取所有的store的key，内部使用
    this.$$storeKey = Object.keys(rest)

    // 当前所有的状态的数据
    this._state = {}

    // 初始化所有的store
    this.$$init(plugins)
  }

  // 初始化store
  $$init(plugins){
    this.$$storeKey.forEach(storeKey => {
      this[storeKey] = this.$$options[storeKey]
      this._state[storeKey] = this.$$options[storeKey]
    })

    // 初始store后可以初始化化插件
    this.$$use(plugins)
  }

  // 需要使用的插件
  // 插件可以拥有的能力
  // 插件可以获得实例所有的state和dispatch方法
  $$use(plugins){
    if(isObject(plugins)){
      Object.keys(plugins).forEach(pluginsKey => {
        if(!plugins[pluginsKey].init && typeof plugins[pluginsKey].init !== 'function'){
          throwError('插件注册失败。注册插件需要传入一个init方法')
        }
        plugins[pluginsKey].init({ state: this._state, dispatch: this.dispatch })
      })
    }else{
      throwError('插件注册失败。注册插件需要传入一个对象')
    }
  }

  // 这个dispatch方法用来做精确分发action
  dispatch(){
    const length = arguments.length
    if(length < 1){
      throwError(`dispatch 必须要传入参数type`)
    }
    if(length === 1){
      if(isObject(arguments[0])){
        const { type, ...rest } = arguments[0]
        if(!type){
          throwError(`dispatch 必须要传入参数type`)
        }
        const [storeKey,functionName] = type.split('/')
        // 返回这个action，可以做异步链式调用
        return this[storeKey][functionName](rest, { store: this._state } )
      }
      throwError(`dispatch 必须传入一个对象 `)
    }else{
      const [type, payload = {}] = arguments
      if(!type){
        throwError(`dispatch 必须要传入参数type`)
      }
      if(!isObject(payload)) {
        throwError(`dispatch 必须传入一个对象 `)
      }
      const [storeKey,functionName] = type.split('/')
      // 返回这个action，可以做异步链式调用
      return this[storeKey][functionName]({ payload },{ store: this._state })
    }
  }
}

export default Store