var Round = React.createClass({
  getInitialState() {
    return { rounds: this.props.rounds }
  },

  clickRound(round){
    this.props.clickRound(round);
  },

  render() {
    var rounds = this.props.rounds.map((round, id) => {
      return (
        <li key={id}><a href='#' onClick={this.clickRound.bind(this, round.id)}>{round.name}</a></li>
        )
    });
    return (
      <div>
        <ul>
          {rounds}
        </ul>
      </div>
    )
  }
});
