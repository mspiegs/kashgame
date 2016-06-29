var Round = React.createClass({
  getInitialState() {
    return { rounds: this.props.rounds }
  },

  clickRound(round){
    this.props.clickRound(round);
  },

  render() {
    var rounds = this.props.rounds.map((round, id) => {
      var user_names = [];
      var names = round.users.map((user, id) => {
        user_names.push(user.first_name + ' ' + user.last_name);
      });
      console.log(user_names);
      return (
        <li key={id}><a href='#' onClick={this.clickRound.bind(this, round.id)}>{round.name}</a>{user_names.join(', ')}</li>
        )
    });
    return (
      <div>
        <div className="rounds-header bg-primary">
          <p>My Rounds</p>
        </div>
        <ul className="rounds-list">
          {rounds}
        </ul>
      </div>
    )
  }
});
