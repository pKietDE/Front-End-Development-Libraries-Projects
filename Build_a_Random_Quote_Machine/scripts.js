const URL =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const COLORS = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];
class BuildARandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      quoteCurrent: {
        quote: "",
        author: "",
        color: "",
      },
    };
    this.loadQuotes = this.loadQuotes.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    this.loadQuotes();
  }

  loadQuotes() {
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          console.debug("Error");
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.debug("Data: ", data.quotes);
        this.setState({
          quotes: data.quotes,
        });
        this.getRandomQuote();
      });
  }

  getRandomQuote() {
    const indexQuotes = Math.floor(Math.random() * this.state.quotes.length);
    const indexColors = Math.floor(Math.random() * COLORS.length);
    this.setState({
      quoteCurrent: {
        quote: this.state.quotes[indexQuotes].quote,
        author: this.state.quotes[indexQuotes].author,
        color: COLORS[indexColors],
      },
    });
  }

  render() {
    const { quote, author, color } = this.state.quoteCurrent;

    return (
      <div
        style={{
          backgroundColor: color,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.5s ease",
        }}
      >
        <div
          id="quote-box"
          style={{
            backgroundColor: "white",
            width: "70vh",
            padding: 24,
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "40vh",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Quote Section */}
          <div style={{ marginBottom: 20 }}>
            <p
              id="text"
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: color,
                textAlign: "center",
              }}
            >
              <i className="fa fa-quote-left" /> {quote}
            </p>
          </div>

          {/* Author Section */}
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <p
              id="author"
              style={{
                fontSize: 18,
                fontStyle: "italic",
                color: color,
              }}
            >
              — {author}
            </p>
          </div>

          {/* Button + Tweet Section */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              id="new-quote"
              onClick={this.getRandomQuote}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                backgroundColor: color,
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              New Quote
            </button>

            <a
              id="tweet-quote"
              href="twitter.com/intent/tweet"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: color,
                fontWeight: "bold",
              }}
            >
              Tweet
            </a>
          </div>
          <p
            style={{
              textAlign: "center",
              color: this.state.quoteCurrent.color,
            }}
          >
            Design and Coded By <br /> Phan Kiệt{" "}
          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BuildARandomQuoteMachine />, document.getElementById("root"));
