import React from 'react';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, IconButton,
  CardMenu, Button} from 'react-mdl';
import fb from '../firebase';


export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.redChange = this.redChange.bind(this);
    this.blueChange = this.blueChange.bind(this);
    this.redToggle = this.redToggle.bind(this);
    this.blueToggle = this.blueToggle.bind(this);
    this.changePlayer = this.changePlayer.bind(this);
    this.state = {
      players: []
    };
  }

  redChange(e) {
    this.props.handleRedChange(e.target.value);
  }

  blueChange(e) {
    this.props.handleBlueChange(e.target.value);
  }

  redToggle(e) {
    this.props.handleRedConfirm(e.target.value);
  }

  blueToggle(e) {
    this.props.handleBlueConfirm(e.target.value);
  }

  // Function that handles the arrows for the player chooser
  changePlayer(player, direction) {
    console.log(player, direction);
    // const playersLength = this.state.players.length;
    // let id = this.state[player];
    //
    // if (direction === 'next') {
    //   if (id < playersLength) {
    //     console.log('Sum 1');
    //     this.setState({[player]: (id + 1)});
    //   } else {
    //     console.log('reset 0');
    //     this.setState({[player]: (0)});
    //   }
    // } else {
    //   if (id === 0) {
    //     console.log('reset ultimo');
    //     this.setState({[player]: playersLength});
    //   } else {
    //     console.log('rest 1');
    //     this.setState({[player]: (id - 1)});
    //   }
    // }
  }

  componentWillMount() {
    fb.bindToState('players', {
      context: this,
      state: 'players',
      asArray: true
    });
  }

  render() {
    const red = this.props.red;
    const blue = this.props.blue;
    const redReady = this.props.redReady;
    const blueReady = this.props.blueReady;

    return (
      <Grid className="newGame">
        <Cell col={6}>
          <Card shadow={3} style={{width: '80%', height: '50vh', margin: 'auto', backgroundColor: '#EF5350'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #FFCDD2'}}>Rank: ??</CardTitle>
            <CardText style={{width: '100%', borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
              <IconButton name="navigate_before"
                onClick={() => this.changePlayer('red', 'prev')} />
              <div className="mdl-layout-spacer" />
              <input
                disabled={redReady}
                type="text"
                style={{
                  width: '95%',
                  textAlign: 'center',
                  fontSize: '2.3em',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white'
                }}
                value={red}
                onChange={this.redChange} />
              <div className="mdl-layout-spacer" />
              <IconButton name="navigate_next"
                onClick={() => this.changePlayer('red', 'next')} />
            </CardText>
            <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', backgroundColor: '#B71C1C'}}>
              <Button value={!redReady} disabled={redReady} onClick={this.redToggle} style={{color: '#fff', width: '100%'}}>{redReady ? 'Waiting for blue...' : 'Click table button to confirm...'}</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton value={!redReady} onClick={this.redToggle} style={{ display: redReady ? 'inline' : 'none' }} name="close" />
            </CardMenu>
          </Card>
        </Cell>
        <Cell col={6}>
          <Card shadow={3} style={{width: '80%', height: '50vh', margin: 'auto', backgroundColor: '#5C6BC0'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) bottom right 15% no-repeat #C5CAE9'}}>Rank: ??</CardTitle>
            <CardText style={{width: '100%', borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', color: '#fff'}}>
              <IconButton name="navigate_before"
                onClick={() => this.changePlayer('blue', 'prev')} />
              <div className="mdl-layout-spacer" />
              <input
                disabled={blueReady}
                type="text"
                style={{
                  width: '95%',
                  textAlign: 'center',
                  fontSize: '2.3em',
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                  color: 'white'
                }}
                value={blue}
                onChange={this.blueChange} />
              <div className="mdl-layout-spacer" />
              <IconButton name="navigate_next"
                onClick={() => this.changePlayer('blue', 'next')} />
            </CardText>
            <CardActions border style={{borderColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', boxSizing: 'border-box', alignItems: 'center', backgroundColor: '#1A237E'}}>
              <Button value={!blueReady} disabled={blueReady} onClick={this.blueToggle} style={{color: '#fff', width: '100%'}}>{blueReady ? 'Waiting for red...' : 'Click table button to confirm...'}</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton value={!blueReady} onClick={this.blueToggle} style={{ display: blueReady ? 'inline' : 'none' }} name="close" />
            </CardMenu>
          </Card>
        </Cell>
      </Grid>
    );
  }
}

NewGame.propTypes = {
  red: React.PropTypes.string.isRequired,
  blue: React.PropTypes.string.isRequired,
  redReady: React.PropTypes.bool.isRequired,
  blueReady: React.PropTypes.bool.isRequired,
  handleRedChange: React.PropTypes.func.isRequired,
  handleBlueChange: React.PropTypes.func.isRequired,
  handleRedConfirm: React.PropTypes.func.isRequired,
  handleBlueConfirm: React.PropTypes.func.isRequired
};
