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
    this.setState({running_score: this.scoreNassau()});
  },

  scoreNassau: function() {
    var winners = this.props.getHoleWinners();
    var running_score = {};
    this.props.users.map((user) => {
      running_score[user.first_name + " " + user.last_name] = {};
    });
    var scorings = this.props.holes.map((hole) => {
      var previous_hole = hole.number - 1;
      this.props.users.map((user) => {
        if(hole.number == 1){
          if(typeof winners[hole.number] != "string"){
            running_score[user.first_name + " " + user.last_name][hole.number] = 'AS';
          } else {
            if(winners[hole.number] == user.first_name){
              running_score[user.first_name + " " + user.last_name][hole.number] = 1;
            } else {
              running_score[user.first_name + " " + user.last_name][hole.number] = -1;
            }
          }
        } else {
          if(typeof winners[hole.number] != "string"){
            running_score[user.first_name + " " + user.last_name][hole.number] = running_score[user.first_name + " " + user.last_name][previous_hole];
          } else {
            if(winners[hole.number] == user.first_name){
              var hole_number = hole.number + 1;
              running_score[user.first_name + " " + user.last_name][hole.number] = running_score[user.first_name + " " + user.last_name][previous_hole] + 1;
            } else {
              var hole_number = hole.number - 1;
              running_score[user.first_name + " " + user.last_name][hole.number] = running_score[user.first_name + " " + user.last_name][previous_hole] - 1;
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
        if(running_tally[hole.number] > 0){
          return (
            <td className="greaterthan" data-key={hole.number}>{running_tally[hole.number] + "U"}</td>
          )
        } else if(running_tally[hole.number] < 0){
          return (
            <td className="lessthan" data-key={hole.number}></td>
          )
        } else if(running_tally[hole.number] == 0){
          return (
            <td className="square" data-key={hole.number}>AS</td>
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


