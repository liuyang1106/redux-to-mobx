const isObject = obj => typeof obj === 'object' && obj !== null

/**
 * store 类，用于构建store
 * 1.外部接口 dispatch，destroy
 * 2.内部使用的接口 $$init，$$use
 */
class Store {
  constructor(options = {}, plugins = {} ){
    const { nameSpace: _nameSpace, ...rest } = options
    this.$$options = rest
    this._nameSpace = _nameSpace  === undefined ?  true : _nameSpace

    // 获取所有的store的key，内部使用
    this.$$storeKey = Object.keys(rest)
    Object.freeze(this.$$storeKey)

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
  // 插件可以获得当前实例和实例所有的state
  $$use(plugins){
    if(isObject(plugins)){
      Object.keys(plugins).forEach(pluginsKey => {
        if(!plugins[pluginsKey].init && typeof plugins[pluginsKey].init !== 'function'){
          throw new Error('插件注册失败。注册插件需要传入一个init方法')
        }
        plugins[pluginsKey].init(this._state,this)
      })
    }else{
      throw new Error('插件注册失败。注册插件需要传入一个对象')
    }
  }

  // 发起action
  dispatch(){
    const length = arguments.length
    if(length < 1){
      throw new Error(`dispatch 必须要传入参数type`)
    }
    if(length == 1){
      if(isObject(arguments[0])){
        const { type, ...rest } = arguments[0]
        if(!type){
          throw new Error(`dispatch 必须要传入参数type`)
        }
        if(this._nameSpace){
          const [storeKey,functionName] = type.split('/')
          if(!this.$$storeKey.includes(storeKey)){
            throw new Error(`${storeKey}.${functionName} is not a function!`)
          }else{
            this[storeKey][functionName](rest)
          }
        }else{
          // 没有开启nameSpace的时候如何调用，此时发起的action为全局的action
        }
      }
    }else{
      const [type, payload = {}] = arguments
      if(!type){
        throw new Error(`dispatch 必须要传入参数type`)
      }
      if(this._nameSpace){
        const [storeKey,functionName] = type.split('/')
        if(!this.$$storeKey.includes(storeKey)){
          throw new Error(`${storeKey}.${functionName} is not a function!`)
        }else{
          this[storeKey][functionName]({ payload })
        }
      }else{
        // 没有开启nameSpace的时候如何调用，此时发起的action为全局的action
      }
    }
  }

  // 清空store
  destroy(){}
}

export default Store