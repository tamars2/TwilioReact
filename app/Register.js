import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Register extends Component {
  static props = {
    onSubmit: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.nameInput = React.createRef()
    this.emailInput = React.createRef()
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

  render() {
    return (
      <div className="register">
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
        <div className="register-submit" onClick={this.submit}>Send</div>
      </div>
    )
  }
}

export default Register
