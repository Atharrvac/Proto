import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapControls = ({ onZoomIn, onZoomOut, onResetView, onToggleFullscreen, onShareLocation }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleZoomIn = () => {
    if (onZoomIn) onZoomIn();
  };

  const handleZoomOut = () => {
    if (onZoomOut) onZoomOut();
  };

  const handleResetView = () => {
    if (onResetView) onResetView();
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (onToggleFullscreen) onToggleFullscreen(!isFullscreen);
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const location = {
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy
          };
          setCurrentLocation(location);
          setIsLocating(false);
          console.log('Current location:', location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLocating(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setIsLocating(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FRA Atlas WebGIS - Public Map Viewer',
        text: 'Explore Forest Rights Act information and approved claims',
        url: window.location?.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      console.log('Link copied to clipboard');
    }
    
    if (onShareLocation) onShareLocation();
  };

  const handleMeasure = () => {
    console.log('Measure tool activated');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="flex flex-col space-y-2">
        {/* Primary Controls */}
        <div className="bg-card border border-border rounded-lg elevation-2 p-1">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              title="Zoom In"
              className="w-10 h-10"
            >
              <Icon name="Plus" size={18} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="w-10 h-10"
            >
              <Icon name="Minus" size={18} />
            </Button>
            
            <div className="w-full h-px bg-border my-1" />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResetView}
              title="Reset View"
              className="w-10 h-10"
            >
              <Icon name="Home" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLocateMe}
              loading={isLocating}
              title="My Location"
              className={`w-10 h-10 ${currentLocation ? 'text-primary' : ''}`}
            >
              <Icon name="MapPin" size={16} />
            </Button>
          </div>
        </div>

        {/* Secondary Controls */}
        <div className="bg-card border border-border rounded-lg elevation-2 p-1">
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="w-10 h-10"
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMeasure}
              title="Measure Distance"
              className="w-10 h-10"
            >
              <Icon name="Ruler" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              title="Share Location"
              className="w-10 h-10"
            >
              <Icon name="Share" size={16} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrint}
              title="Print Map"
              className="w-10 h-10"
            >
              <Icon name="Printer" size={16} />
            </Button>
          </div>
        </div>

        {/* Compass/North Arrow */}
        <div className="bg-card border border-border rounded-lg elevation-2 p-2">
          <div className="flex items-center justify-center w-8 h-8">
            <div className="relative">
              <Icon name="Navigation" size={20} className="text-primary" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full" />
            </div>
          </div>
          <div className="text-xs text-center text-muted-foreground mt-1">N</div>
        </div>

        {/* Scale Indicator */}
        <div className="bg-card border border-border rounded-lg elevation-2 px-3 py-2">
          <div className="text-xs text-muted-foreground text-center">
            <div className="font-mono">1:50,000</div>
            <div className="w-12 h-px bg-foreground my-1 mx-auto" />
            <div>1 km</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapControls;