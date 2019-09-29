import React from 'react'
import qs from 'qs'
import { inject, observer } from 'mobx-react'

class Login extends React.PureComponent{
  handleClick = () => {
    console.log(window.location)
    this.props.history.push({ url: '/', search: qs.stringify({name: 'leo'+ Math.random().toFixed(2), }) })
  }

  componentDidMount(){
    console.log('login')
  }

  render(){
    return <div onClick={this.handleClick}>
      点击
    </div>
  }
}

export default Login