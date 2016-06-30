var GamesContainer = React.createClass({

  getInitialState: function() {
    return {
      games: []
    }
  },

  handleSelectGame: function(e){
    e.preventDefault();
    var selected_game = e.target.getAttribute('data-game');
    this.setState({ game: this.state.games.push(selected_game)});
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



  render() {
    var games = this.state.games.map((game, id) => {
      return (
        <GameView getHoleWinners={this.getHoleWinners} scoreNassau={this.scoreNassau} holes={this.props.holes} users={this.props.users} scores={this.props.scores} game={game} key={id} />
      )
    });
    return (
      <div>
        <div className="form-group">
          <select multiple className="form-control" name="golfers" id="golfer">
            <option disabled selected value> -- select game -- </option>
            <option onClick={this.handleSelectGame} data-game='nassau' value='nassau'>Nassau</option>
          </select>
        </div>
        {games}
      </div>
    )
  }
});
