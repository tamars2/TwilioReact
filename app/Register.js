import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'

class Register extends Component {
  static props = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.nameInput = React.createRef()
    this.emailInput = React.createRef()

    const queryParams = queryString.parse(window.location.search)

    this.state = {
      propertyName: queryParams.propertyName,
      when: queryParams.when,
    }
  }

  submit() {
    if (
      this.nameInput.current.value.length > 0 &&
      this.nameInput.current.value.length > 0
    ) {
        this.props.onSubmit(
          this.nameInput.current.value,
          this.emailInput.current.value,
        )
      }
  }

  hasStarted() {
    const marginInMinutes = 10
    const offsetInMinutes = (new Date(this.state.when) - Date.now())/1000/60
    return ((offsetInMinutes-marginInMinutes) < 0)
  }

  buttonText() {
    if (this.hasStarted()) {
      return 'Join!'
    }
    return 'RSVP'
  }

  render() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const when = new Date(this.state.when)
    const hours = (when.getHours() > 12) ? when.getHours()-12 : when.getHours()
    const amPM = (when.getHours() > 12) ? 'pm' : 'am'
    return (
      <div className="register">
        <div className="register-inner">
          <img src="/images/rent-live.png" className="register-logo" />
          <p className="register-property-name">{this.state.propertyName}</p>
          <p className="register-when">{days[when.getDay()]} {hours}:{when.getMinutes()}{amPM}</p>
          <input
            className="register-name"
            type="text"
            placeholder="Name"
            name="name"
            ref={this.nameInput}
            />
          <input
            className="register-email"
            type="text"
            placeholder="Email"
            name="email"
            ref={this.emailInput}
            />
          <div className="register-submit" onClick={this.submit}>{this.buttonText()}</div>
        </div>
      </div>
    )
  }
}

export default Register
