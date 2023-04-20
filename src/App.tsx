import React, { useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";

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
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={urlLink.url}
          viewBox={`0 0 256 256`}
        />
      </div>
    </div>
  );
};
