import React from 'react'
import { inject, observer } from 'mobx-react'
import Injection from '../utils/injection'
import { Button } from 'antd-mobile'


@inject('store')
@Injection((store) => ({
  aliasStoreName: store.loginStore || {}
}))
@observer
class Login extends React.PureComponent{
  handleClick1 = () => {
    this.props.store.dispatch({ type: 'loginStore/test', payload: { name: 'leo' }})
  }

  handleClick2 = () => {
    this.props.store.dispatch('loginStore/test', { name: 'leo' })
  }

  handleClick3 = () => {
    const age = Math.random().toFixed(2)
    this.props.store.dispatch('loginStore/asyncTest', { age })
    .then(res => {
      // console.log(res,'async')
    })
  }

  handleClick4 = () => this.props.history.push('/home')

  render(){
    const { store, aliasStoreName } = this.props
    const { loginStore: { name, age } } = store
    return <div> 
      <Button onClick={this.handleClick1}>第一种action点击我</Button>
      <div>{name}</div>
      <div>{aliasStoreName.name}</div>
      <Button onClick={this.handleClick2}>第二种action点击我</Button>
      <div>{name}</div>
      <div>{aliasStoreName.name}</div>
      <Button onClick={this.handleClick3}>异步action点击我</Button>
      <div>{age}</div>
      <div>{aliasStoreName.age}</div>
      <Button onClick={this.handleClick4}>显示home组件</Button>
    </div>
  }
}

export default Login