import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GridCell from "components/GridCell";
import MultiTabInput from "components/MultiTabInput";
import GridRow from "components/GridRow";
import TitleGrid from "components/TitleGrid";

import { useMediaQuery } from "react-responsive";
import { parseTabsToJson } from "utilities/Utilities";

import carImg from "assets/images/car.png";
import phoneImg from "assets/images/phone.png";
import acImg from "assets/images/AC.png";
import treeImg from "assets/images/tree.png";

function App() {
  const [tabs, setTabs] = useState([{ id: 1, javaCode: "" }]);

  // const [javaCode, setJavaCode] = useState(`public class TempJava {
  //   public static void main(String[] args) {
  //       System.out.println("Hello from Java!");
  //     }
  //   }`);
  const [message, setMessage] = useState("");
  const [serverInfo, setServerInfo] = useState({
    "Available memory": "",
    City: "",
    Country: "",
    "Maximum CPU frequency": "",
    "Physical CPU cores": "",
    State: "",
    "Total CPU cores (including logical)": "",
    "Total memory": "",
  });

  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });

  const handleTabsChange = (newTabs) => {
    setTabs(newTabs);
  };

  // const onInputChange = (e) => {
  //   setJavaCode(e.target.value);
  // };

  const onExecute = () => {
    fetch("http://localhost:8000/execute_java_code/", {
      method: "POST",
      headers: {
        Authorization: `Bearer tokenhere`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ java_code: parseTabsToJson(tabs) }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setMessage(response.output);
        setServerInfo(response.server_info);
      })
      .catch((error) => console.error("Error:", error));
  };

  // useEffect(()=>{
  //   fetch("http://localhost:8000/get_system_info/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer tokenhere`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((response) => {
  //       setServerInfo(response.server_info);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // },[]);

  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
    rel="stylesheet"
  ></link>;

  return (
    <div className="App">
      <div id="container-narrow">
        <header id="title">Green Algorithms</header>

        <nav id="input_code">
          <p>Enter Code</p>
          <MultiTabInput
            tabs={tabs}
            handleTabsChange={handleTabsChange}
            class="custom-tab"
          ></MultiTabInput>
          <Button class="tab" onClick={onExecute}>
            Compile
          </Button>
        </nav>

        <div id="result-panel">
          <TitleGrid title="Execution Results">
            <GridRow>
              <GridCell title="Execution Result"></GridCell>
              <GridCell title="Elapsed Time"></GridCell>
              <GridCell title="Used Memory" content="asdasd"></GridCell>
              <GridCell title="Carbon Emission"></GridCell>
            </GridRow>
          </TitleGrid>


          <TitleGrid title="It resembles to...">
            <GridRow>
              <GridCell title="Cars" imgURL={carImg}></GridCell>
              <GridCell title="Phones" imgURL={phoneImg}></GridCell>
              <GridCell title="Air Conditioners" imgURL={acImg}></GridCell>
              <GridCell title="Trees" imgURL={treeImg}></GridCell>
            </GridRow>
          </TitleGrid>

          <TitleGrid title="Server Message">
            <textarea id="server_message" readOnly></textarea>
          </TitleGrid>

          <TitleGrid title="Extra Server Information">
            <GridRow>
              <GridCell title="Total CPU cores (including logical)"></GridCell>
              <GridCell title="Physical CPU cores"></GridCell>
              <GridCell
                title="Maximum CPU frequency"
                content="asdasd"
              ></GridCell>
              <GridCell title="Total memory"></GridCell>
              <GridCell title="Available memory"></GridCell>
            </GridRow>
            <GridRow>
              <GridCell title="City"></GridCell>
              <GridCell title="State"></GridCell>
              <GridCell title="Country" content="asdasd"></GridCell>
            </GridRow>
          </TitleGrid>
        </div>
      </div>
      {/* {isBigScreen && (
        <div id="container-wide">
          <header id="title">Green Algorithms</header>

          <nav id="input_code">
            <p>Enter Code</p>
            <MultiTabInput
              tabs={tabs}
              handleTabsChange={handleTabsChange}
            ></MultiTabInput>
            <Button class="tab" onClick={onExecute}>
              Compile
            </Button>
          </nav>

          <div class="rowflex">
            <article class="article colelem-1" id="article-runtime">
              <p id="server_info">Execution Results</p>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>Execution Result</p>
                  <GridCell>{message}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Elapsed Time</p>
                  <GridCell>{serverInfo["Elapsed time"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Used Memory</p>
                  <GridCell>{serverInfo["Used memory"]}</GridCell>
                </div>
                <div class="colelem-1 green">
                  <p>Carbon Emission</p>
                  <GridCell>{serverInfo["Carbon emission"]}</GridCell>
                </div>
              </div>
            </article>

            <article class="article colelem-1" id="article-effect">
              <p id="server_info">It resembles to...</p>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>Cars</p>
                  <img src={carImg} className="rounded-image"></img>
                  <GridCell>{serverInfo["Cars"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Phones</p>
                  <img src={phoneImg} className="rounded-image"></img>
                  <GridCell>{serverInfo["Phones"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Air Conditioners</p>
                  <img src={acImg} className="rounded-image"></img>
                  <GridCell>{serverInfo["Air conditioners"]}</GridCell>
                </div>
                <div class="colelem-1 green">
                  <p>Trees</p>
                  <img src={treeImg} className="rounded-image"></img>
                  <GridCell>{serverInfo["Trees"]}</GridCell>
                </div>
              </div>
            </article>
          </div>

          <div class="rowflex">
            <article class="article colelem-1" id="article-extra">
              <p id="server_info">Extra Server Information</p>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>Logical CPU Cores</p>
                  <GridCell>
                    {serverInfo["Total CPU cores (including logical)"]}
                  </GridCell>
                </div>
                <div class="colelem-1">
                  <p>Physical CPU Cores</p>
                  <GridCell>{serverInfo["Physical CPU cores"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Maximum CPU Frequency</p>
                  <GridCell>{serverInfo["Maximum CPU frequency"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Total Memory</p>
                  <GridCell>{serverInfo["Total memory"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Available Memory</p>
                  <GridCell>{serverInfo["Available memory"]}</GridCell>
                </div>
              </div>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>City</p>
                  <GridCell>{serverInfo["City"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>State</p>
                  <GridCell>{serverInfo["State"]}</GridCell>
                </div>
                <div class="colelem-1">
                  <p>Country</p>
                  <GridCell>{serverInfo["Country"]}</GridCell>
                </div>
              </div>
            </article>

            <article class="article colelem-1" id="article-message">
              <p id="server_info">Server Message</p>
              <textarea id="server_message" readOnly></textarea>
            </article>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default App;
