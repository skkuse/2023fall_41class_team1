import { parseTabsToJson } from "utilities/Utilities";

export const fetchServerInfo = async () => {
  try {
    const response = await fetch("http://localhost:8000/get_system_info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer tokenhere`,
        // Removed "Content-Type" as it's not necessary for GET requests
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    // Consider how to handle this error in the caller function, possibly rethrow or return a specific error response
  }
};

export const getExecutionResult = async (tabs) => {
    try {
        const response = await fetch("http://localhost:8000/execute_java_code/", {
          method: "POST",
          headers: {
            Authorization: `Bearer tokenhere`, // Ensure this token is dynamically set as per your application's authentication mechanism
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ java_code: parseTabsToJson(tabs) }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const responseData = await response.json();
        
        return responseData
        // setMessage(responseData.output);
        // setServerInfo(responseData.server_info);
      } catch (error) {
        console.error("Error:", error);
        // Consider additional error handling or user feedback here
      }
  };