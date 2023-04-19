import React, { useState } from "react";
import "./App.css";
import QRious from "qrious";

type Memotype = {
  url: string;
};

export const App = () => {
  const [urlLink, setUrlLink] = useState<Memotype>({ url: "" });
  return (
    <div>
      <h1>QRコード生成</h1>
      <input
        type="text"
        value={urlLink.url}
        onChange={(event) => setUrlLink({ url: event.target.value })}
      ></input>
      {urlLink.url}
      <button>生成</button>
    </div>
  );
};
