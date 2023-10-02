import "./App.css";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


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
  var message1 = "hello";
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

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };

  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" rel="stylesheet"></link>

  return (
    <div className="App">
      <header>
        <div id="container">

          <div id="title">
           <strong>Green Algorithm</strong>
          </div>

          <div id="input_code">
           <strong>Enter Code</strong><br/><br/>
           <textarea id="textbox"
           value={javaCode}
           onChange={onInputChange}
           rows="4"
           cols="50"
           style={{width: '80%', height: '50%', overflow: 'auto' }}/><br/>
           <Button variant="outlined" onClick= {onExecute}>Compile</Button>
          </div>

          <div id="server">
          <strong id="server_info">Server Information</strong><br/><br/>
           <div id="detail">
           <p>execution result</p>
           <Item>{message}</Item>
           <p>Total memory</p>
           <Item>{serverInfo['Total memory']}</Item>
           <p>Available memory</p>
           <Item>{serverInfo['Available memory']}</Item>
           <p>Total CPU cores (including logical)</p>
           <Item>{serverInfo['Total CPU cores (including logical)']}</Item>
           <p>Maximum CPU frequency</p>
           <Item>{serverInfo['Maximum CPU frequency']}</Item>
           <p>Physical CPU cores</p>
           <Item>{serverInfo['Physical CPU cores']}</Item>
           <p>Country</p>
           <Item>{serverInfo['Country']}</Item>
           <p>City</p>
           <Item>{serverInfo['City']}</Item>
           <p>State</p>
           <Item>{serverInfo['State']}</Item>
           </div>
          </div>

          <div id="information">
          <strong>Information</strong>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
