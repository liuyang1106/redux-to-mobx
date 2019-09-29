import React from 'react'
import qs from 'qs'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class Login extends React.PureComponent{
  handleClick1 = () => {
    this.props.store.dispatch({ type: 'loginStore/test', payload: { name: 'leo' }})
  }

  handleClick2 = () => {
    this.props.store.dispatch('loginStore/test', { name: 'leo' })
  }

  componentDidMount(){
    console.log('this.props: ', this.props)
  }

  render(){
    const { store } = this.props
    const { loginStore: { name } } = store
    return <div> 
      <button onClick={this.handleClick1}>第一种action点击我</button>
      <div>{name}</div>
      <button onClick={this.handleClick2}>第二种action点击我</button>
      <div>{name}</div>
    </div>
  }
}

export default Login