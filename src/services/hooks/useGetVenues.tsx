import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { User, Venues } from "../User";
import { selectCurrentAdmin } from "../adminReducer";

const useGetVenues = (admin: any) => {
    const [venues, setVenues] = useState<Venues[]>([]);
    console.log("admin", selectCurrentAdmin)
    const user = useSelector(admin);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getVenues();
    }, []);
  
    const getVenues = async () => {
      setLoading(true);
      const venuesFetch = await HttpService.getWithToken<any>(
        `/api/v1/venues`,
        `${(user as User)?.accessToken}`,
       
      );

      console.log(venuesFetch)

  
      if (venuesFetch) {
        setVenues(venuesFetch);
        setLoading(false);
      } else {
        setVenues([]);
        setLoading(false);
      }
  
      console.log("QrCodes", venuesFetch);
    };

    return {
        loading,
        venues
    }
}

export default useGetVenues;