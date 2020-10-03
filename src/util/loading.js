import React, { Component } from 'react'

export class Loading extends Component {
    render() {
        if (this.props.navbar) {
            return (
                <div>
                    Loading...
                </div>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}

export default Loading
