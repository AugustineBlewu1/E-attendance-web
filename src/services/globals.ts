const R = 6378137; // Radius of the Earth in meters
export const d = 7; // Distance in meters

// Helper functions to convert between degrees and radians
function degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
  
export  function radiansToDegrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }
  
  // Function to calculate the distance between two points given their latitude and longitude
 export function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }


  // Function to check if a given position is within a 7-meter radius of any of the points
export function isPositionWithinCircles(
    lat: number,
    lon: number,
    points: { lat: number; lng: number }[]
  ): boolean {
    for (const point of points) {
      const distance = haversineDistance(lat, lon, point.lat, point.lng);
      if (distance <= d) {
        return true;
      }
    }
    return false;
  }