var AddGameForm = React.createClass({

  getInitialState: function() {
    return {
      game_type: '',
      font_9: 0,
      back_9: 0,
      overall_18: 0,
      press: false
    }
  },

  handleSubmit: function(e) {
    var data = { game_type: this.state.game_type, front_9_bet: this.state.front_9, back_9_bet: this.state.back_9, overall_bet: this.state.overall_18, press: this.state.press};
    $.ajax({
      url: '/api/v1/games',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        this.props.handleSelectGame(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  changeType: function(e) {
    this.setState({ game_type: e.target.value});
  },

  changeFront9: function(e) {
    this.setState({ front_9: Math.abs(e.target.value)});
  },

  changeBack9: function(e) {
    this.setState({ back_9: Math.abs(e.target.value)});
  },

  changeOverall18: function(e) {
    this.setState({ overall_18: Math.abs(e.target.value)});
  },

  changePress: function(e) {
    var checkbox_state = false;
    if(e.target.checked){
      checkbox_state = true;
    } else {
      checkbox_state = false;
    }
    this.setState({ press: checkbox_state });
  },

  render() {
    switch(this.props.game){
      case 'nassau':
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input className='form-control' type="text" placeholder="Name" onChange={this.changeType}></input>
              <input className='form-control' type="text" placeholder="Front 9 bet" onChange={this.changeFront9}></input>
              <input className='form-control' type="text" placeholder="Back 9 bet" onChange={this.changeBack9}></input>
              <input className='form-control' type="text" placeholder="Overall 18 bet" onChange={this.changeOverall18}></input>
              <label>Auto Press?</label><input className='' type="checkbox" onChange={this.changePress}></input>
            </div>
            <button className="btn btn-primary" type="submit" value="Post">Add Game</button>
          </form>
        );
        break;
      case 'wolf':
        return (
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <input className='form-control' type="text" placeholder="Name" onChange={this.changeType}></input>
              <input className='form-control' type="text" placeholder="Front 9 bet" onChange={this.changeFront9}></input>
              <input className='form-control' type="text" placeholder="Back 9 bet" onChange={this.changeBack9}></input>
              <input className='form-control' type="text" placeholder="Overall 18 bet" onChange={this.changeOverall18}></input>
              <label>Auto Press?</label><input className='' type="checkbox" onChange={this.changePress}></input>
            </div>
            <button className="btn btn-primary" type="submit" value="Post">Add Game</button>
          </form>
        );
        break;
    }
  }
});
