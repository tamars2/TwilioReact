import React, { Component } from 'react'
import PropertyInfo from './PropertyInfo'
import Chat from './Chat'
import ChatInput from './ChatInput'

class PropertyChatBox extends Component {
  constructor(props) {
    super(props)
    this.onNewMessage = this.onNewMessage.bind(this)

    // Oldest first
    this.state = {
      messages: [
        { id: 1, from: 'Jane', message: 'How big is the kitchen?' },
        { id: 2, from: 'Jim', message: 'Can I see the cabinet?' },
        { id: 3, from: 'Sarah', message: 'When was the kitchen remodeled?' },
        { id: 4, from: 'Jane', message: 'Can I see the laundry room?' },
        { id: 5, from: 'Jane', message: 'How big is the kitchen?' },
        { id: 6, from: 'Jim', message: 'Can I see the cabinet?' },
        { id: 7, from: 'Sarah', message: 'When was the kitchen remodeled?' },
        { id: 8, from: 'Jane', message: 'Can I see the laundry room?' },
      ]
    }
  }

  onNewMessage(message) {
    console.log('got a new message! time to hook it up', message)
    this.setState({
      messages: [
        ...this.state.messages,
        { id: Math.random(), from: 'Me', message }
      ]
    })
  }

  render() {
    return (
      <div className="property-chat-box">
        <PropertyInfo />
        <Chat messages={this.state.messages} />
        <ChatInput onSubmit={this.onNewMessage} />
      </div>
    )
  }
}

export default PropertyChatBox
