const React = require('react')
const ReactDOM = require('react-dom')
require('babel-register')

const component = require('./component')

window.onload = () => {
  ReactDOM.render(
    React.createElement(component),
    document.getElementById('render')
  )
}