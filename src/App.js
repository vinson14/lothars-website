import { useEffect, useState } from "react";
import "./App.css";
import background from "./static/images/background.jpg";
import backgroundMobile from "./static/images/background-mobile.jpg";
import GetData from "./GetData";

function App() {
    // Hooks
    const [distance, setDistance] = useState("Loading...");
    const [addDistance, setAddDistance] = useState(false);
    const [bg, setBg] = useState(background);

    // Setting background
    let style = { backgroundImage: `url(${bg})` };

    // handle bg for window size
    const handleWindowResize = () => {
        if (window.innerWidth < 768) {
            console.log(window.innerWidth)
            setBg(backgroundMobile);
        } else {
            setBg(background);
        }
    };

    // Event listener for window innerwidth
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
    });

    // Use effect hooks
    useEffect(() => {
        const getData = new GetData();
        getData
            .load()
            .then(() => getData.totalDistance())
            .then((response) => setDistance(`${response}km`));
    });

    const handleSubmit = () => {
        setDistance("Loading...");
        const getData = new GetData();
        getData
            .load()
            .then(() => {
                getData.addDistance(addDistance);
            })
            .then((response) => setDistance(response))
            .then(setAddDistance(""));
    };

    const handleChange = (event) => {
        setAddDistance(event.target.value);
    };

    return (
        <div className="App" style={style}>
            <div className="container mt-5">
                <div className="row justify-content-center main-content">
                    <div className="col col-md-6 p-3">
                        <h1 className="mb-5 pri-font">Lothars Goes Cycling</h1>
                        <h4 className="pri-font">
                            Total Journey <br /> {distance}
                        </h4>
                    </div>
                    <div className="col-12">
                        <input
                            placeholder="Distance"
                            type="number"
                            value={addDistance}
                            onChange={handleChange}
                            className="bg-transparent border-top-0 border-left-0 border-right-0 border-bottom border-dark pri-font text-center"
                        />
                    </div>
                    <div className="col-12 py-4">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-outline-dark pri-font"
                        >
                            Add distance
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center"></div>
            </div>
        </div>
    );
}

export default App;
