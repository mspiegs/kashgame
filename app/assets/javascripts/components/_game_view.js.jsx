var GameView = React.createClass({

  getInitialState: function() {
    return {
      running_score: {}
    }
  },

  componentWillMount: function() {
    this.chooseGame();
  },

  chooseGame: function() {
    if(this.props.game === 'nassau') {
      this.setState({running_score: {"nassau":{}}});
      console.log(this.state.running_score);
      this.scoreNassau();
    }
  },

  render() {
    var scoring_rows = this.props.users.map((user) => {
      console.log(this.state.running_score);
      var running_tally = this.state.running_score[user.first_name + " " + user.last_name];
      var rows = this.props.holes.map((hole) => {
        if(running_tally[hole.id] > 0){
          return (
            <td>{running_tally[hole.id] + " up"}</td>
          )
        } else if(running_tally[hole.id] < 0){
          return (
            <td>{Math.abs(running_tally[hole.id]) + " down"}</td>
          )
        }
      });
      return (
        <tr>
          <td>{user.first_name}</td>
          {rows}
        </tr>
      )
    });
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
          {scoring_rows}
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
    var running_score = {};
    this.props.users.map((user) => {
      running_score[user.first_name + " " + user.last_name] = {};
    });
    console.log(winners);
    var scorings = this.props.holes.map((hole) => {
      var previous_hole = hole.id - 1;
      this.props.users.map((user) => {
        if(hole.id == 1){
          if(typeof winners[hole.id] != "string"){
            running_score[user.first_name + " " + user.last_name][hole.id] = 'AS';
          } else {
            if(winners[hole.id] == user.first_name){
              running_score[user.first_name + " " + user.last_name][hole.id] = 1;
            } else {
              running_score[user.first_name + " " + user.last_name][hole.id] = -1;
            }
          }
        } else {
          if(typeof winners[hole.id] != "string"){
            running_score[user.first_name + " " + user.last_name][hole.id] = running_score[user.first_name + " " + user.last_name][previous_hole];
          } else {
            if(winners[hole.id] == user.first_name){
              var hole_id = hole.id + 1;
              running_score[user.first_name + " " + user.last_name][hole.id] = running_score[user.first_name + " " + user.last_name][previous_hole] + 1;
            } else {
              var hold_id = hole.id - 1;
              running_score[user.first_name + " " + user.last_name][hole.id] = running_score[user.first_name + " " + user.last_name][previous_hole] - 1;
            }
          }
        }
      });
    });
    console.log(running_score);
    this.setState({running_score: this.state.running_score["nassau"] = running_score});
  }
});
