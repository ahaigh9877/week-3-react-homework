import React, { Component } from "react";

class NewQuoteForm extends Component {
  state = { author: "", newComment: "" };

  render() {
    return (
      <form onSubmit={this.HandleSubmitQuote}>
        <label>Quote from: </label>
        <input
          className="inputFieldAuthor"
          name="author"
          value={this.state.author}
          onChange={this.props.handleChange}
        />
        <label>Your Quote: </label>
        <textarea
          className="inputFieldQuote"
          type="text"
          name="onequote"
          placeholder="what's yer quote?"
          onChange={this.props.handleNewQuote}
          value={this.state.onecomment}
        ></textarea>
        <br></br>
        <input
          className="quoteSubmitButton"
          type="submit"
          value="Submit your quote"
          onClick={this.props.handleSubmitQuote}
        />
      </form>
    );
  }
}

export default NewQuoteForm;
