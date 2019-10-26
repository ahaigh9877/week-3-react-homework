import React, { Component } from "react";
import Quote from "./Quote";

class QuoteSearcher extends Component {
  state = {
    quotes: null
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
        {!this.state.quotes && "Loadin'..."}
        {this.state.quotes &&
          this.state.quotes.map(quote => (
            <Quote
              quoteAuthor={quote.quoteAuthor}
              quoteText={quote.quoteText}
              key={quote._id}
            />
          ))}
      </div>
    );
  }
}

export default QuoteSearcher;
