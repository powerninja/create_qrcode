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

  //選択されたQRコードを保存するuseState
  const [selectedQrCode, setSelectedQrCode] = useState<React.ReactElement | null>(null);

  //ダウンロードボタンの制御
  const [downloadButton, setDownloadButton] = useState<string>('btn btn-secondary disabled');

  //QRコード生成
  const generateQrCode = () => {
    if (urlLink.url.indexOf('http', 0) === -1) {
      alert('URLを入力してください');
      return;
    }
    setVisible(true);
    setDownloadButton('btn btn-secondary');
  };

  //表示していたQRコードを非表示
  const clearQrCode = () => {
    setVisible(false);
    setUrlLink({ url: '' });
    setDownloadButton('btn btn-secondary disabled');
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
        setqrCodebgColor({ color0: '1px solid #000', color1: '', color2: '', color3: '', color4: '', color5: '', color6: '' });
        setSelectedQrCode(<QRNormal value={urlLink.url} />);
        break;
      case 1:
        setqrCodebgColor({ color0: '', color1: '1px solid #000', color2: '', color3: '', color4: '', color5: '', color6: '' });
        setSelectedQrCode(<QRDsj value={urlLink.url} />);
        break;
      case 2:
        setqrCodebgColor({ color0: '', color1: '', color2: '1px solid #000', color3: '', color4: '', color5: '', color6: '' });
        setSelectedQrCode(<QRBubble value={urlLink.url} />);
        break;
      case 3:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '1px solid #000', color4: '', color5: '', color6: '' });
        setSelectedQrCode(<QR25D value={urlLink.url} />);
        break;
      case 4:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: '1px solid #000', color5: '', color6: '' });
        setSelectedQrCode(<QRRandRect value={urlLink.url} />);
        break;
      case 5:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: '', color5: '1px solid #000', color6: '' });
        setSelectedQrCode(<QRFunc value={urlLink.url} />);
        break;
      case 6:
        setqrCodebgColor({ color0: '', color1: '', color2: '', color3: '', color4: '', color5: '', color6: '1px solid #000' });
        setSelectedQrCode(<QRLine value={urlLink.url} />);
        break;
    }
    setDownloadButton('btn btn-secondary');
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
          className={downloadButton}
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
        {/* <p>選択したQRコード</p>
        TODO: 上記をかっこよく表示させたい
        TODO: もう少し小さくてもいいかも
        TODO: QRコードを選択していない状態の場合、ダウンロードボタンを非活性にしたい*/}
        <div ref={svgRef}>{selectedQrCode}</div>
      </div>
    </div>
  );
};
