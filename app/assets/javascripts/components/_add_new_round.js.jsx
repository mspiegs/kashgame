var AddNewRound = React.createClass({
  getInitialState: function() {
    return {
      roundName: "",
      courseId: 0,
      courses: this.props.courses,
      selected_course: ""
    }
  },

  handleRoundNameChange: function(e) {
    this.setState({ roundName: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault;
    var roundName = this.state.roundName.trim();
    var courseId = Number(this.state.selected_course);
    this.props.onSubmit({ name: roundName, course_id: courseId, user_ids: [1,2]});
    this.setState({ roundName: "", courseId: 0 });
  },

  handleCourseSelection: function(e) {
    this.setState({ selected_course: e.target.value});
  },

  render() {
    var select_options = [];
    var course_holder = this.props.courses;
    var select_options = Object.keys(course_holder).map(function (course) {
      return(
        <option value={course_holder[course]}>{course}</option>
      )
    });
    return (
      <form className="" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Round name"
          value={this.state.roundName}
          onChange={this.handleRoundNameChange}
        />
        <select name="course" id="course" onChange={this.handleCourseSelection}>
          <option disabled selected value> -- select an option -- </option>
          {select_options}
        </select>
        <button className="btn btn-primary" type="submit" value="Post">Add Round</button>
      </form>
    )
  }
});
