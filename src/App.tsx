import { useRef, FC } from 'react';
import './App.css';
import { useQRCodeHandler } from './hooks/useQRCodeHandler';
import { InputForm } from './components/InputForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';

export const App: FC<any> = () => {
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
      <InputForm
        url={urlLink.url}
        setInputUrl={setInputUrl}
        generateQrCode={generateQrCode}
        clearQrCode={clearQrCode}
        downloadQrCode={downloadQrCode}
        downloadUrl={downloadUrl}
        downloadButton={downloadButton}
        svgRef={svgRef}
      />

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
        <QRCodeDisplay url={urlLink.url} setQrcodeStyle={setQrcodeStyle} qrCodebgColor={qrCodebgColor} visible={visible} />
        <div ref={svgRef}>{selectedQrCode}</div>
      </div>
    </div>
  );
};
