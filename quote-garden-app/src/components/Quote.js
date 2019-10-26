import React, { Component } from "react";

class Quote extends Component {
  state = { liked: null, quoteTextStyle: "black" };

  handleLike = () => {
    this.setState({ liked: true, quoteTextStyle: "green" });
  };

  handleDislike = () => {
    this.setState({ liked: false, quoteTextStyle: "red" });
  };

  render() {
    console.log("props:", this.props);
    return (
      <div>
        <p style={{ color: this.state.quoteTextStyle }} className="quoteText">
          {this.props.quoteText}
        </p>
        <p style={{ color: this.state.quoteTextStyle }} className="quoteAuthor">
          By: {this.props.quoteAuthor}
        </p>
        <button onClick={this.handleLike}>LIKE</button>
        <button onClick={this.handleDislike}>DISLIKE</button>
      </div>
    );
  }
}

export default Quote;
