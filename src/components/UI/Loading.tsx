import { CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <>
      <CircularProgress
        isIndeterminate
        color="#04A551"
        size="30px"
        thickness={"14px"}
      />
    </>
  );
};



export default Loading;