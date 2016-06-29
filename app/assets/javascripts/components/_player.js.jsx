var Player = React.createClass({

  getInitialState() {
    return {
      view: "playersround",
      addNewRound: false,
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

  addNewRoundButton: function() {
    if(this.state.addNewRound == true) {
      this.setState({addNewRound: false });
    } else if(this.state.addNewRound == false) {
      this.setState({addNewRound: true });
    }
  },

  componentWillMount: function() {
    $.getJSON('/api/v1/rounds.json', (response) => { this.setState({ rounds: response }) });
  },

  submitNewRound: function(round) {
    $.ajax({
      url: '/api/v1/rounds',
      dataType: 'json',
      type: 'POST',
      data: round,
      success: function(data) {

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render(){
    if (this.state.view === 'playersround') {
      return (
        <div>
          <Round clickRound={this.clickRound} rounds={this.state.rounds} />
          <p onClick={this.addNewRoundButton} >Add New Round</p>
          {this.state.addNewRound ? <AddNewRound onSubmit={this.submitNewRound}/> : null}
        </div>
      )
    } else if (this.state.view === 'selectedRound') {
      return (
        <ViewRound round={this.state.round} clickBackToRounds={this.setBackToRounds} />
      )
    }
  }
});
