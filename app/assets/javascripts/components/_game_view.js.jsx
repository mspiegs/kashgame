var GameView = React.createClass({

  getInitialState: function() {
    return {

    }
  },

  render() {
    switch(this.props.game){
      case 'nassau':
        return(
          <Nassau getHoleWinners={this.props.getHoleWinners} scoreNassau={this.props.scoreNassau} holes={this.props.holes} users={this.props.users} scores={this.props.scores} game={this.props.game}/>
        );
        break;
      case 'wolf':
        return(
          "This is Wolf"
        );
        break;
    }
  }
});


