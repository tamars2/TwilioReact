import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
class ChatInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onSend = this.onSend.bind(this)
    this.submit = this.submit.bind(this)
  }

  submit() {
    const input = this.input.current
    if (input.value.length > 0) {
      this.props.onSubmit(input.value)
      input.value = ''
    }
  }

  onSend() {
    this.submit()
  }

  onKeyDown(e) {
    // Return key
    if (e.keyCode == 13){
      this.submit()
    }
  }

  render() {
    return (
      <div className="chat-input-box">
        <div className="chat-send" onClick={this.onSend}>Send</div>
        <input
          ref={this.input}
          className="chat-input"
          type="text"
          name="message"
          placeholder="Ask your questions here..."
          onKeyDown={this.onKeyDown}
        />
      </div>
    )
  }
}

export default ChatInput
