import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import ServerInfoItem from "components/ServerInfoItem";
import MultiTabInput from "components/MultiTabInput";
import Grid from "components/Grid";
import { useMediaQuery } from "react-responsive";
import carImg from "assets/images/car.png";
import phoneImg from "assets/images/phone.png";

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

  const isBigScreen = useMediaQuery({ query: '(min-width: 1280px)' });

  const handleTabsChange = (newTabs) => {
    setTabs(newTabs);
  };

  // const onInputChange = (e) => {
  //   setJavaCode(e.target.value);
  // };

  const parseTabsToJson = () => {
    var idx = 1;
    const java_codes = tabs.reduce((acc, tab) => {
      const codeKey = `code${idx}`;
      acc[codeKey] = tab.javaCode;
      idx++;
      return acc;
    }, {});
    return java_codes;
  };

  const onExecute = () => {
    fetch("http://localhost:8000/execute_java_code/", {
      method: "POST",
      headers: {
        Authorization: `Bearer tokenhere`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ java_code: parseTabsToJson() }),
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

  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap"
    rel="stylesheet"
  ></link>;

  return (
    <div className="App">
      {!isBigScreen &&
        <div id="container-narrow">
          <header id="title">
            Green Algorithms
          </header>

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

          <article class="article" id="article-runtime">
            <p id="server_info">Execution Results</p>
            <div class="rowflex">
              <div class="colelem-1">
                <p>Execution Result</p>
                <ServerInfoItem>{message}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Elapsed Time</p>
                <ServerInfoItem>{serverInfo["Elapsed time"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Used Memory</p>
                <ServerInfoItem>{serverInfo["Used memory"]}</ServerInfoItem>
              </div>
              <div class="colelem-1 green">
                <p>Carbon Emission</p>
                <ServerInfoItem>{serverInfo["Carbon emission"]}</ServerInfoItem>
              </div>
            </div>
          </article>

          <article class="article" id="article-effect">
            <p id="server_info">It resembles to...</p>
            <div class="rowflex">
              <div class="colelem-1">
                <p>Cars</p>
                <ServerInfoItem>{serverInfo["Cars"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Phones</p>
                <ServerInfoItem>{serverInfo["Phones"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Air Conditioners</p>
                <ServerInfoItem>{serverInfo["Air conditioners"]}</ServerInfoItem>
              </div>
              <div class="colelem-1 green">
                <p>Trees</p>
                <ServerInfoItem>{serverInfo["Trees"]}</ServerInfoItem>
              </div>
            </div>
          </article>

          <article class="article" id="article-message">
            <p id="server_info">Server Message</p>
            <textarea id="server_message" readOnly></textarea>
          </article>

          <article class="article" id="article-extra">
            <p id="server_info">Extra Server Information</p>
            <div class="rowflex">
              <div class="colelem-1">
                <p>Logical CPU Cores</p>
                <ServerInfoItem>
                  {serverInfo["Total CPU cores (including logical)"]}
                </ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Physical CPU Cores</p>
                <ServerInfoItem>
                  {serverInfo["Physical CPU cores"]}
                </ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Maximum CPU Frequency</p>
                <ServerInfoItem>
                  {serverInfo["Maximum CPU frequency"]}
                </ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Total Memory</p>
                <ServerInfoItem>{serverInfo["Total memory"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Available Memory</p>
                <ServerInfoItem>{serverInfo["Available memory"]}</ServerInfoItem>
              </div>
            </div>
            <div class="rowflex">
              <div class="colelem-1">
                <p>City</p>
                <ServerInfoItem>{serverInfo["City"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>State</p>
                <ServerInfoItem>{serverInfo["State"]}</ServerInfoItem>
              </div>
              <div class="colelem-1">
                <p>Country</p>
                <ServerInfoItem>{serverInfo["Country"]}</ServerInfoItem>
              </div>
            </div>
          </article>
        </div>
      }

      {isBigScreen &&
        <div id="container-wide">
          <header id="title">
            Green Algorithms
          </header>

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
                  <ServerInfoItem>{message}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Elapsed Time</p>
                  <ServerInfoItem>{serverInfo["Elapsed time"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Used Memory</p>
                  <ServerInfoItem>{serverInfo["Used memory"]}</ServerInfoItem>
                </div>
                <div class="colelem-1 green">
                  <p>Carbon Emission</p>
                  <ServerInfoItem>{serverInfo["Carbon emission"]}</ServerInfoItem>
                </div>
              </div>
            </article>
            <article class="article colelem-1" id="article-effect">
              <p id="server_info">It resembles to...</p>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>Cars</p>
                  <img src={carImg}></img>
                  <ServerInfoItem>{serverInfo["Cars"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Phones</p>
                  <img src={phoneImg}></img>
                  <ServerInfoItem>{serverInfo["Phones"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Air Conditioners</p>
                  <ServerInfoItem>{serverInfo["Air conditioners"]}</ServerInfoItem>
                </div>
                <div class="colelem-1 green">
                  <p>Trees</p>
                  <ServerInfoItem>{serverInfo["Trees"]}</ServerInfoItem>
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
                  <ServerInfoItem>
                    {serverInfo["Total CPU cores (including logical)"]}
                  </ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Physical CPU Cores</p>
                  <ServerInfoItem>
                    {serverInfo["Physical CPU cores"]}
                  </ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Maximum CPU Frequency</p>
                  <ServerInfoItem>
                    {serverInfo["Maximum CPU frequency"]}
                  </ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Total Memory</p>
                  <ServerInfoItem>{serverInfo["Total memory"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Available Memory</p>
                  <ServerInfoItem>{serverInfo["Available memory"]}</ServerInfoItem>
                </div>
              </div>
              <div class="rowflex">
                <div class="colelem-1">
                  <p>City</p>
                  <ServerInfoItem>{serverInfo["City"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>State</p>
                  <ServerInfoItem>{serverInfo["State"]}</ServerInfoItem>
                </div>
                <div class="colelem-1">
                  <p>Country</p>
                  <ServerInfoItem>{serverInfo["Country"]}</ServerInfoItem>
                </div>
              </div>
            </article>
            <article class="article colelem-1" id="article-message">
              <p id="server_info">Server Message</p>
              <textarea id="server_message" readOnly></textarea>
            </article>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
