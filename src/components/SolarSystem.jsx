const SolarSystem = () => {
  return (
    <div className="absolute top-8 right-8 pointer-events-none">
      <div className="relative w-40 h-40">
        {/* Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-sun-core to-primary sun-glow animate-pulse-glow" />
        
        {/* Orbit path */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-primary/20" />
        
        {/* Planet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-planet-blue to-blue-700 planet-glow" />
        </div>
      </div>
    </div>
  );
};

export default SolarSystem;
