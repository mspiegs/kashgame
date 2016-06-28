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
    var user = e.target.getAttribute('data-user');
    var data = {number: score, hole_id: hole, user_id: user};
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
        var hole_score = 0;
        var url = '/api/v1/scores?user_id=' + user.id + '&hold_id=' + hole.id + '&round_id=' + this.state.round.id;
        $.ajax({
          async: false,
          url: url,
          success: function(data) {
            console.log(data.number);
            hole_score = data.number;
          }
        });
        console.log(hole_score);
        return (
          <td>
            <form className="" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="#"
                data-user={user.id}
                data-hole={hole.number}
                value={hole_score}
                onChange={this.handleScoreChange}
              />
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
