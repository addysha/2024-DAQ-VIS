import "./App.css";
import Typewriter from "./components/TypeWriter.tsx";
import BurgerMenu from "./components/BurgerMenu.tsx";

const typeWriter = ["University", "Engineers", "Students"];

function App() {
  return (
    <div className="App">
      <div className="background">
        <div className="navbar">
          <div className="nav-left">
            <p id="logo">
              <img id="imgLogo" src={require(".//images/WESMOLogo.png")} />
            </p>
            <div className="nav-links">
              {/* <a href="http://wesmo.co.nz:3000/d/b650f98e-4928-4a23-adf2-079c04161405/bms?orgId=1&refresh=1s">BMS</a>
                      <a href="http://wesmo.co.nz:3000/d/c0e07de0-8a8c-4cb4-8763-9ec002a0e1bf/vcu?orgId=1&refresh=1s">VCU</a> */}
              <a href="#">Sponsors</a>
            </div>
          </div>
          <div className="nav-right">
            <a id="rightButtonNav" href="#">
              Engineering Team
            </a>

            <BurgerMenu />

            <div className="nav-right"></div>
          </div>
        </div>
        <div id="mainTitle">
          <div id="year">2024</div>
          <h1 className="text-3xl font-bold underline">
            Support Your Local
            <Typewriter data={typeWriter} />
            With WESMO
          </h1>
          <a href="https://youtu.be/xvFZjo5PgG0">
            <div href="#" id="subTitle">
              FIND OUT MORE{" "}
            </div>
          </a>
        </div>
      </div>{" "}
    </div>
  );
}

export default App;
