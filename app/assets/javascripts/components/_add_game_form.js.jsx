var AddGameForm = React.createClass({
  render() {
    switch(this.props.game){
      case 'nassau':
        return (
          <form>
            <div className='form-group'>
              <input className='form-control'></input>
            </div>
          </form>
        );
        break;
    }
  }
});
