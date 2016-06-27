var Round = React.createClass({
getInitialState() {
    return { rounds: [] }
  },

  componentDidMount() {
    $.getJSON('/api/v1/rounds.json', (response) => { this.setState({ rounds: response }) });
  },

  clickRound(round){
    this.props.clickRound(round);
  },

  render() {
    var rounds = this.state.rounds.map((round, id) => {
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
