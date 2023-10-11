import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

import ServerInfoItem from "components/ServerInfoItem";
import MultiTabInput from "components/MultiTabInput";

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
      <header>
        <div id="container">
          <div id="title">
            Green Algorithms
          </div>

          <div id="input_code">
            <p>Enter Code</p>
            <MultiTabInput
              tabs={tabs}
              handleTabsChange={handleTabsChange}
            ></MultiTabInput>
            <Button class="tab" onClick={onExecute}>
              Compile
            </Button>
          </div>

          <div class="rowflex">
            <div class="colelem-2" id="server">
              <p id="server_info">Server Information</p>
              <div id="detail">
                <p>execution result</p>
                <ServerInfoItem>{message}</ServerInfoItem>
                <p>Total memory</p>
                <ServerInfoItem>{serverInfo["Total memory"]}</ServerInfoItem>
                <p>Available memory</p>
                <ServerInfoItem>{serverInfo["Available memory"]}</ServerInfoItem>
                <p>Total CPU cores (including logical)</p>
                <ServerInfoItem>
                  {serverInfo["Total CPU cores (including logical)"]}
                </ServerInfoItem>
                <p>Maximum CPU frequency</p>
                <ServerInfoItem>
                  {serverInfo["Maximum CPU frequency"]}
                </ServerInfoItem>
                <p>Physical CPU cores</p>
                <ServerInfoItem>
                  {serverInfo["Physical CPU cores"]}
                </ServerInfoItem>
                <p>Country</p>
                <ServerInfoItem>{serverInfo["Country"]}</ServerInfoItem>
                <p>City</p>
                <ServerInfoItem>{serverInfo["City"]}</ServerInfoItem>
                <p>State</p>
                <ServerInfoItem>{serverInfo["State"]}</ServerInfoItem>
              </div>
            </div>
            <div class="colelem-3 colflex" id="information">
              <p>Server Message</p>
              <textarea id="server_message" readOnly></textarea>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
