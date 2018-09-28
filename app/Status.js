import React, { Component } from 'react'

class Status extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 3,
    }
  }

  componentDidMount() {
    setInterval(() => {
      const increment = Math.round(Math.random()*1)
      this.setState({
        count: this.state.count + increment
      })
    }, 1500)
  }

  render () {
    return (
      <div className="status">
        <div className="status-live">
          <div className="status-live-dot"></div> Live
        </div>
        <div className="status-viewers">
          <img
          className="status-eyeball"
          src="/images/eyeball.png"
          />
          {this.state.count}
        </div>
      </div>
    )
  }
}

export default Status
