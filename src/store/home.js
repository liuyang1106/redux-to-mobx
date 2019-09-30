import { observable, action, runInAction } from 'mobx'

class Home {
  @observable
  name = 'mobx'

  // 获得了整个顶层数据的能力
  @action
  test = ({ payload }, { store }) => {
    const { name } = payload
    runInAction(() => {
      this.name = Math.random().toFixed(2) + name
    })
  }

  @action
  asyncTest = async ({ payload }, { store }) => {
    const promise = new Promise(( res, rej) => {
      setTimeout(()=> {
        const { name } = payload
        this.name = name
        res(payload)
      },500)
    })
    return promise
  }
}

export default new Home()