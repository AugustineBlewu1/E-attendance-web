import Loader from "../Loader";
import useMyQrCode from "../../services/hooks/useMyQrCodes";
import Lottie from "react-lottie";
import transaction from "../../lotties/transaction.json";

const MyQrCodes = () => {
  const qrdata = useMyQrCode();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: transaction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {qrdata?.loading ? (
        <Loader />
      ) : (
        <>
          <p className="font-bold mb-5">My Scanned Courses</p>

          {qrdata?.myQrCodes?.length === 0 ? (
            <Lottie options={defaultOptions} width={"30%"} height={"30%"} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-3 ">
              {qrdata?.myQrCodes?.map((e) => (
                <div className="border-2 py-5 hover:shadow-lg rounded-lg px-10">
                  <span className="flex flex-row space-x-2">
                    <p className="font-bold">Course Name - </p>
                    <p>{e?.qr_code?.course?.name}</p>
                  </span>
                  <span className="flex flex-row space-x-2">
                    <p className="font-bold">Venue - </p>{" "}
                    <p>{e?.qr_code?.venue?.name}</p>
                  </span>
                  <span className="flex flex-row space-x-2">
                    <p className="font-bold">Lecturer - </p>{" "}
                    <p>
                      {e?.qr_code?.user?.first_name +
                        " " +
                        e?.qr_code?.user?.last_name}
                    </p>
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyQrCodes;
