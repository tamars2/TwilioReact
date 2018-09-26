import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CookiesProvider, Cookies } from 'react-cookie';
import VideoComponent from './VideoComponent'
import Chat from './Chat'
import Register from './Register'
import queryString from 'query-string'

class Identity extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  constructor(props) {
    super(props)
    this.completeRegistration = this.completeRegistration.bind(this)
    const info = this.getUserInfo()
    this.state = {
      userName: info.userName,
    }
  }

  getUserInfo() {
    const queryParams = queryString.parse(window.location.search)
    return {
      userName: queryParams.userName || window.localStorage.getItem('userName'),
      userEmail: window.localStorage.getItem('userEmail'),
    }
  }

  isIdentified() {
    return !!this.state.userName
  }

  completeRegistration(userName, userEmail) {
    window.localStorage.setItem('userName', userName)
    window.localStorage.setItem('userEmail', userEmail)
    this.setState({
      userName,
      userEmail,
    })
  }

  render() {
    if (this.isIdentified()) {
      return (
        <div>
          <CookiesProvider>
            <VideoComponent userName={this.state.userName} />
          </CookiesProvider>
          <Chat userName={this.state.userName} />
        </div>
      )
    }
    return <Register onSubmit={this.completeRegistration} />
  }
}

export default Identity
