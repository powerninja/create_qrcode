import React, { useState, useCallback } from 'react';

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

export const useQRCodeHandler = () => {
  //inputフォームに入力されたurl
  const [urlLink, setUrlLink] = useState<Linktype>({ url: '' });

  //QRコードの表示非表示を制御
  const [visible, setVisible] = useState<boolean>(false);

  //ダウンロードボタンの制御
  const [downloadButton, setDownloadButton] = useState<string>('btn btn-secondary disabled');

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

  //ダウンロードリンク
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  //inputフォーム入力
  const setInputUrl = useCallback((urlValue: string) => {
    setUrlLink({ url: urlValue });
    setVisible(false);
    setDownloadButton('btn btn-secondary disabled');
  }, []);

  //QRコード生成
  const generateQrCode = useCallback(() => {
    if (urlLink.url.indexOf('http', 0) === -1) {
      alert('URLを入力してください');
      return;
    }
    setVisible(true);
  }, [urlLink]);

  //表示していたQRコードを非表示
  const clearQrCode = useCallback(() => {
    setVisible(false);
    setUrlLink({ url: '' });
    setDownloadButton('btn btn-secondary disabled');
  }, []);

  //生成したQRコードをダウンロード
  const downloadQrCode = async (element: any) => {
    if (element) {
      const svgElement = element.current.querySelector('svg');

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

  return {
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
  };
};
