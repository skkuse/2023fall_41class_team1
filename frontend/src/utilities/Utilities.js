const parseTabsToJson = (tabs) => {
    var idx = 1;
    const java_codes = tabs.reduce((acc, tab) => {
      const codeKey = `code${idx}`;
      acc[codeKey] = tab.javaCode;
      idx++;
      return acc;
    }, {});
    return java_codes;
  };



export {parseTabsToJson}