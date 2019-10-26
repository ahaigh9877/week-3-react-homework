import React, { Component } from "react";

class Quote extends Component {
  state = { liked: null, quoteStyle: null };

  // See if I can merge the functions below later...
  handleLike = () => {
    this.setState({
      liked: true,
      quoteStyle: { color: "green", fontWeight: "bold" }
    });
    // If it's neutral, add a like to the counter
    if (this.state.liked === null) {
      this.props.addLike();
    }
    // If it's disliked, both add a like AND remove a dislike from the counter.
    if (this.state.liked === false) {
      this.props.addLike();
      this.props.removeDislike();
    }
  };

  handleDislike = () => {
    this.setState({
      liked: false,
      quoteStyle: { color: "red", textDecoration: "line-through" }
    });

    if (this.state.liked === null) {
      this.props.addDisike();
    }

    if (this.state.liked === true) {
      this.props.addDisike();
      this.props.removeLike();
    }
  };

  handleReset = () => {
    if (this.state.liked === true) {
      this.props.removeLike();
    } else if (this.state.liked === false) {
      this.props.removeDislike();
    }

    this.setState({
      liked: null,
      quoteStyle: null
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {/* In this case there's only one set of braces, because the second set are in the state */}
        <p style={this.state.quoteStyle} className="quoteText">
          {this.props.quoteText}
        </p>
        <p style={this.state.quoteStyle} className="quoteAuthor">
          By: {this.props.quoteAuthor}
        </p>
        <button onClick={this.handleLike}>LIKE</button>
        <button onClick={this.handleDislike}>DISLIKE</button>
        <button onClick={this.handleReset}>RESET</button>
        <p>~</p>
      </div>
    );
  }
}

export default Quote;
