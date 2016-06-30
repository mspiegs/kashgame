var GameView = React.createClass({

  componentDidMount: function() {
    this.chooseGame();
  },

  chooseGame: function() {
    if(this.props.game === 'nassau') {
      this.scoreNassau();
    }
  },

  render() {
    var holes = this.props.holes.map((hole, id) => {
      return (
        <th key={id}>
          <p>Hole: {hole.number}</p>
        </th>
      )
    });
    var users = this.props.users.map((user, id) => {
      return (
        <tr key={id}>
          <td>
            {user.first_name}
          </td>

        </tr>
      )
    });
    return(
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
    )
  },

  getHoleWinners: function() {
    var winners = {};
    var hole_winner = [];
    this.props.holes.map((hole) => {
      var scores = [];
      var names = [];
      this.props.users.map((user) => {
        var user_hash = {};
        user_hash["user"] = user.first_name;
        user_hash["score"] = this.props.scores[user.first_name][hole.id];
        scores.push(user_hash);
      });
      var low_score = Math.min.apply(Math,scores.map(function(o){return o.score;}));
      var winner_names = scores.filter(function(o){ return o.score == low_score; });
      if(winner_names.length > 1){
        winner_names.map((name) => {
          names.push(name['user']);
          winners[hole.id] = names;
        });
      } else {
        winners[hole.id] = winner_names[0]['user'];
      }
    });
    return winners;
  },

  scoreNassau: function() {
    var winners = this.getHoleWinners();
    console.log(winners);
  }
});
