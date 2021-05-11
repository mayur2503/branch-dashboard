const unmountScript = (id) => {
    const scriptList = document.querySelectorAll(
      "script[type='text/javascript']"
    );
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find((script) => script.id === id);
    testScript.parentNode.removeChild(testScript);
};

const loadScript = (src, id) => {
    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = src;
    script.id = id;
    document.body.appendChild(script);
  };


  export  const scriptHelper = {
    unmountScript,
    loadScript
  };
  