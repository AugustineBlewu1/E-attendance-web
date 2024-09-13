import { Link } from "react-router-dom";


const QrCodePage = () => {
    
    return (
        <>
        <Link to={"/studentScan/scanning"}>
            <div className="border-2 py-6 text-center w-full md:w-[30%] rounded-lg hover:cursor-pointer hover:bg-gray-100 ">
                <p>Scan QRCode Here Now </p>
            </div>
        </Link>
        </>
    )
}


export default QrCodePage;