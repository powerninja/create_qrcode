import React, { useState } from "react";
import "./App.css";
import QRCode from "react-qr-code";
import { QR25D, QRResImage, QRBubble, QRDsj, QRNormal } from "react-qrbtf";
import { encodeData } from "react-qrbtf";
import { Button } from "react-bootstrap";

type Memotype = {
  url: string;
};

export const App = () => {
  const [urlLink, setUrlLink] = useState<Memotype>({ url: "" });
  const [visible, setVisible] = useState<boolean>(false);
  const qrcode = encodeData({ text: "react-qrbtf" });

  const generateQrCode = () => {
    setVisible(true);
  };

  const clearQrCode = () => {
    setVisible(false);
    setUrlLink({ url: "" });
  };

  return (
    <div>
      <h1>QRコード生成</h1>
      <input
        type="text"
        value={urlLink.url}
        onChange={(event) => setUrlLink({ url: event.target.value })}
      ></input>
      <button onClick={generateQrCode}>生成</button>
      <button onClick={clearQrCode}>クリア</button>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 200,
          width: "100%",
          visibility: visible ? "visible" : "hidden",
        }}
      >
        {/* <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={urlLink.url}
          viewBox={`0 0 256 256`}
        />
        <QRNormal qrcode={qrcode} />
        <QRDsj qrcode={qrcode} />
        <QRBubble qrcode={qrcode} /> */}
        <QR25D value={urlLink.url} />
        {/* <QRResImage qrcode={qrcode} image="./img/nihonchizu-hakuchizu.png" /> */}
      </div>
    </div>
  );
};
