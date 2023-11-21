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
      console.log(result);
      if (result.status === "Failed") {
        alert("컴파일중 오류가 발생했습니다. 코드를 다시 입력해주세요.\n에러 메시지 : " + result.detail)
        return;
      } else {
        setExecutionResult(result);
      }
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
                  title="Carbon Emission"
                  content={executionResult["carbon_emission"]}
                ></GridCell>
              </GridRow>
              <GridRow>
                <GridCell
                  title="Execution Result"
                  content={executionResult["status"]}
                ></GridCell>
                <GridCell
                  title="Elapsed Time"
                  content={executionResult["runtime"]}
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

          <TitleGrid title="Extra Server Information">
            <GridRow>
              <GridCell
                title="Total CPU cores (including logical)"
                content={
                  serverInfo
                    ? serverInfo["Total CPU cores (including logical)"]
                    : "-"
                }
              ></GridCell>
              <GridCell
                title="Physical CPU cores"
                content={serverInfo ? serverInfo["Physical CPU cores"] : "-"}
              ></GridCell>
              <GridCell
                title="Maximum CPU frequency"
                content={serverInfo ? serverInfo["Maximum CPU frequency"] : "-"}
              ></GridCell>
              <GridCell
                title="Total memory"
                content={
                  serverInfo
                    ? parseFloat(serverInfo["Total memory"]).toFixed(2)
                    : "-"
                }
              ></GridCell>
              <GridCell
                title="Available memory"
                content={
                  serverInfo
                    ? parseFloat(serverInfo["Available memory"]).toFixed(2)
                    : "-"
                }
              ></GridCell>
            </GridRow>
            <GridRow>
              <GridCell
                title="City"
                content={serverInfo ? serverInfo["City"] : "-"}
              ></GridCell>
              <GridCell
                title="State"
                content={serverInfo ? serverInfo["State"] : "-"}
              ></GridCell>
              <GridCell
                title="Country"
                content={serverInfo ? serverInfo["Country"] : "-"}
              ></GridCell>
            </GridRow>
          </TitleGrid>

          <TitleGrid title="Server Message">
            <textarea id="server_message" readOnly></textarea>
          </TitleGrid>
        </div>
      </div>
    </div>
  );
}

export default App;
