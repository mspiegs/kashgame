var ViewRound = React.createClass({

  getInitialState: function() {
    return {
      round: [],
      course: [],
      holes: [],
      users: [],
      scores: {},
      games: []
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
        this.getScores();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getScores: function() {
    var url = '/api/v1/rounds/' + this.props.round + '/get_scores';
    $.getJSON(url, (response) => { this.setState({ scores: response })});
  },

  clickBackToRounds: function(e){
    e.preventDefault();
    console.log("clicked");
    this.props.clickBackToRounds();
  },

  componentDidMount: function() {
    var url = '/api/v1/rounds/' + this.props.round + '.json';
    $.getJSON(url, (response) => { this.setState({ round: response, course: response.course, holes: response.course.holes, users: response.users })});
    this.getScores();
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
                data-user={user.id}
                data-hole={hole.number}
                value={this.state.scores[user.first_name][hole.id]}
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
        <p className="back_link" onClick={this.clickBackToRounds}>back to rounds</p>
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


        <GamesContainer  holes={this.state.holes} users={this.state.users} scores={this.state.scores} />

      </div>




    )
  }

});
