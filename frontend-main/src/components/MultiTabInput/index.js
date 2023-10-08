import React, { useState } from 'react';
import './MultiTabInput.css';

function MultiTabInput(props) {
  const [activeTab, setActiveTab] = useState(1);

  const addTab = () => {
    const newTab = { id:props.tabs[props.tabs.length - 1].id + 1, javaCode: '' };
    props.handleTabsChange([...props.tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const deleteTab = (id) => {
    const updatedTabs = props.tabs.filter(tab => tab.id !== id);
    props.handleTabsChange(updatedTabs);
    if (updatedTabs.length > 0) {
      setActiveTab(updatedTabs[0].id);
    }
  };

  const handleTextChange = (id, javaCode) => {
    const updatedTabs = props.tabs.map(tab => (tab.id === id ? { ...tab, javaCode } : tab));
    props.handleTabsChange(updatedTabs);
  };

  return (
    <div className="multi-tab-input">
      <div className="tabs">
        {props.tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            Tab {tab.id}
            <button onClick={() => deleteTab(tab.id)}>X</button>
          </div>
        ))}
        <button onClick={addTab}>+ Add Tab</button>
      </div>
      <div className="input-container">
        {props.tabs.map(
          tab =>
            tab.id === activeTab && (
              <textarea
                key={tab.id}
                value={tab.javaCode}
                onChange={e => handleTextChange(tab.id, e.target.value)}
              />
            )
        )}
      </div>
    </div>
  );
}

export default MultiTabInput;
