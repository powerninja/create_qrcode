import React, { useState, useRef } from 'react';
import './App.css';

//QRコード生成ライブラリ https://github.com/ciaochaos/qrbtf
import { QR25D, QRRandRect, QRBubble, QRDsj, QRNormal, QRFunc, QRLine } from 'react-qrbtf';

//SVGを画像に変換するライブラリ https://github.com/canvg/canvg
import { Canvg } from 'canvg';

type Linktype = {
  url: string;
};

type BgColor = {
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
};

export const App = () => {
  const [urlLink, setUrlLink] = useState<Linktype>({ url: '' });
  const [visible, setVisible] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const svgRef = useRef<HTMLDivElement | null>(null);

  //QRコードが選択された際に色を変更
  const [qrCodebgColor, setqrCodebgColor] = useState<BgColor>({
    color0: '',
    color1: '',
    color2: '',
    color3: '',
    color4: '',
    color5: '',
    color6: '',
  });

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

  const setQrcodeStyle = (qrnum: number) => {
    switch (qrnum) {
      case 0:
        setqrCodebgColor({ color0: 'gray', color1: '', color2: '', color3: '', color4: '', color5: '', color6: '' });
        break;
      case 1:
        setqrCodebgColor({ color0: '', color1: 'gray', color2: '', color3: '', color4: '', color5: '', color6: '' });
        break;
      case 2:
        setqrCodebgColor({ color0: '', color1: '', color2: 'gray', color3: '', color4: '', color5: '', color6: '' });
        break;
      case 3:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: 'gray', color4: '', color5: '', color6: '' });
        break;
      case 4:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: 'gray', color5: '', color6: '' });
        break;
      case 5:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: '', color5: 'gray', color6: '' });
        break;
      case 6:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: '', color5: '', color6: 'gray' });
        break;
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
          maxWidth: 800,
          width: '100%',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <div ref={svgRef} className="d-flex flex-row">
          <div className="my-box w-25" onClick={() => setQrcodeStyle(0)} style={{ backgroundColor: qrCodebgColor.color0 }}>
            <QRNormal value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(1)} style={{ backgroundColor: qrCodebgColor.color1 }}>
            <QRDsj value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(2)} style={{ backgroundColor: qrCodebgColor.color2 }}>
            <QRBubble value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(3)} style={{ backgroundColor: qrCodebgColor.color3 }}>
            <QR25D value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(4)} style={{ backgroundColor: qrCodebgColor.color4 }}>
            <QRRandRect value={urlLink.url} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(5)} style={{ backgroundColor: qrCodebgColor.color5 }}>
            <QRFunc value={urlLink.url} funcType={'B'} />
          </div>
          <div className="my-box w-25" onClick={() => setQrcodeStyle(6)} style={{ backgroundColor: qrCodebgColor.color6 }}>
            <QRLine value={urlLink.url} />
          </div>
        </div>
      </div>
    </div>
  );
};
