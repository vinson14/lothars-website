import "./App.css";
import bg from "./static/images/background.jpg";

function App() {
    let style = { backgroundImage: `url(${bg})` };

    return <div className="App" style={style}>
        <div className="container h-50 bg-white">
            <div className="row">
                <div className="col">
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    </div>;
}

export default App;
