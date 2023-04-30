import { FC } from 'react';

export const InputForm: FC<any> = (props: any) => {
  const { url, setInputUrl, generateQrCode, clearQrCode, downloadQrCode, downloadUrl, downloadButton, svgRef } = props;

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
          value={url}
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
            maxWidth: 200,
          }}
        >
          ダウンロード
        </a>
      </div>
    </div>
  );
};
