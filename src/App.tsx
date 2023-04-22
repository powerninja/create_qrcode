import React, { useState } from 'react';
import './App.css';
import QRCode from 'react-qr-code';
import { QR25D, QRResImage, QRBubble, QRDsj, QRNormal } from 'react-qrbtf';
import { encodeData } from 'react-qrbtf';
import { Button } from 'react-bootstrap';

type Memotype = {
  url: string;
};

export const App = () => {
  const [urlLink, setUrlLink] = useState<Memotype>({ url: '' });
  const [visible, setVisible] = useState<boolean>(false);
  const qrcode = encodeData({ text: 'react-qrbtf' });

  //QRコード生成
  const generateQrCode = () => {
    console.log(urlLink.url.indexOf('http', 0));
    if (urlLink.url.indexOf('http', 0) === -1) {
      alert('URLを入力してください');
      return;
    }
    setVisible(true);
  };

  //表示していたQRコードを非表示
  const clearQrCode = () => {
    setVisible(false);
    setUrlLink({ url: '' });
  };

  //生成したQRコードをダウンロード
  const downloadQrCode = () => {};

  return (
    <div>
      <div
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 300,
          width: '100%',
        }}
      >
        <h1>QRコード作成</h1>

        <p>URLを入力してください</p>
      </div>
      <div
        className="input-group mb-3"
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 300,
          width: '100%',
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="https://example.com"
          aria-describedby="basic-addon2"
          value={urlLink.url}
          onChange={(event) => setUrlLink({ url: event.target.value })}
        />
      </div>

      <div className="button-container">
        <button
          className="btn btn-primary ms-3"
          onClick={generateQrCode}
          style={{
            height: 'auto',
            padding: '20',
            maxWidth: 200,
          }}
        >
          生成
        </button>
        <button
          className="btn btn-danger"
          onClick={clearQrCode}
          style={{
            height: 'auto',
            padding: '20',
            maxWidth: 200,
          }}
        >
          クリア
        </button>
        <button
          className="btn btn-secondary"
          onClick={downloadQrCode}
          style={{
            height: 'auto',
            padding: '20',
            maxWidth: 200,
          }}
        >
          ダウンロード
        </button>
      </div>

      <div
        style={{
          height: 'auto',
          margin: '0 auto',
          maxWidth: 200,
          width: '100%',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        {/* <QRCode size={256} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={urlLink.url} viewBox={`0 0 256 256`} /> */}
        {/* <QRNormal qrcode={qrcode} />
        <QRDsj qrcode={qrcode} />
        <QRBubble qrcode={qrcode} /> */}
        <QR25D value={urlLink.url} />
        {/* <QRResImage qrcode={qrcode} image="./img/nihonchizu-hakuchizu.png" /> */}
      </div>
    </div>
  );
};
