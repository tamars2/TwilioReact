import React, { Component } from 'react'
import PropertyInfo from './PropertyInfo'
import Chat from './Chat'

class PropertyChatBox extends Component {
  constructor(props) {
    super(props)

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

  render() {
    return (
      <div className="property-chat-box">
        <PropertyInfo />
        <Chat messages={this.state.messages} />
      </div>
    )
  }
}

export default PropertyChatBox
