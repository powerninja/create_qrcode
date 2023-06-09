import { FC, RefObject } from 'react';
import { QR25D, QRRandRect, QRBubble, QRDsj, QRNormal, QRFunc, QRLine } from 'react-qrbtf';

interface QRCodeDisplayProps {
  url: string;
  setQrcodeStyle: (qrnum: number) => void;
  qrCodebgColor: {
    color0: string;
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
  };
  svgRef: RefObject<HTMLDivElement>;
  selectedQrCode: React.ReactNode;
  visible: boolean;
}

export const QRCodeDisplay: FC<QRCodeDisplayProps> = (props) => {
  const { url, setQrcodeStyle, qrCodebgColor, visible, svgRef, selectedQrCode } = props;

  return (
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
          <QRNormal value={url} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(1)} style={{ padding: '1px', border: qrCodebgColor.color1 }}>
          <QRDsj value={url} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(2)} style={{ padding: '1px', border: qrCodebgColor.color2 }}>
          <QRBubble value={url} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(3)} style={{ padding: '1px', border: qrCodebgColor.color3 }}>
          <QR25D value={url} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(4)} style={{ padding: '1px', border: qrCodebgColor.color4 }}>
          <QRRandRect value={url} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(5)} style={{ padding: '1px', border: qrCodebgColor.color5 }}>
          <QRFunc value={url} funcType={'B'} />
        </div>
        <div className="my-box w-25" onClick={() => setQrcodeStyle(6)} style={{ padding: '1px', border: qrCodebgColor.color6 }}>
          <QRLine value={url} />
        </div>
      </div>
      <div ref={svgRef}>{selectedQrCode}</div>
    </div>
  );
};
