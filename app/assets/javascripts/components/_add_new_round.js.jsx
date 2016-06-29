var AddNewRound = React.createClass({
  getInitialState: function() {
    return {
      roundName: "",
      courseId: 0,
      courses: []
    }
  },

  handleRoundNameChange: function(e) {
    this.setState({ roundName: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault;
    var roundName = this.state.roundName.trim();
    var courseId = 1;
    this.props.onSubmit({ name: roundName, course_id: courseId, user_ids: [1,2]});
    this.setState({ roundName: "", courseId: 0 });
  },

  get

  render() {
    return (
      <form className="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Round name"
          value={this.state.roundName}
          onChange={this.handleRoundNameChange}
        />
        <button className="btn btn-primary" type="submit" value="Post">Add Round</button>
      </form>
    )
  }
});
