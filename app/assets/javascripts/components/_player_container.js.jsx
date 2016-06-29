var PlayerContainer = React.createClass({

  getInitialState: function() {
    return {
      rounds: [],
      addNewRound: false,
      courses: [],
      golf_buddies: {}
    }
  },

  componentDidMount: function() {
    $.getJSON('/api/v1/rounds.json', (response) => { this.setState({ rounds: response }) });
    $.getJSON('/api/v1/courses.json', (response) => { this.setState({ courses: response }) });
    $.getJSON('/api/v1/golf_buddies.json', (response) => { this.setState({ golf_buddies: response }) });
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

  getCourses: function() {
    $.getJSON('/api/v1/courses.json', (response) => { this.setState({ courses: response }) });
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
        <button onClick={this.addNewRoundButton} className="btn btn-default btn-md">Add New Round</button>
        {this.state.addNewRound ? <AddNewRound courses={this.state.courses} onSubmit={this.submitNewRound} golf_buddies={this.state.golf_buddies} /> : null}
      </div>
    )
  }
});
