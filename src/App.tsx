import { useRef, FC } from 'react';
import './App.css';
import { useQRCodeHandler } from './hooks/useQRCodeHandler';
import { InputForm } from './components/InputForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';

export const App: FC = () => {
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

      <QRCodeDisplay
        url={urlLink.url}
        setQrcodeStyle={setQrcodeStyle}
        qrCodebgColor={qrCodebgColor}
        visible={visible}
        svgRef={svgRef}
        selectedQrCode={selectedQrCode}
      />
    </div>
  );
};
