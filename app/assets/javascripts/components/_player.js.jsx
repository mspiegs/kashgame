var Player = React.createClass({

  getInitialState() {
    return {
      view: "playersround"
    };
  },

  clickRound(round) {
    this.setState({ view: "selectedRound", round: round});
  },

  setBackToRounds() {
    console.log('from players');
    this.setState({ view: "playersround"});
  },

  render(){
    if (this.state.view === 'playersround') {
      return (
        <Round clickRound={this.clickRound}/>
      )
    } else if (this.state.view === 'selectedRound') {
      return (
        <ViewRound round={this.state.round} clickBackToRounds={this.setBackToRounds} />
      )
    }
  }
});
