var ViewRound = React.createClass({

  getInitialState: function() {
    return {
      round: [],
      course: [],
      holes: [],
      users: [],
      score: ''
    }
  },

  handleScoreChange: function (e) {
    console.log(e.target.getAttribute('data-hole'));
    var hole = e.target.getAttribute('data-hole');
    var score = e.target.value;
    var data = {number: score, hole_id: hole};
    $.ajax({
      url: '/api/v1/scores',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        e.target.value = data.number;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function() {
    var hole = e.target.getAttribute('data-hole');
    var score = this.state.score;
    var data = {number: score, hole_id: hole};
    $.ajax({
      url: '/api/v1/scores',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.setState({score: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    var url = '/api/v1/rounds/' + this.props.round + '.json';
    console.log(url);
    $.getJSON(url, (response) => { this.setState({ round: response, course: response.course, holes: response.course.holes, users: response.users })});
    console.log(this.state.round);
  },

  render() {
    var holes = this.state.holes.map((hole, id) => {
      return (
        <th key={id}>
          <p>Hole: {hole.number}</p>
          <p>Par: {hole.par}</p>
          <p>{hole.length} yards</p>
        </th>
      )
    });

    var users = this.state.users.map((user, id) => {
      var selects = this.state.holes.map((hole, id) => {
        return (
          <td>
            <form className="" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="#"
                data-hole={hole.number}
                value={this.state.score}
                onChange={this.handleScoreChange}
              />
              <input type="submit" value="Post" />
            </form>
          </td>
        )
      });
      return (
        <tr key={id}>
          <td>
            {user.first_name}
          </td>
          {selects}
        </tr>
      )
    });
    console.log(holes);
    return (
      <div>
        <h1>{this.state.round.name} played at {this.state.course.name}</h1>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {holes}
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
      </div>

    )
  }

});
