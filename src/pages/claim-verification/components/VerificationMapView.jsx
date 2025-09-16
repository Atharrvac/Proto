import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationMapView = ({ claim, onBoundaryUpdate }) => {
  const [mapMode, setMapMode] = useState('satellite');
  const [showOverlays, setShowOverlays] = useState({
    boundaries: true,
    survey: true,
    forest: false,
    roads: false
  });
  const [measurementMode, setMeasurementMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  const mapModes = [
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', label: 'Terrain', icon: 'Mountain' },
    { id: 'hybrid', label: 'Hybrid', icon: 'Layers' }
  ];

  const overlayOptions = [
    { id: 'boundaries', label: 'Claim Boundaries', color: 'text-primary' },
    { id: 'survey', label: 'Survey Data', color: 'text-accent' },
    { id: 'forest', label: 'Forest Cover', color: 'text-success' },
    { id: 'roads', label: 'Roads & Infrastructure', color: 'text-muted-foreground' }
  ];

  const tools = [
    { id: 'pan', label: 'Pan', icon: 'Move', active: true },
    { id: 'measure', label: 'Measure', icon: 'Ruler' },
    { id: 'annotate', label: 'Annotate', icon: 'MessageSquare' },
    { id: 'boundary', label: 'Edit Boundary', icon: 'Edit' }
  ];

  const handleOverlayToggle = (overlayId) => {
    setShowOverlays(prev => ({
      ...prev,
      [overlayId]: !prev?.[overlayId]
    }));
  };

  const handleZoomToExtent = () => {
    console.log('Zooming to claim extent...');
  };

  const handleExportMap = () => {
    console.log('Exporting map view...');
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Geospatial Verification</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleZoomToExtent}>
              <Icon name="Focus" size={14} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleExportMap}>
              <Icon name="Download" size={14} />
            </Button>
          </div>
        </div>

        {/* Map Mode Selector */}
        <div className="flex items-center space-x-1 mb-3">
          {mapModes?.map((mode) => (
            <button
              key={mode?.id}
              className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                mapMode === mode?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => setMapMode(mode?.id)}
            >
              <Icon name={mode?.icon} size={12} />
              <span>{mode?.label}</span>
            </button>
          ))}
        </div>

        {/* Tools */}
        <div className="flex items-center space-x-1">
          {tools?.map((tool) => (
            <button
              key={tool?.id}
              className={`flex items-center space-x-1 px-2 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                tool?.active
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              title={tool?.label}
            >
              <Icon name={tool?.icon} size={12} />
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-muted rounded-b-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Claim Verification Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${claim?.coordinates?.lat},${claim?.coordinates?.lng}&z=16&output=embed`}
            className="border-0"
          />
        </div>

        {/* Map Overlays Panel */}
        <div className="absolute top-4 right-4 w-64 bg-card border border-border rounded-lg elevation-2">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold">Map Layers</h3>
          </div>
          <div className="p-3 space-y-2">
            {overlayOptions?.map((overlay) => (
              <label key={overlay?.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOverlays?.[overlay?.id]}
                  onChange={() => handleOverlayToggle(overlay?.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full bg-current ${overlay?.color}`} />
                  <span className="text-sm">{overlay?.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Measurement Info */}
        {measurementMode && (
          <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 elevation-2">
            <div className="text-xs text-muted-foreground mb-1">Measured Area</div>
            <div className="text-sm font-semibold">{claim?.area} hectares</div>
            <div className="text-xs text-muted-foreground mt-1">
              Perimeter: {(claim?.area * 4)?.toFixed(2)} meters
            </div>
          </div>
        )}

        {/* Coordinates Display */}
        <div className="absolute bottom-4 right-4 bg-card border border-border rounded-lg p-3 elevation-2">
          <div className="text-xs text-muted-foreground mb-1">Coordinates</div>
          <div className="text-xs font-mono">
            {claim?.coordinates?.lat?.toFixed(6)}, {claim?.coordinates?.lng?.toFixed(6)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Accuracy: ±{Math.floor(Math.random() * 5) + 1}m
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 left-4 flex flex-col space-y-1">
          <Button variant="outline" size="icon" className="w-8 h-8 bg-card">
            <Icon name="Plus" size={14} />
          </Button>
          <Button variant="outline" size="icon" className="w-8 h-8 bg-card">
            <Icon name="Minus" size={14} />
          </Button>
        </div>
      </div>
      {/* Map Statistics */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Claim Area</div>
            <div className="text-sm font-semibold">{claim?.area} ha</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Forest Cover</div>
            <div className="text-sm font-semibold text-success">85%</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
            <div className="text-sm font-semibold text-primary">High</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationMapView;