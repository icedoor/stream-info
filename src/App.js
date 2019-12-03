import React, { Component } from 'react';
import './App.css';
import Game from './components/Game';
import DropDown from './components/DropDown';

const games = [
  'Hearthstone',
  'Overwatch'
];

const amount = [
  10,
  20,
  50
];

class App extends Component {
  state = {
    selectedGame: games[0],
    selectedAmount: amount[0],
    streams: [],
    isLoading: true,
    error: null
  }

  handleResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  getStreamsMetadata = (gameName) => {
    if (!gameName) {
      this.setState({ error: 'Invalid game name', isLoading: false });
      return;
    }

    let authHeader = {
      'Client-ID': process.env.REACT_APP_API_KEY
    }

    let streams = fetch(`https://api.twitch.tv/helix/games?name=${gameName}`, {
      headers: authHeader
    })
      .then(this.handleResponse)
      .then(data => {
        return fetch(`https://api.twitch.tv/helix/streams?first=${this.state.selectedAmount}&game_id=${data.data[0].id}`, {
          headers: authHeader
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      })

    let metadata = streams
      .then(this.handleResponse)
      .then(data => {
        const results = data.data.map((stream) => {
          return fetch(`https://api.twitch.tv/helix/streams/metadata?user_id=${stream.user_id}`, {
            headers: authHeader
          })
            .then(this.handleResponse)
            .then(data => {
              return { viewers: stream.viewer_count, ...data.data[0] };
            })
            .catch(error => this.setState({ error, isLoading: false }))
        })

        return Promise.all(results).then((metadata) => { return metadata });
      })
      .catch(error => this.setState({ error, isLoading: false }))

    metadata.then((streams) => {
      this.setState({ streams, isLoading: false })
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    this.getStreamsMetadata(this.state.selectedGame)

    // Fetch data every 10 seconds
    this.timer = setInterval(() => this.getStreamsMetadata(this.state.selectedGame), 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  handleGameChange = (e) => {
    let selectedGame = e.target.value
    this.setState({ selectedGame });
    this.getStreamsMetadata(selectedGame)
  }

  handleAmountChange = (e) => {
    let selectedAmount = e.target.value
    this.setState({ selectedAmount });
    this.getStreamsMetadata(this.state.selectedGame)
  }

  render() {
    const { streams, isLoading, error, selectedGame, selectedAmount } = this.state

    if (error) {
      return <p>There was an error</p>
    }

    return (
      <React.Fragment>
        <DropDown options={games} value={selectedGame} handleChange={this.handleGameChange} />
        <DropDown options={amount} value={selectedAmount} handleChange={this.handleAmountChange} />

        {isLoading && (<p>Loading ...</p>)}

        <div className="grid-container">
          {streams.map(game =>
            (
              <Game key={game.user_id} game={game} />
            )
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default App;
