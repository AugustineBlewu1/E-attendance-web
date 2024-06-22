import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { User } from "../../services/User";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";
import Loading from "../UI/Loading";
import L from "leaflet";

const VenuePage = () => {
  const toast = useToast();
  const user = useSelector(selectCurrentAdmin);
  type Position = {
    lat: number;
    lng: number;
  };

  type Venue = {
    name: string;
    corners?: Position[];
  };
  const [corners, setCorners] = useState<Position[]>([]);
  const [currentPosition, setCurrentPosition] = useState<Position>({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(false);
 


  const [error, setError] = useState<string | null>(null);

  const {
    register: registerVenue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Venue>({
    defaultValues: {},
  });


  const onSubmit : SubmitHandler<Venue> = async (data) => {

    console.log(data)
    console.log(corners)
    setLoading(true);

    try {
      const saveVenueResponse = await HttpService.postWithToken<any>(
        "/api/v1/venues",
        `${(user as User)?.accessToken}`,
        {
         name: data?.name?.trim(),
         corners: corners
        }
      );
      console.log(saveVenueResponse);
      if (saveVenueResponse.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (saveVenueResponse as any)?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "Venue Added Successfully",
          description:
            (saveVenueResponse as any).message +
            "Kindly provide password to the student with student ID to login",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset();
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: (error as any )?.response?.data?.error,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  }
 
  const captureCorner = () => {
    if (currentPosition.lat && currentPosition.lng) {
      setCorners([...corners, currentPosition]);
    }
    console.log(corners);
  };

  // function for checking the user's current position
  const updatePosition = (position: {
    coords: { latitude: any; longitude: any };
  }) => {
    const { latitude, longitude } = position.coords;
    setCurrentPosition({ lat: latitude, lng: longitude });
  };

  //handle error
  const handleError = (error: { message: any }) => {
    setError(`Geolocation error: ${error.message}`);
  };

  //icon
  var myIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    shadowSize: [41, 41] // size of the shadow
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // Watch position to track movement
      const watchId = navigator.geolocation.watchPosition(
        updatePosition,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 300,
          maximumAge: 0,
        }
      );

      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Function to check if the position is within the room
  // const isWithinRoom = (position: { lat: any; lng: any; }) => {
  //   if (corners.length < 3) return false;

  //   const { lat, lng } = position;
  //   let isInside = false;

  //   for (let i = 0, j = corners.length - 1; i < corners.length; j = i++) {
  //     const xi = corners[i].lat, yi = corners[i].lng;
  //     const xj = corners[j].lat, yj = corners[j].lng;

  //     const intersect = ((yi > lng) !== (yj > lng)) &&
  //                       (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
  //     if (intersect) isInside = !isInside;
  //   }

  //   return isInside;
  // };
  function isWithinRoom(position: { lat: number, lng: number }, corners: { lat: number, lng: number }[]): boolean {
    // A polygon must have at least 3 corners
    if (corners.length < 3) return false;

    const lat = position.lat;
    const lng = position.lng;
    let isInside = false;
    const epsilon = 1e-10; // Small tolerance for floating-point comparisons

    for (let i = 0, j = corners.length - 1; i < corners.length; j = i++) {
        const xi = corners[i].lat;
        const yi = corners[i].lng;
        const xj = corners[j].lat;
        const yj = corners[j].lng;

        // Check if point is on the vertex
        if ((Math.abs(lat - xi) < epsilon && Math.abs(lng - yi) < epsilon) || 
            (Math.abs(lat - xj) < epsilon && Math.abs(lng - yj) < epsilon)) {
            return true;
        }

        // Check if point is on the edge (within the tolerance)
        if (Math.abs((yi - lng) * (xj - xi) - (yj - lng) * (xi - lat)) < epsilon &&
            Math.min(xi, xj) <= lat && lat <= Math.max(xi, xj) &&
            Math.min(yi, yj) <= lng && lng <= Math.max(yi, yj)) {
            return true;
        }

        const intersect = ((yi > lng) !== (yj > lng)) &&
            (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}

  
  useEffect(() => {
    if (corners.length === 4) {
      if (!isWithinRoom(currentPosition, corners)) {
        setError("You are outside the room boundaries!");
      } else {
        setError(null);
      }
    }
  }, [currentPosition, corners]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Room Tracker</h1>
      <div>
        <div className="flex flex-row space-x-4">
          <button
            onClick={captureCorner}
            disabled={corners?.length === 4}
            className={`mb-4 px-4 py-2 ${
              corners?.length === 4
                ? "bg-green-light-mini text-white "
                : "bg-blue-500"
            } text-white rounded`}
          >
            {corners?.length === 4 ? (
              <p>Corners Captured</p>
            ) : (
              <p>Capture Corner</p>
            )}
          </button>

          <button
            onClick={() => setCorners([])}
            className={`mb-4 px-4 py-2 ${
              corners?.length === 4
                ? "bg-green-light-mini text-white "
                : "bg-blue-500"
            } text-white rounded`}
          >
            <p>Reset</p>
          </button>
        </div>
        {corners?.length === 4 ? (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className=" flex flex-col space-y-4">
            <input
              type="text"
              className=" py-2  w-fit  focus:border-2 focus:border-[#646cff] focus:outline-none pl-2"
              placeholder="Enter Venue Name"
              {...registerVenue("name", {
                required: "Venue name is required",
              })}
            />
            {errors.name && (
              <span className="text-left text-rose-500 font-normal text-xs">
                {errors?.name?.message}
              </span>
            )}
           {loading ? (
              <div className="text-center pt-3">
                <Loading />
              </div>
            ) : <button
              className={`mb-4 px-4 py-2 bg-blue-500 text-white rounded w-fit`}
            >
              <p>Save Venue</p>
            </button>}
          </div>
          </form>
        ) : (
          <div></div>
        )}
      </div>

      <p>{`Corners Captured: ${corners.length}`}</p>
      {corners.length > 0 && (
        <MapContainer
          center={corners[0]}
          zoom={18}
          className="h-96 w-full mb-4"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {corners.length > 0 && <Polygon positions={corners} color="blue" />}
          {currentPosition.lat !== null && (
            <Marker position={currentPosition} icon={myIcon}/>
          )}
        </MapContainer>
      )}
      <div>
        Positions
        {corners?.map((e: Position, i) => (
          <div className="flex flex-row py-4" key={i}>
            <p>{i + 1} corner</p>
            <p className="pl-2">
              {" "}
              {e?.lat}
              {e?.lng}
            </p>
          </div>
        ))}
      </div>
      <p>
        Current Position:{" "}
        {currentPosition.lat && currentPosition.lng
          ? `(${currentPosition.lat}, ${currentPosition.lng})`
          : "Fetching..."}
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VenuePage;

// const haversineDistance = (
//   coord1: { lat: number; lng: number },
//   coord2: { lat: number; lng: number }
// ) => {
//   const toRadians = (degrees: number) => degrees * (Math.PI / 180);

//   const lat1 = toRadians(coord1.lat);
//   const lat2 = toRadians(coord2.lat);
//   const deltaLat = toRadians(coord2.lat - coord1.lat);
//   const deltaLong = toRadians(coord2.lng - coord1.lng);

//   const a =
//     Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//     Math.cos(lat1) *
//       Math.cos(lat2) *
//       Math.sin(deltaLong / 2) *
//       Math.sin(deltaLong / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const R = 6371; // Radius of the Earth in kilometers
//   const distance = R * c; // Distance in kilometers

//   return distance;
// };
