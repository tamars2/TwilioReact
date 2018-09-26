import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
class ChatMessages extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.messageList = React.createRef()
  }

  // Thank you Google
  // https://www.pubnub.com/tutorials/react/chat-message-history-and-infinite-scroll/#auto-scroll
  scrollToBottom = () => {
    const messageList = this.messageList.current
    const scrollHeight = messageList.scrollHeight
    const height = messageList.clientHeight
    const maxScrollTop = scrollHeight - height
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.messages.length !== this.props.messages.length;
    if (this.historyChanged) {
      const messageList = this.messageList.current
      const scrollPos = messageList.scrollTop
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight)
      this.scrollAtBottom = (scrollBottom <= 10) || (scrollPos === scrollBottom)
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    if (this.historyChanged && this.scrollAtBottom) {
      this.scrollToBottom()
    }
  }

  render() {
    return (
      <div className="chat-message-wrapper">
        <div className="chat-messages" ref={this.messageList}>
          {this.props.messages.map((m => (
            <div className="chat-message" key={m.id}>
              <strong>{m.from}</strong> {m.message}
            </div>
          )))}
        </div>
      </div>
    )
  }
}

export default ChatMessages
