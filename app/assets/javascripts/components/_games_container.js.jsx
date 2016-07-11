var GamesContainer = React.createClass({

  getInitialState: function() {
    return {
      games: [],
      new_game: ''
    }
  },

  handleSelectGame: function(data){
    var selected_game = data.game_type;
    this.setState({ games: this.state.games.concat([this.state.new_game]), new_game: ''});
  },

  handleNewGame: function(e){
    var selected_game = e.target.value;
    this.setState({ new_game: selected_game });
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
      } else if(winner_names.length == 0){
        winners[hole.id] = 'no score';
      } else {
        winners[hole.id] = winner_names[0]['user'];
      }
    });
    return winners;
  },



  render() {
    var user_game = this.state.games.map((game, id) => {
      return (
        <GameView getHoleWinners={this.getHoleWinners} scoreNassau={this.scoreNassau} holes={this.props.holes} users={this.props.users} scores={this.props.scores} game={game} key={id} />
      )
    });

    var game_form;
    if(this.state.new_game != ''){
      game_form = <AddGameForm game={this.state.new_game} handleSelectGame={this.handleSelectGame}/>
    }


    return (
      <div>
        <div className="form-group">
          <select className="form-control" name="golfers" id="golfer" onChange={this.handleNewGame}>
            <option disabled selected value> -- select game -- </option>
            <option data-game='nassau' value='nassau'>Nassau</option>
            <option data-game='wolf' value='wolf'>Wolf</option>
          </select>
        </div>
        {game_form}
        <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
          Launch demo modal
        </button>


        <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

        {user_game}
      </div>
    )
  }
});
