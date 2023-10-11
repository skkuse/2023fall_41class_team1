import React, { useRef, useState } from "react";
import "./MultiTabInput.css";
import Editor from "@monaco-editor/react";

function MultiTabInput(props) {

  const tabsRef = useRef(null);

  const scrollLeft = () => {
    tabsRef.current.scrollLeft -= 100;
  };

  const scrollRight = () => {
    tabsRef.current.scrollLeft += 100;
  };

  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newTab = {
      id: props.tabs[props.tabs.length - 1].id + 1,
      javaCode: "",
    };
    props.handleTabsChange([...props.tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const deleteTab = (id) => {
    const updatedTabs = props.tabs.filter((tab) => tab.id !== id);
    props.handleTabsChange(updatedTabs);
    if (updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0].id);
    }

  };


 const handleEditorChange = (id, value) => {
    const updatedTabs = props.tabs.map((tab) =>
      tab.id === id ? { ...tab, javaCode: value } : tab
    );
    props.handleTabsChange(updatedTabs);
    // If you want to lift the state up, you can pass updatedTabs to a parent component
    // props.handleTabsChange(updatedTabs);
  };

  return (
    <div className="multi-tab-input">
      <div className="tabs-container">
        <button onClick={scrollLeft}>&lt;</button>
        <div className="tabs" ref={tabsRef}>
          {props.tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              Tab {tab.id}
              <button onClick={() => deleteTab(tab.id)}>X</button>
            </div>
          ))}
          <button onClick={addTab}>+ Add Tab</button>
        </div>
        <button onClick={scrollRight}>&gt;</button>
      </div>


      <div className="input-container">
        {props.tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <Editor
                key={tab.id}
                defaultLanguage="java"
                value={tab.javaCode}
                onChange={(value, event) => handleEditorChange(tab.id, value)}
                height="30vh"
              ></Editor>
            )
        )}
      </div>
    </div>
  );
}

export default MultiTabInput;
