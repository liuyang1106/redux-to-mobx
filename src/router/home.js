import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'antd-mobile'


@inject('store')
@observer
class Login extends React.PureComponent{
  handleClick1 = () => {
    this.props.store.dispatch({ type: 'homeStore/test', payload: { name: 'leo' }})
  }

  handleClick2 = () => {
    this.props.store.dispatch('homeStore/test', { name: 'leo' })
  }

  handleClick3 = () => {
    const age = Math.random().toFixed(2)
    this.props.store.dispatch('homeStore/asyncTest', { name: age })
    .then(res => {
      // console.log(res,'async')
    })
  }

  handleClick4 = () => this.props.history.goBack()

  render(){
    const { store } = this.props
    const { loginStore, homeStore } = store
    return <div> 
      <Button onClick={this.handleClick1}>第一种action点击我</Button>
      <div>{homeStore.name}</div>
      <Button onClick={this.handleClick2}>第二种action点击我</Button>
      <div>{homeStore.name}</div>
      <Button onClick={this.handleClick3}>异步action点击我</Button>
      <div>{homeStore.name}</div>
      <div>来自其他store的数据{loginStore.name}</div>
      <Button onClick={this.handleClick4}>返回根部</Button>
    </div>
  }
}

export default Login