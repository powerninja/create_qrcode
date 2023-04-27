import { useRef } from 'react';
import './App.css';
import { useQRCodeHandler } from './hooks/useQRCodeHandler';

//QRコード生成ライブラリ https://github.com/ciaochaos/qrbtf
import { QR25D, QRRandRect, QRBubble, QRDsj, QRNormal, QRFunc, QRLine } from 'react-qrbtf';

export const App = () => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  //カスタムhook呼び出し
  const {
    setInputUrl,
    generateQrCode,
    clearQrCode,
    downloadQrCode,
    visible,
    downloadButton,
    qrCodebgColor,
    selectedQrCode,
    downloadUrl,
    setQrcodeStyle,
    urlLink,
  } = useQRCodeHandler();

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
          onChange={(event) => {
            setInputUrl(event.target.value);
          }}
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
          className={downloadButton}
          download="qr-code.jpg"
          href={downloadUrl}
          onClick={() => downloadQrCode(svgRef)}
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
          maxWidth: 800,
          width: '100%',
          padding: '5px',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <div className="d-flex flex-row">
          <div id="1" className="my-box w-25" onClick={() => setQrcodeStyle(0)} style={{ padding: '1px', border: qrCodebgColor.color0 }}>
            <QRNormal value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(1)} style={{ padding: '1px', border: qrCodebgColor.color1 }}>
            <QRDsj value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(2)} style={{ padding: '1px', border: qrCodebgColor.color2 }}>
            <QRBubble value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(3)} style={{ padding: '1px', border: qrCodebgColor.color3 }}>
            <QR25D value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(4)} style={{ padding: '1px', border: qrCodebgColor.color4 }}>
            <QRRandRect value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(5)} style={{ padding: '1px', border: qrCodebgColor.color5 }}>
            <QRFunc value={urlLink.url} funcType={'B'} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(6)} style={{ padding: '1px', border: qrCodebgColor.color6 }}>
            <QRLine value={urlLink.url} />
          </div>
        </div>
        <div ref={svgRef}>{selectedQrCode}</div>
      </div>
    </div>
  );
};
