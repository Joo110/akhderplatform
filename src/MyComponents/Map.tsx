import { Hand } from "lucide-react";
import mapImage from '../assets/map.png';

const Map = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-hidden group mt-16">
      <a
        href="https://www.google.com/maps/place/31%C2%B002'42.5%22N+31%C2%B023'30.1%22E/@31.045127,31.391682,17z"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={mapImage}
          alt="Map"
          className="w-full h-full object-cover cursor-pointer"
        />

        <Hand
          size={60}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-80 animate-bounce pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
        />
      </a>
    </div>
  );
};

export default Map;
