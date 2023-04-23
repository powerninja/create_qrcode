import React, { useState, useRef } from 'react';
import './App.css';

//QRコード生成ライブラリ https://github.com/ciaochaos/qrbtf
import { QR25D, QRResImage, QRBubble, QRDsj, QRNormal } from 'react-qrbtf';

//SVGを画像に変換するライブラリ https://github.com/canvg/canvg
import { Canvg } from 'canvg';

type Linktype = {
  url: string;
};

export const App = () => {
  const [urlLink, setUrlLink] = useState<Linktype>({ url: '' });
  const [visible, setVisible] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const svgRef = useRef<HTMLDivElement | null>(null);

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
  const downloadQrCode = async () => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg');

      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // SVG要素の大きさに合わせてキャンバスサイズを設定する
          const svgWidth = svgElement.viewBox.baseVal.width;
          const svgHeight = svgElement.viewBox.baseVal.height;

          // 解像度設定
          const scale = 10;

          canvas.width = svgWidth * scale;
          canvas.height = svgHeight * scale;

          // stringをDocumentに型変換
          const parser = new DOMParser();
          const svgDocument = parser.parseFromString(svgData, 'image/svg+xml');
          // canvg を使ってSVGデータをcanvasに描画
          const canvgInstance = new Canvg(ctx, svgDocument);
          await canvgInstance.start();

          const pngUrl = canvas.toDataURL('image/png');
          setDownloadUrl(pngUrl);
        }
      } else {
        console.error('CanvasRenderingContext2D could not be created.');
      }
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
          download="qr-code.jpg"
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
          {/* <QRNormal qrcode={qrcode} />
        <QRDsj qrcode={qrcode} />
        <QRBubble qrcode={qrcode} /> */}
          <QRNormal value={urlLink.url} />
          {/* <QR25D value={urlLink.url} /> */}
        </div>
        {/* <QRResImage qrcode={qrcode} image="./img/nihonchizu-hakuchizu.png" /> */}
      </div>
    </div>
  );
};
