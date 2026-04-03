import React from "react";
import { Link } from "react-router-dom";
function Cards() {
    return <div id="cards">
        <div id="heading">Algorithm Visualizer</div>
        <div id="container">
            <a href="/sorting-algo">
                <div id="card-Sorting">

                    <div className="card-img">
                        <img src="" alt="" />
                    </div>
                    <div className="card-content">
                        <h2>Sorting</h2>
                        <p>Visualization of some sorting Algorithms</p>
                    </div>

                </div>
            </a>
            <a href="/pathFinder-algo">
                <div id="card-Pathfinding">

                    <div className="card-img">
                        <img src="" alt="" />
                    </div>
                    <div className="card-content">
                        <h2>Path Finder and Maze Generators</h2>
                        <p>Visualization of Path Finding and Maze Generating Algorithms</p>
                    </div>

                </div>
            </a>
            <a href="">
                <div id="card-DsaAlgo">

                    <div className="card-img">
                        <img src="" alt="" />
                    </div>
                    <div className="card-content">
                        <h2>Data Structures and Algorithms</h2>
                        <p>Visualization of Algorithms related to the Data Structures</p>
                    </div>

                </div>
            </a>


        </div>
    </div>
}

export default Cards;