const audioClips = [
  { key: "Q", id: "Heater-1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { key: "D", id: "Open-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }
];

class DrumPad extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.key.toUpperCase() === this.props.keyTrigger) {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.updateDisplay(this.props.clipId);
    }
  };

  playSound = () => {
    this.audio.play();
    this.audio.currentTime = 0;
    this.props.updateDisplay(this.props.clipId);
  };

  render() {
    return (
      <div id={this.props.clipId} className="drum-pad" onClick={this.playSound}>
        {this.props.keyTrigger}
        <audio
          ref={(ref) => (this.audio = ref)}
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.src}
        ></audio>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Press a key"
    };
  }

  updateDisplay = (name) => {
    this.setState({ display: name });
  };

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <div className="pad-grid">
          {audioClips.map((clip) => (
            <DrumPad
              key={clip.key}
              keyTrigger={clip.key}
              clipId={clip.id}
              src={clip.src}
              updateDisplay={this.updateDisplay}
            />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
