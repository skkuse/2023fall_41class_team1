import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import GridCell from "components/GridCell";
import MultiTabInput from "components/MultiTabInput";
import GridRow from "components/GridRow";
import TitleGrid from "components/TitleGrid";
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
    carbonEmissionMetrics: {
      car_emission_equiv: "-",
      phone_emission_equiv: "-",
      air_conditioner_emission_equiv: "-",
      tree_emission_equiv: "-",
    },
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
            className="custom-tab"
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
                  content={executionResult["carbon_emission"].toFixed(6)}
                  unit="gCO2"
                ></GridCell>
              </GridRow>
              <GridRow>
                <GridCell
                  title="Execution Result"
                  content={executionResult["status"]}
                ></GridCell>
                <GridCell
                  title="Elapsed Time"
                  content={executionResult["runtime"].toFixed(6)}
                  unit="s"
                ></GridCell>
              </GridRow>
            </TitleGrid>
          )}
          {!executionResult && (
            <TitleGrid title="Results Not Available">
            </TitleGrid>
          )}

          {executionResult && (
            <TitleGrid title="It resembles to...">
              <GridRow>
                <GridCell
                  title="A car travel"
                  imgurl={carImg}
                  content={
                    (executionResult["carbonEmissionMetrics"][
                      "car_emission_equiv"
                    ] * 1000).toFixed(6)
                  }
                  unit="m"
                ></GridCell>
                <GridCell
                  title="A phone charge"
                  imgurl={phoneImg}
                  content={
                    (executionResult["carbonEmissionMetrics"][
                      "phone_emission_equiv"
                    ] * 100).toFixed(6)
                  }
                  unit="%"
                ></GridCell>
                <GridCell
                  title="An air conditioner run"
                  imgurl={acImg}
                  content={
                    (executionResult["carbonEmissionMetrics"][
                      "air_conditioner_emission_equiv"
                    ] * 3600).toFixed(6)
                  }
                  unit="s"
                ></GridCell>
                <GridCell
                  title="A tree absorb carbon"
                  imgurl={treeImg}
                  content={
                    (executionResult["carbonEmissionMetrics"][
                      "tree_emission_equiv"
                    ] * 30 * 24 * 3600).toFixed(6)
                  }
                  unit="s"
                ></GridCell>
              </GridRow>
            </TitleGrid>
          )}
          {!executionResult && (
            <TitleGrid title="Results Not Available">
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
                unit="MHz"
              ></GridCell>
              <GridCell
                title="Total memory"
                content={
                  serverInfo
                    ? parseFloat(serverInfo["Total memory"]).toFixed(2)
                    : "-"
                }
                unit="GiB"
              ></GridCell>
              <GridCell
                title="Available memory"
                content={
                  serverInfo
                    ? parseFloat(serverInfo["Available memory"]).toFixed(2)
                    : "-"
                }
                unit="GiB"
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
            <textarea id="server_message" value={ executionResult["output"]} readOnly ></textarea>
          </TitleGrid>
        </div>
      </div>
    </div>
  );
}

export default App;
