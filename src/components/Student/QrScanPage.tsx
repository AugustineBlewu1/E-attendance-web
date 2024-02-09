
import { useState } from 'react';
import { QrReader, useQrReader } from 'react-qr-reader';
import { decode } from '../../services/store/security';
const QrScanPage = () => {
    const [data, setData] = useState('No result');

    const [showScan, setShowScan] = useState(false);

    return (
        <>
        
        <div className='border py-3 bg-slate-600' onClick={()=> setShowScan(!showScan)}>
            <p>Scan Me</p>
        </div>


      {
        showScan && ( 

         <QrReader
                onResult={(result, error) => {
                    if (!!result) {

                        console.log(result);

                        setData(result?.getText());

                        console.log('data', data);
                        console.log('Newdata', decode(result.getText()));

                    }

                    if (!!error) {
                        console.info(error);
                    }
                } }
                className='w-[30%]'
                 constraints={{ facingMode: 'user' }}       
       
      />
      )
    }
      <p>{data}</p>
        </>
    )



}

export default QrScanPage;