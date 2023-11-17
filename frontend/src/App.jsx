import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GridCell from "components/GridCell";
import MultiTabInput from "components/MultiTabInput";
import GridRow from "components/GridRow";
import TitleGrid from "components/TitleGrid";

import { useMediaQuery } from "react-responsive";
import { parseTabsToJson } from "utilities/Utilities";
import { fetchServerInfo, getExecutionResult } from "utilities/serverRequests";

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
  const [executionResult, setExecutionResult] = useState({
    status: "-",
    output: "-",
    runtime: "-",
    carbon_emission: "-",
    carbonEmissionMetrics: {},
  });
  const [serverInfo, setServerInfo] = useState({
    "Available memory": "-",
    City: "-",
    Country: "-",
    "Maximum CPU frequency": "-",
    "Physical CPU cores": "-",
    State: "-",
    "Total CPU cores (including logical)": "-",
    "Total memory": "-",
  });

  const handleTabsChange = (newTabs) => {
    setTabs(newTabs);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverInfo = await fetchServerInfo();
        setServerInfo(serverInfo);
      } catch (error) {
        console.error("Error in execution:", error);
      }
    };

    fetchData();
  }, []);

  const onExecute = async () => {
    try {
      const result = await getExecutionResult(tabs);
      setExecutionResult(result);
    } catch (error) {
      console.error("Error in execution:", error);
    }
  };

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
          {executionResult && (
            <TitleGrid title="Execution Results">
              <GridRow>
                <GridCell
                  title="Execution Result"
                  content={executionResult["status"]}
                ></GridCell>
                <GridCell
                  title="Elapsed Time"
                  content={executionResult["runtime"]}
                ></GridCell>
                <GridCell
                  title="Used Memory"
                  content="이거 없애야 되는거 아님?"
                ></GridCell>
                <GridCell
                  title="Carbon Emission"
                  content={executionResult["carbon_emission"]}
                ></GridCell>
              </GridRow>
            </TitleGrid>
          )}
          {executionResult &&
            executionResult["carbonEmissionMetrics"] !== {} && (
              <TitleGrid title="It resembles to...">
                <GridRow>
                  <GridCell
                    title="Cars"
                    imgURL={carImg}
                    content={
                      executionResult["carbonEmissionMetrics"][
                        "car_emission_equiv"
                      ]
                    }
                  ></GridCell>
                  <GridCell
                    title="Phones"
                    imgURL={phoneImg}
                    content={
                      executionResult["carbonEmissionMetrics"][
                        "phone_emission_equiv"
                      ]
                    }
                  ></GridCell>
                  <GridCell
                    title="Air Conditioners"
                    imgURL={acImg}
                    content={
                      executionResult["carbonEmissionMetrics"][
                        "air_conditioner_emission_equiv"
                      ]
                    }
                  ></GridCell>
                  <GridCell
                    title="Trees"
                    imgURL={treeImg}
                    content={
                      executionResult["carbonEmissionMetrics"][
                        "tree_emission_equiv"
                      ]
                    }
                  ></GridCell>
                </GridRow>
              </TitleGrid>
            )}

          {serverInfo && (
            <TitleGrid title="Extra Server Information">
              <GridRow>
                <GridCell
                  title="Total CPU cores (including logical)"
                  content={serverInfo["Total CPU cores (including logical)"]}
                ></GridCell>
                <GridCell
                  title="Physical CPU cores"
                  content={serverInfo["Physical CPU cores"]}
                ></GridCell>
                <GridCell
                  title="Maximum CPU frequency"
                  content={serverInfo["Maximum CPU frequency"]}
                ></GridCell>
                <GridCell
                  title="Total memory"
                  content={parseFloat(serverInfo["Total memory"]).toFixed(2)}
                ></GridCell>
                <GridCell
                  title="Available memory"
                  content={parseFloat(serverInfo["Available memory"]).toFixed(
                    2
                  )}
                ></GridCell>
              </GridRow>
              <GridRow>
                <GridCell title="City" content={serverInfo["City"]}></GridCell>
                <GridCell
                  title="State"
                  content={serverInfo["State"]}
                ></GridCell>
                <GridCell
                  title="Country"
                  content={serverInfo["Country"]}
                ></GridCell>
              </GridRow>
            </TitleGrid>
          )}

          <TitleGrid title="Server Message">
            <textarea id="server_message" readOnly></textarea>
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
