import './App.css';
import axios from 'axios';

import React, {useEffect, useState} from "react";

/**
 * @return {boolean}
 */
function App() {

    const [isRequest, setIsRequest] = useState(false);
    const [text, setText] = useState("");
    const [json, setJson] = useState({});
    const host = "http://localhost:8080";
    const url = `${host}/api/sample?text=${text}`;
    useEffect( () => {
        if (!isRequest) return;
        setIsRequest(false);
        //ここを変えて！！！
        (async() => {
            const result = await axios.get(url);
            console.log(result.data);
            setJson(result.data);
        })();


    },[isRequest]);

    const onClick = () => {
        setIsRequest(true);
    };

    return (
        <div>
          <div>Hello Hack Marathon</div>
          <input value={text} onChange={ (e) => setText(() => e.target.value)}/>
          <input type={"button"} value={"API REQUEST !!"} onClick={onClick}/>
          <div>json:{JSON.stringify(json)}</div>
        </div>
  );
}

export default App;
