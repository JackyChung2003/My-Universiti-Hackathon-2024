// // src/components/QRScanner.tsx
// import React, { useEffect, useRef, useState } from 'react';
// import QrScanner from 'qr-scanner';
// // import './QRScanner.scss';
// import { useNavigate } from 'react-router-dom';

// const QRScanner: React.FC = () => {
//   const videoElementRef = useRef<HTMLVideoElement | null>(null);
//   const [scanned, setScannedText] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const video = videoElementRef.current;
//     if (!video) return;

//     const qrScanner = new QrScanner(
//       video,
//       (result) => {
//         console.log('decoded qr code:', result);
//         setScannedText(result.data);

//         // Navigate to the scanned URL or process the data
//         if (result.data) {
//           navigate(result.data);
//         }
//       },
//       {
//         returnDetailedScanResult: true,
//         highlightScanRegion: true,
//         highlightCodeOutline: true,
//       }
//     );

//     qrScanner.start().then(() => console.log('QR Scanner started'));

//     return () => {
//       qrScanner.stop();
//       qrScanner.destroy();
//     };
//   }, [navigate]);

//   return (
//     <div className="qr-scanner-container">
//       <div className="videoWrapper">
//         <video className="qrVideo" ref={videoElementRef} />
//       </div>
//       {scanned && <p className="scannedText">Scanned: {scanned}</p>}
//     </div>
//   );
// };

// export default QRScanner;


import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { useNavigate } from 'react-router-dom';
// import './QRScanner.scss';
import './index.css'

const QRScanner = () => {
  const videoElementRef = useRef<HTMLVideoElement | null>(null); // Type assertion for HTMLVideoElement
  const [scanned, setScannedText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoElementRef.current as HTMLVideoElement; // Type assertion here
    const qrScanner = new QrScanner(
      video,
      (result: QrScanner.ScanResult) => { // Explicit type for result
        const scannedUrl = result.data;
        console.log('decoded qr code:', scannedUrl);

        if (scannedUrl.includes('My-Universiti-Hackathon-2024')) {
          // Navigate directly if URL contains the specified string
          window.location.href = scannedUrl;
        } else {
          setScannedText(scannedUrl);
        }
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, [navigate]);

  return (
    <div className="qr-scanner-container">
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className='scannedText'>Place the Qr within the border.</p>
      <p className="scannedText">SCANNED ID: {scanned}</p>
    </div>
  );
};

export default QRScanner;
