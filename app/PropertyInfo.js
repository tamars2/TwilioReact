import React, { Component } from 'react'
import queryString from 'query-string'
class PropertyInfo extends Component {
  render() {
    const queryParams = queryString.parse(window.location.search)
    return (
      <div className="property-info">
        <div className="property-name">{queryParams.propertyName}</div>
        <div className="property-second-line">{queryParams.propertySecondLine}</div>
      </div>
    )
  }
}

export default PropertyInfo
