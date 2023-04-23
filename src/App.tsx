import React, { useState, useRef } from 'react';
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
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const svgRef = useRef<any>(null);
  const qrcode = encodeData({ text: 'react-qrbtf' });

  //QRコード生成
  const generateQrCode = () => {
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
  const downloadQrCode = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      setDownloadUrl(svgUrl);
    }
  };

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
        <a
          className="btn btn-secondary"
          download="qr-code.svg"
          href={downloadUrl}
          onClick={downloadQrCode}
          style={{
            height: 'auto',
            padding: '20',
            maxWidth: 200,
          }}
        >
          ダウンロード
        </a>
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
        <div ref={svgRef}>
          {/* <QRCode size={256} style={{ height: 'auto', maxWidth: '100%', width: '100%' }} value={urlLink.url} viewBox={`0 0 256 256`} /> */}
          {/* <QRNormal qrcode={qrcode} />
        <QRDsj qrcode={qrcode} />
        <QRBubble qrcode={qrcode} /> */}
          <QR25D value={urlLink.url} />
        </div>
        {/* <QRResImage qrcode={qrcode} image="./img/nihonchizu-hakuchizu.png" /> */}
      </div>
    </div>
  );
};
