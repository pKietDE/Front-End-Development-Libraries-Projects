const BREAKINCREMENT = "BREAKINCREMENT";
const BREAKDECREMENT = "BREAKDECREMENT";
const SESSIONSINCREMENT = "SESSIONSINCREMENT";
const SESSIONSDECREMENT = "SESSIONSDECREMENT";
const TIMEBREAK = "BREAK";
const TIMESESSIONS = "SESSIONS";
class BuildA25Plus5ClockComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isStart: false,
      timerType: TIMESESSIONS,
      timeLeft: 25 * 60,
    };

    this.handleChangeBreak = this.handleChangeBreak.bind(this);
    this.handleChangeSeesions = this.handleChangeSeesions.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleChangeBreak(type) {
    if (!this.state.isStart) {
      switch (type) {
        case BREAKINCREMENT:
          if (this.state.breakLength < 60) {
            this.setState((state) => ({
              breakLength: state.breakLength + 1,
            }));
          }

          break;
        case BREAKDECREMENT:
          if (this.state.breakLength > 1) {
            this.setState((state) => ({
              breakLength: state.breakLength - 1,
            }));
          }
          break;
      }
    }
  }
  handleChangeSeesions(type) {
    if (!this.state.isStart) {
      switch (type) {
        case SESSIONSINCREMENT:
          if (this.state.sessionLength < 60) {
            this.setState((state) => ({
              sessionLength: state.sessionLength + 1,
            }));
          }

          this.setState((state) => ({
            timeLeft: state.sessionLength * 60,
          }));

          break;
        case SESSIONSDECREMENT:
          if (this.state.sessionLength > 1) {
            this.setState((state) => ({
              sessionLength: state.sessionLength - 1,
            }));
          }
          this.setState((state) => ({
            timeLeft: state.sessionLength * 60,
          }));

          break;
      }
    }
  }
  handleReset() {
    clearInterval(this.timer); // <-- thêm dòng này
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;

    this.setState({
      breakLength: 5,
      sessionLength: 25,
      isStart: false,
      timerType: TIMESESSIONS,
      timeLeft: 25 * 60,
    });
  }

  handleStart() {
    this.setState((state) => ({
      isStart: !state.isStart,
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isStart !== this.state.isStart) {
      if (this.state.isStart) {
        this.timer = setInterval(() => {
          this.setState((state) => {
            if (state.timeLeft > 0) {
              return { timeLeft: state.timeLeft - 1 };
            } else {
              document.getElementById("beep").play();
              if (state.timerType === TIMEBREAK) {
                return {
                  timerType: TIMESESSIONS,
                  timeLeft: state.sessionLength * 60,
                };
              } else {
                return {
                  timerType: TIMEBREAK,
                  timeLeft: state.breakLength * 60,
                };
              }
            }
          });
        }, 1000);
      } else {
        clearInterval(this.timer);
      }
    }
  }

  formatTime(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  render() {
    return (
      <div className="container">
        {/**Title */}
        <h1>25 + 5 clock</h1>
        {/**Row break and session */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/** Column */}
          <div>
            <h2 id="break-label">Break Length</h2>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fa-solid fa-down-long fa-xl hover-box"
                id="break-decrement"
                onClick={() => this.handleChangeBreak(BREAKDECREMENT)}
              ></i>
              <label id="break-length">{this.state.breakLength}</label>
              <i
                className="fa-solid fa-up-long fa-xl hover-box"
                id="break-increment"
                onClick={() => this.handleChangeBreak(BREAKINCREMENT)}
              ></i>
            </div>
          </div>
          <div>
            <h2 id="session-label">Seesion Length</h2>
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fa-solid fa-down-long fa-xl hover-box"
                id="session-decrement"
                onClick={() => this.handleChangeSeesions(SESSIONSDECREMENT)}
              ></i>
              <label id="session-length">{this.state.sessionLength}</label>
              <i
                className="fa-solid fa-up-long fa-xl hover-box"
                id="session-increment"
                onClick={() => this.handleChangeSeesions(SESSIONSINCREMENT)}
              ></i>
            </div>
          </div>
        </div>
        {/** Clock */}
        <div
          style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            border:
              this.state.timeLeft / 60 < 1
                ? "3px solid red"
                : "3px solid black",
            borderRadius: 10,
            marginTop: 18,
          }}
        >
          <label
            style={{
              fontSize: 30,
              color: this.state.timeLeft / 60 < 1 ? "red" : "black",
            }}
            id="timer-label"
          >
            {this.state.timerType === TIMESESSIONS ? "Session" : "Break"}
          </label>
          <label
            style={{
              fontSize: 20,
              color: this.state.timeLeft / 60 < 1 ? "red" : "black",
            }}
            id="time-left"
          >
            {this.formatTime(this.state.timeLeft)}
          </label>
        </div>
        {/**When click reset 
      'break-Length' return to 5 
      'seesion-Length' return to 25
      'time-left' reset default state
      */}
        <div style={{ display: "flex", marginTop: 8, gap: 8 }}>
          <button
            style={{
              width: "100vw",
              height: 50,
              backgroundColor: this.state.isStart ? "red" : null,
              color: this.state.isStart ? "white" : "black",
            }}
            id="start_stop"
            onClick={() => this.handleStart()}
          >
            {!this.state.isStart ? "Start" : "Pause"}
          </button>
          <button
            onClick={() => this.handleReset()}
            style={{ width: "100vw" }}
            id="reset"
          >
            <i className="fa-solid fa-rotate"></i>
          </button>
        </div>
        <p>
          Design and Coded By <br /> Phan Kiệt{" "}
        </p>
        <audio
          id="beep"
          preload="auto"
          src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
        />
      </div>
    );
  }
}

ReactDOM.render(
  <BuildA25Plus5ClockComponent />,
  document.getElementById("root")
);
