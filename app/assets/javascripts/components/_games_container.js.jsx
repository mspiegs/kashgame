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

  render() {
    var games = this.state.games.map((game, id) => {
      console.log(game);
      return (
        <GameView game={game} key={id} />
      )
    });
    return (
      <div>
        <div className="form-group">
          <select multiple className="form-control" name="golfers" id="golfer">
            <option disabled selected value> -- select golfers -- </option>
            <option onClick={this.handleSelectGame} data-game='nassau' value='nassau'>Nassau</option>
          </select>
        </div>
        {games}
      </div>
    )
  }
});