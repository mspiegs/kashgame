var PlayerContainer = React.createClass({

  getInitialState: function() {
    return {
      rounds: [],
      addNewRound: false
    }
  },

  componentDidMount: function() {
    $.getJSON('/api/v1/rounds.json', (response) => { this.setState({ rounds: response }) });
  },

  getRounds: function() {
    $.getJSON('/api/v1/rounds.json', (response) => { this.setState({ rounds: response }) });
  },

  addNewRoundButton: function() {
    if(this.state.addNewRound == true) {
      this.setState({addNewRound: false });
    } else if(this.state.addNewRound == false) {
      this.setState({addNewRound: true });
    }
  },

  submitNewRound: function(round) {
    $.ajax({
      url: '/api/v1/rounds',
      dataType: 'json',
      type: 'POST',
      data: round,
      success: function(data) {
        this.getRounds();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  clickRound: function(round) {
    this.props.clickRound(round);
  },

  render() {
    return (
      <div>
        <Round clickRound={this.clickRound} rounds={this.state.rounds} />
        <p onClick={this.addNewRoundButton} >Add New Round</p>
        {this.state.addNewRound ? <AddNewRound onSubmit={this.submitNewRound}/> : null}
      </div>
    )
  }
});
