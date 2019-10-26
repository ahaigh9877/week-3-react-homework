import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: null,
    likes: 0,
    dislikes: 0
  };

  addLike = () => {
    this.setState({ likes: this.state.likes + 1 });
  };

  addDisike = () => {
    this.setState({ dislikes: this.state.dislikes + 1 });
  };

  removeLike = () => {
    this.setState({ likes: this.state.likes - 1 });
  };

  removeDislike = () => {
    this.setState({ dislikes: this.state.dislikes - 1 });
  };

  componentDidMount() {
    fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      //   .then(datar => console.log("data: ", datar))
      .then(data => this.setState({ quotes: data.results }))
      .catch(console.error);
  }

  render() {
    return (
      <div>
        <h1>Some Quotes</h1>
        <h2>
          Liked: {this.state.likes} / Disliked: {this.state.dislikes}
        </h2>
        {!this.state.quotes && "Loadin'..."}
        {this.state.quotes &&
          this.state.quotes.map(quote => (
            <Quote
              quoteAuthor={quote.quoteAuthor}
              quoteText={quote.quoteText}
              key={quote._id}
              addLike={this.addLike}
              addDisike={this.addDisike}
              removeLike={this.removeLike}
              removeDislike={this.removeDislike}
            />
          ))}
      </div>
    );
  }
}

export default QuoteSearcher;
