import { FC } from 'react';
import { QR25D, QRRandRect, QRBubble, QRDsj, QRNormal, QRFunc, QRLine } from 'react-qrbtf';

export const QRCodeDisplay: FC<any> = (props: any) => {
  const { url, setQrcodeStyle, qrCodebgColor } = props;

  return (
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
  );
};
