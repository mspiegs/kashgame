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
      this.scoreGame();
    }
  },

  scoreGame: function() {
    console.log(this.scoreNassau());
    this.setState({running_score: this.scoreNassau()});
  },

  scoreNassau: function() {
    var winners = this.props.getHoleWinners();
    var running_score = {};
    this.props.users.map((user) => {
      running_score[user.first_name + " " + user.last_name] = {};
    });
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
    return running_score;
  },

  render() {
    var scoring_rows = this.props.users.map((user) => {
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
  }
});


