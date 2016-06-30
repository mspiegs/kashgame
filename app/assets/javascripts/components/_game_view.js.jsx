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

  scoreNassau: function() {
    var winner = {};
    var hole_winner = [];
    this.props.holes.map((hole) => {
      var scores = [];
      this.props.users.map((user) => {
        var user_hash = {};
        user_hash["user"] = user.first_name;
        user_hash["score"] = this.props.scores[user.first_name][hole.id];
        scores.push(user_hash);
        // if(this.props.scores[user.first_name][hole.id] != undefined){
        //   if(hole_winner.length < 1){
        //     hole_winner = user;
        //   } else if(this.props.scores[hole_winner.first_name][hole.id] > this.props.scores[user.first_name][hole.id]) {
        //     hole_winner = user;
        //   } else {
        //     hole_winner = hole_winner;
        //   }
        // }
      });
      var low_score = Math.min.apply(Math,scores.map(function(o){return o.score;}));
      console.log(low_score);
      var winner_name = scores.find(function(o){ return o.score == low_score; });
      winner[hole.id] = winner_name['user'];
      console.log(winner);
    });
  }
});
