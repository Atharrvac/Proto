import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GeospatialMapIntegration = ({ coordinates, onCoordinatesChange, boundaryPoints = [], onBoundaryChange }) => {
  const [mapMode, setMapMode] = useState('view'); // view, draw, edit
  const [selectedTool, setSelectedTool] = useState('point');
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);

  // Mock coordinates for demonstration
  const defaultCenter = { lat: 23.2599, lng: 77.4126 };
  const currentCoords = coordinates?.center || defaultCenter;

  const mapTools = [
    { id: 'point', label: 'Point', icon: 'MapPin', description: 'Mark single location' },
    { id: 'polygon', label: 'Polygon', icon: 'Pentagon', description: 'Draw boundary area' },
    { id: 'rectangle', label: 'Rectangle', icon: 'Square', description: 'Draw rectangular area' },
    { id: 'circle', label: 'Circle', icon: 'Circle', description: 'Draw circular area' }
  ];

  const handleAutoExtraction = async () => {
    setIsExtracting(true);
    
    // Simulate satellite imagery processing
    setTimeout(() => {
      const mockBoundary = [
        { lat: currentCoords?.lat + 0.001, lng: currentCoords?.lng - 0.001 },
        { lat: currentCoords?.lat + 0.001, lng: currentCoords?.lng + 0.001 },
        { lat: currentCoords?.lat - 0.001, lng: currentCoords?.lng + 0.001 },
        { lat: currentCoords?.lat - 0.001, lng: currentCoords?.lng - 0.001 }
      ];
      
      onBoundaryChange(mockBoundary);
      setConfidenceScore(87.5);
      setIsExtracting(false);
    }, 3000);
  };

  const handleCoordinateUpdate = (field, value) => {
    const newCoords = {
      ...coordinates,
      center: {
        ...currentCoords,
        [field]: parseFloat(value) || 0
      }
    };
    onCoordinatesChange(newCoords);
  };

  const formatCoordinate = (coord, type) => {
    if (!coord) return '';
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord)?.toFixed(6)}° ${direction}`;
  };

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Map" size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Interactive Map</h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-background border border-border rounded-md">
                {['view', 'draw', 'edit']?.map((mode) => (
                  <button
                    key={mode}
                    className={`px-3 py-1 text-sm font-medium rounded transition-smooth capitalize ${
                      mapMode === mode
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={() => setMapMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Display Area */}
        <div className="relative h-96 bg-muted/20">
          {/* Google Maps Iframe */}
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Claim Location Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${currentCoords?.lat},${currentCoords?.lng}&z=16&output=embed`}
            className="border-0"
          />
          
          {/* Map Overlay Controls */}
          {mapMode !== 'view' && (
            <div className="absolute top-4 left-4 bg-background border border-border rounded-lg p-3 elevation-2">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Drawing Tools</p>
                <div className="grid grid-cols-2 gap-2">
                  {mapTools?.map((tool) => (
                    <button
                      key={tool?.id}
                      className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-smooth ${
                        selectedTool === tool?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      onClick={() => setSelectedTool(tool?.id)}
                      title={tool?.description}
                    >
                      <Icon name={tool?.icon} size={14} />
                      <span>{tool?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Confidence Score Display */}
          {confidenceScore && (
            <div className="absolute top-4 right-4 bg-background border border-border rounded-lg p-3 elevation-2">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-success" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Extraction Confidence</p>
                  <p className="text-lg font-bold text-success">{confidenceScore}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Coordinate Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Manual Coordinate Entry</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              placeholder="e.g., 23.2599"
              value={currentCoords?.lat || ''}
              onChange={(e) => handleCoordinateUpdate('lat', e?.target?.value)}
              step="0.000001"
              description={formatCoordinate(currentCoords?.lat, 'lat')}
            />
            
            <Input
              label="Longitude"
              type="number"
              placeholder="e.g., 77.4126"
              value={currentCoords?.lng || ''}
              onChange={(e) => handleCoordinateUpdate('lng', e?.target?.value)}
              step="0.000001"
              description={formatCoordinate(currentCoords?.lng, 'lng')}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Navigation" size={16} className="mr-2" />
              Get Current Location
            </Button>
            
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Search Address
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Auto-Boundary Extraction</h4>
          
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Icon name="Satellite" size={16} className="text-primary" />
                <span className="text-sm font-medium">Satellite Imagery Analysis</span>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Use AI to automatically detect land boundaries from satellite imagery
              </p>
              
              <Button
                variant="outline"
                onClick={handleAutoExtraction}
                disabled={isExtracting}
                loading={isExtracting}
              >
                <Icon name="Zap" size={16} className="mr-2" />
                {isExtracting ? 'Extracting Boundaries...' : 'Extract Boundaries'}
              </Button>
              
              {confidenceScore && (
                <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-md">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">
                      Boundary extracted with {confidenceScore}% confidence
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Boundary Points Summary */}
      {boundaryPoints?.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">Boundary Points ({boundaryPoints?.length})</h4>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export KML
            </Button>
          </div>
          
          <div className="bg-card border border-border rounded-lg">
            <div className="max-h-48 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-3 font-medium">Point</th>
                    <th className="text-left p-3 font-medium">Latitude</th>
                    <th className="text-left p-3 font-medium">Longitude</th>
                    <th className="text-left p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {boundaryPoints?.map((point, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/30">
                      <td className="p-3 font-medium">Point {index + 1}</td>
                      <td className="p-3 font-mono">{point?.lat?.toFixed(6)}</td>
                      <td className="p-3 font-mono">{point?.lng?.toFixed(6)}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Map Legend */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h4 className="font-semibold text-foreground mb-3">Map Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span>Claim Center</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded-full"></div>
            <span>Boundary Points</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded-full"></div>
            <span>Forest Area</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error rounded-full"></div>
            <span>Restricted Zone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialMapIntegration;