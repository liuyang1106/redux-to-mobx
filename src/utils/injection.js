import React from 'react'

// 可以选择此高阶组件，接受想要的props

/**
 * 用于选择store内的所需的数据 
 * @param {object || function || string } mapStoreTpoProps
 * object { xxxstore }
 */
function Injection(mapStoreTpoProps) {
  return WrapComponent => {
    return class extends React.PureComponent{
      constructor(props){
        super(props)
        this.state = {
          store: {},
          dispatch: () => {}
        }
      }

      componentDidMount(){
        const { store = {} } = this.props
        this.setState({ store })
      }

      render(){
        const { store = {} } = this.state
        if(!mapStoreTpoProps) return <WrapComponent {...this.props}></WrapComponent>
        if(typeof mapStoreTpoProps === 'object' && !Object.keys(mapStoreTpoProps).length) return <WrapComponent {...this.props}></WrapComponent>
        if(typeof mapStoreTpoProps === 'function'){
          const mapStore = mapStoreTpoProps(store)
          return <WrapComponent {...this.props}  {...mapStore}></WrapComponent>
        }
        return <WrapComponent {...this.props}></WrapComponent>
      }
    }
  }
}

export default Injection