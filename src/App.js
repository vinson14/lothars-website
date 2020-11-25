import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import background from "./static/images/background.jpg";
import backgroundMobile from "./static/images/background-mobile.jpg";
import GetData from "./GetData";
import Navbar from "./Navbar";

function App() {
    // Hooks
    const [distance, setDistance] = useState("Loading...");
    const [addDistance, setAddDistance] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [rows, setRows] = useState([]);

    // Setting background
    let style = {
        backgroundImage: `url(${isMobile ? backgroundMobile : background})`,
    };

    // handle bg for window size
    const handleWindowResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    // Event listener for window innerwidth
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [isMobile]);

    // Use effect hooks
    useEffect(() => {
        console.log("use effect runs");
        const getData = new GetData();
        getData
            .load()
            .then(() => getData.totalDistance())
            .then((response) => {
                setDistance(`${response.totalDistance}km`);
                setRows(response.rows.sort((a, b) => a.date < b.date));
            });
    }, [distance]);

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
        <Router basename="/">
            <div className="App" style={style}>
                <Navbar isMobile={isMobile} />
                <div className="container mt-5">
                    <div className="row justify-content-center main-content">
                        <div className="col col-md-6 p-3">
                            <h1 className="mb-5 pri-font">
                                Lothars Goes Cycling
                            </h1>
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
                        <Switch>
                            <Route path="/log">
                                <div className="col-12 py-4">
                                    <table className="table pri-font">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="pri-font"
                                                >
                                                    Date
                                                </th>
                                                <th scope="col">Distance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row) => (
                                                <tr key={row.date}>
                                                    <td>{row.date}</td>
                                                    <td>{row.distance}km</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
