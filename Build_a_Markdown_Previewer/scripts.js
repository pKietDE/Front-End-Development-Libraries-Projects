const TYPE_EDITOR = "EDITOR";
const TYPE_PREVIEWER = "PREVIEWER";
const DEFAULT_MARKDOWN = `# Đây là tiêu đề cấp 1 (H1)

## Đây là tiêu đề cấp 2 (H2)

Bạn có thể truy cập [FreeCodeCamp](https://www.freecodecamp.org) để học lập trình miễn phí.

Đây là một đoạn mã \`inline code\` nằm trong dòng.

\`\`\`
Đây là một khối mã (code block)
function sayHello() {
  console.log("Hello!");
}
\`\`\`

- Mục đầu tiên trong danh sách
- Mục thứ hai

> Đây là một trích dẫn.

**Đây là một đoạn in đậm**

![Hình minh hoạ](https://via.placeholder.com/150)
`;
marked.setOptions({
  breaks: true,
});
class MarkDownPreviewrComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: DEFAULT_MARKDOWN,
      isVisibleEditor: true,
      isVisiblePreview: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleVisible = this.handleVisible.bind(this);
  }

  handleChange(text) {
    this.setState({
      markdown: text,
    });
  }

  handleVisible(type) {
    if (type === TYPE_EDITOR) {
      this.setState((state) => ({
        isVisiblePreview: !state.isVisiblePreview,
      }));
    } else {
      this.setState((state) => ({
        isVisibleEditor: !state.isVisibleEditor,
      }));
    }
  }
  render() {
    return (
      <div
        style={{
          padding: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {/** editor */}
        {this.state.isVisibleEditor && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#4aa3a3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "2px solid black",
                width: this.state.isVisiblePreview ? "60dvh" : "100dvh",
                padding: 8,
              }}
            >
              <p>Editor</p>
              <i
                onClick={() => this.handleVisible(TYPE_EDITOR)}
                className="fa fa-arrows-alt hover-box"
              />
            </div>
            <textarea
              style={{
                backgroundColor: "#c0d8d8",
                height: this.state.isVisiblePreview ? "30dvh" : "100vh",
                overflow: scroll,
              }}
              value={this.state.markdown}
              onChange={(e) => this.handleChange(e.target.value)}
              id="editor"
            />
          </div>
        )}

        {/** Previewr */}
        {this.state.isVisiblePreview && (
          <div
            style={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#4aa3a3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "2px solid black",
                width: this.state.isVisibleEditor ? "70dvh" : "100vh",
                padding: 8,
              }}
            >
              <p>Previewer</p>
              <i
                onClick={() => this.handleVisible(TYPE_PREVIEWER)}
                className="fa fa-arrows-alt hover-box"
              />
            </div>
            <div
              id="preview"
              style={{
                backgroundColor: "#c0d8d8",
                height: this.state.isVisibleEditor ? "50vh" : "100vh",
                overflowY: "auto",
                border: "1px solid black",
                padding: 10,
              }}
              dangerouslySetInnerHTML={{
                __html: marked.parse(this.state.markdown),
              }}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<MarkDownPreviewrComponent />, document.getElementById("root"));
