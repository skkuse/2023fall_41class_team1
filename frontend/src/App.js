import "./App.css";
import { useEffect, useState } from "react";

// interface serverInfoI {
//   "Available memory": string;
//   City: string;
//   Country: string;
//   "Maximum CPU frequency": number;
//   "Physical CPU cores": number;
//   State: string;
//   "Total CPU cores (including l,ogical)": number;
//   "Total memory": number;
// }

function App() {
  const [javaCode ,setJavaCode]= useState(`public class TempJava {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
      }
    }`)
  const [message, setMessage] = useState("");
  const [serverInfo, setServerInfo] = useState( {
    "Available memory": "",
    City:"",
    Country: "",
    "Maximum CPU frequency": "",
    "Physical CPU cores": "",
    State: "",
    "Total CPU cores (including l,ogical)": "",
    "Total memory": ""
  });

 const onInputChange=(e)=>{
    setJavaCode(e.target.value)
  }
  const onExecute=()=>{
    fetch("http://localhost:8000/execute_java_code/", {
      method: "POST",
      headers: {
        Authorization: `Bearer tokenhere`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ java_code: javaCode }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response.server_info['State']);
        setMessage(response.output);
        setServerInfo(response.server_info)
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="App">
      <header className="App-header">
        ㅋㄷ 
        <textarea
        value={javaCode}
        onChange={onInputChange}
        rows="4"
        cols="50"
        style={{width: '400px', height: '100px', overflow: 'auto' }}/>
        <button onClick= {onExecute}>Compile</button>
        <br/>
        execution result : {message}<br/><br/>
        Total memory : {serverInfo['Total memory']}<br/>
        Available memory : {serverInfo['Available memory']}<br/>
        Total CPU cores (including logical) : {serverInfo['Total CPU cores (including logical)']}<br/>
        Maximum CPU frequency : {serverInfo['Maximum CPU frequency']}<br/>
        Physical CPU cores : {serverInfo['Physical CPU cores']}<br/>
        Country : {serverInfo['Country']}<br/>
        City : {serverInfo['City']}<br/>
        State : {serverInfo['State']}<br/>
      </header>
    </div>
  );
}

export default App;
