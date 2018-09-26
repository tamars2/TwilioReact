import React, { Component } from 'react'
import PropertyInfo from './PropertyInfo'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import Fingerprint from 'fingerprintjs2'
import axios from 'axios'
import queryString from 'query-string'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.setActiveChannel = this.setActiveChannel.bind(this)
    this.getOrCreateChannel = this.getOrCreateChannel.bind(this)
    this.joinPublicChannel = this.joinPublicChannel.bind(this)
    this.onNewMessage = this.onNewMessage.bind(this)
    this.activeChannel = null

    const queryParams = queryString.parse(window.location.search)

    // Oldest first
    this.state = {
      token: null,
      userEmail: 'text@example.com',
      userName: 'Jane',
      channelName: queryParams.propertyName || 'default',
      messages: []
    }
  }

  getOrCreateChannel() {
    if (!this.client) {
      return
    }

    // if subscribed, do nothing, move along
    // if it's public, then you have to join it
    // if neither, then create and join

    this.client.getSubscribedChannels().then((resp) => {
      const subscribedChannels = resp.items
      const foundSubscribedChannel = subscribedChannels.find(item => item.state.uniqueName === this.state.channelName)
      if (foundSubscribedChannel) {
        this.setActiveChannel(foundSubscribedChannel)
        return
      }

      this.client.getPublicChannelDescriptors().then((paginator => {
        let found = false
        paginator.items.forEach(channel => {
          const result = subscribedChannels.find(item => item.sid === channel.sid);
          if (channel.friendlyName == this.state.channelName) {
            this.joinPublicChannel(channel)
            found = true
          }
        })
        if (!found) {
          this.createChannel()
        }
      }))
    })
  }

  createChannel() {
    this.client.createChannel({
      attributes: {
        description: this.state.channelName
      },
      friendlyName: this.state.channelName,
      isPrivate: false,
      uniqueName: this.state.channelName
    }).then(channel => {
      return channel.join()
    }).then(channel => {
      this.setActiveChannel(channel)
    }).catch((err) => {
      console.log('err', err)
    })
  }

  joinPublicChannel(channel) {
    channel.getChannel().then(channel => {
      channel.join().then(channel => {
        this.setActiveChannel(channel)
      })
    })
  }

  setActiveChannel(channel) {
    this.activeChannel = channel
    this.activeChannel.on('messageAdded', message => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            id: message.state.index,
            from: message.state.attributes.from,
            message: message.state.body,
          }
        ]
      })
    })
    channel.getMessages(100).then((page) => {
      this.setState({
        messages: page.items.map(message => ({
          id: message.state.index,
          from: message.state.attributes.from,
          message: message.state.body,
        }))
      })
    })
  }

  componentDidMount() {
    this.fingerprint = this.fingerprint || new Fingerprint()
    this.fingerprint.get(endpointId => {
      axios.get('/getChatToken?identity=' + this.state.userEmail + '&endpointId=' + endpointId).then((response, err) => {
        const token = response.data
        this.setState({
          token,
        })

        this.client = new Twilio.Chat.Client(token)

        this.accessManager = new Twilio.AccessManager(token)
        this.accessManager.on('tokenUpdated', am => {
          this.client.updateToken(am.token)
          this.getOrCreateChannel()
        })
        this.accessManager.on('tokenExpired', () => {
          // request('/getToken?identity=' + identity + '&endpointId=' + endpointId, function(err, res) {
          //   if (err) {
          //     console.error('Failed to get a token ', res.text);
          //     throw new Error(res.text);
          //   }
          //   console.log('Got new token!', res.text);
          //   accessManager.updateToken(res.text);
          // });
        })
      })
    })

  }

  onNewMessage(message) {
    if (!this.activeChannel) {
      alert('Oops, chat is not working. Please refresh')
      return
    }
    this.activeChannel.sendMessage(message, { from: this.state.userName }).then((resp) => {
      // ignore the response. messageAdded event will fire
    })
  }

  render() {
    return (
      <div className="property-chat-box">
        <div className="property-chat-inner">
          <PropertyInfo />
          <ChatMessages messages={this.state.messages} />
          <ChatInput onSubmit={this.onNewMessage} />
        </div>
      </div>
    )
  }
}

export default Chat
