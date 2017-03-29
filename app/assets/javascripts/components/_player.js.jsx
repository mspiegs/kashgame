var Player = React.createClass({

  getInitialState() {
    return {
      view: "playersround",
      count: 0,
      rounds: []
    };
  },

  clickRound(round) {
    this.setState({ view: "selectedRound", round: round});
  },

  setBackToRounds() {
    this.setState({ view: "playersround"});
  },



  render(){
    if (this.state.view === 'playersround') {
      return (
        <PlayerContainer current_user={this.props.current_user} submitNewRound={this.submitNewRound} addNewRoundButton={this.addNewRoundButton} clickRound={this.clickRound} />
      )
    } else if (this.state.view === 'selectedRound') {
      return (
        <ViewRound round={this.state.round} clickBackToRounds={this.setBackToRounds} />
      )
    }
  }
});
