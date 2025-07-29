class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      display: "0",
      evaluated: false,
    };
  }

  isOperator = (value) => /[+\-*/]/.test(value);

  handleNumber = (value) => {
    const { display, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        formula: value,
        display: value,
        evaluated: false,
      });
    } else {
      if (display === "0" || this.isOperator(display)) {
        this.setState({
          display: value,
          formula: formula + value,
        });
      } else {
        this.setState({
          display: display + value,
          formula: formula + value,
        });
      }
    }
  };

  handleDecimal = () => {
    const { display, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        formula: "0.",
        display: "0.",
        evaluated: false,
      });
      return;
    }

    if (!display.includes(".")) {
      this.setState({
        display: display + ".",
        formula: formula + ".",
      });
    }
  };

  handleOperator = (value) => {
    let { formula, evaluated, display } = this.state;

    if (evaluated) {
      formula = display;
      evaluated = false;
    }

    if (/[-+*/]$/.test(formula)) {
      if (value === "-" && !/[-]$/.test(formula)) {
        formula += value;
      } else {
        formula = formula.replace(/[-+*/]+$/, value);
      }
    } else {
      formula += value;
    }

    this.setState({
      formula,
      display: value,
      evaluated: false,
    });
  };

  handleClear = () => {
    this.setState({
      formula: "",
      display: "0",
      evaluated: false,
    });
  };

  handleEqual = () => {
    let expression = this.state.formula;
    expression = expression.replace(/x/g, "*").replace(/--/g, "+");

    try {
      const result = eval(expression);
      const rounded = parseFloat(result.toFixed(10)).toString();

      this.setState({
        formula: expression + "=" + rounded,
        display: rounded,
        evaluated: true,
      });
    } catch (err) {
      this.setState({
        display: "Error",
        formula: "",
        evaluated: true,
      });
    }
  };

  render() {
    return (
      <div className="calculator">
        <div id="display" className="display">
          {this.state.display}
        </div>

        <div className="buttons">
          <button
            id="clear"
            style={{ gridArea: "clear" }}
            onClick={this.handleClear}
          >
            AC
          </button>
          <button
            id="divide"
            style={{ gridArea: "divide" }}
            onClick={() => this.handleOperator("/")}
          >
            /
          </button>
          <button
            id="multiply"
            style={{ gridArea: "multiply" }}
            onClick={() => this.handleOperator("*")}
          >
            x
          </button>

          <button
            id="seven"
            style={{ gridArea: "seven" }}
            onClick={() => this.handleNumber("7")}
          >
            7
          </button>
          <button
            id="eight"
            style={{ gridArea: "eight" }}
            onClick={() => this.handleNumber("8")}
          >
            8
          </button>
          <button
            id="nine"
            style={{ gridArea: "nine" }}
            onClick={() => this.handleNumber("9")}
          >
            9
          </button>
          <button
            id="subtract"
            style={{ gridArea: "subtract" }}
            onClick={() => this.handleOperator("-")}
          >
            -
          </button>

          <button
            id="four"
            style={{ gridArea: "four" }}
            onClick={() => this.handleNumber("4")}
          >
            4
          </button>
          <button
            id="five"
            style={{ gridArea: "five" }}
            onClick={() => this.handleNumber("5")}
          >
            5
          </button>
          <button
            id="six"
            style={{ gridArea: "six" }}
            onClick={() => this.handleNumber("6")}
          >
            6
          </button>
          <button
            id="add"
            style={{ gridArea: "add" }}
            onClick={() => this.handleOperator("+")}
          >
            +
          </button>

          <button
            id="one"
            style={{ gridArea: "one" }}
            onClick={() => this.handleNumber("1")}
          >
            1
          </button>
          <button
            id="two"
            style={{ gridArea: "two" }}
            onClick={() => this.handleNumber("2")}
          >
            2
          </button>
          <button
            id="three"
            style={{ gridArea: "three" }}
            onClick={() => this.handleNumber("3")}
          >
            3
          </button>

          <button
            id="equals"
            style={{ gridArea: "equals" }}
            onClick={this.handleEqual}
          >
            =
          </button>

          <button
            id="zero"
            style={{ gridArea: "zero" }}
            onClick={() => this.handleNumber("0")}
          >
            0
          </button>
          <button
            id="decimal"
            style={{ gridArea: "decimal" }}
            onClick={this.handleDecimal}
          >
            .
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
