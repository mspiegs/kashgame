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

  handleScoreChange: function (name, e) {
    var hole = {};
    var score = {};
    var user = {};
    hole[name] = e.target.getAttribute('data-hole');
    score[name] = e.target.value;
    user[name] = e.target.getAttribute('data-user');
    var data = {number: score[name], hole_id: hole[name], user_id: user[name], round_id: this.state.round.id};
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
    $.getJSON(url, (response) => { this.setState({ round: response, course: response.course, holes: response.course.holes, users: response.users })});
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
        var url = '/api/v1/scores?user_id=' + user.id + '&hole_id=' + hole.id + '&round_id=' + this.state.round.id;
        var hole_score = [];
        $.ajax({
          async: false,
          url: url,
          success: function(data) {
            hole_score = data;
            console.log(hole_score[0]);
          }
        });
        return (
          <td>
            <form className="" onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="#"
                data-user={user.id}
                data-hole={hole.number}
                value={hole_score[0].number}
                onChange={this.handleScoreChange.bind(this, 'input' + user.id + hole.id)}
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
