import React , { Component } from 'react'
import ReactDom from 'react-dom'
class Index extends Component {
	render (){
		return <div>Index Page</div>
	}
}
ReactDom.render(<Index/>,document.getElementById('root'))
