import { observable, action, runInAction } from 'mobx'
import BaseClass from './baseClass'

class Login  extends BaseClass{
  @observable
  name = 'hello world'

  @action
  test = ({ payload }) => {
    const { name } = payload
    runInAction(() => {
      this.name = Math.random().toFixed(2) + name
    })
  }
}

export default new Login()