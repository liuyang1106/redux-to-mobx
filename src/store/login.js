import { observable } from 'mobx'
import BaseClass from './baseClass'

class Login  extends BaseClass{
  @observable
  name = 'hello world'
}

export default Login