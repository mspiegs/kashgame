var AddNewRound = React.createClass({
  getInitialState: function() {
    return {
      roundName: "",
      courseId: 0,
      courses: this.props.courses,
      selected_course: "",
      golf_buddies: this.props.courses,
      selected_golfers: [this.props.current_user.id]
    }
  },

  handleRoundNameChange: function(e) {
    this.setState({ roundName: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var roundName = this.state.roundName.trim();
    var courseId = Number(this.state.selected_course);
    var user_ids = this.state.selected_golfers;
    this.props.onSubmit({ name: roundName, course_id: courseId, user_ids: user_ids});
    this.setState({ roundName: "", courseId: 0 });
  },

  handleCourseSelection: function(e) {
    this.setState({ selected_course: e.target.value});
  },

  handleGolferSelection: function(e) {
    e.preventDefault();
    this.setState({ selected_golfer: this.state.selected_golfers.push(Number(e.target.value)) });
  },

  render() {
    var select_options = [];
    var course_holder = this.props.courses;
    var select_options = Object.keys(course_holder).map(function (course) {
      return(
        <option value={course_holder[course]}>{course}</option>
      )
    });
    var golfers = this.props.golf_buddies.map((golfer, id) => {
      return(
        <option onClick={this.handleGolferSelection} value={golfer.id}>{golfer.first_name}</option>
      )
    });
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Round name"
            value={this.state.roundName}
            onChange={this.handleRoundNameChange}
          />
        </div>
        <div className="form-group">
          <select className="form-control" name="course" id="course" onChange={this.handleCourseSelection}>
            <option disabled selected value> -- select a course -- </option>
            {select_options}
          </select>
        </div>
        <div className="form-group">
          <select multiple className="form-control" name="golfers" id="golfer">
            <option disabled selected value> -- select golfers -- </option>
            {golfers}
          </select>
        </div>
        <button className="btn btn-primary" type="submit" value="Post">Add Round</button>
      </form>
    )
  }
});
