import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapCanvas = ({ 
  selectedLayers, 
  mapMode, 
  onMapClick, 
  onFeatureSelect,
  searchLocation,
  measurementMode,
  drawingMode,
  onMeasurementComplete,
  onDrawingComplete
}) => {
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(8);
  const [currentCenter, setCurrentCenter] = useState([78.9629, 20.5937]); // India center
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [measurementResult, setMeasurementResult] = useState(null);

  // Mock map data
  const mockClaimParcels = [
    {
      id: 'FR2025001',
      coordinates: [[78.9629, 20.5937], [78.9729, 20.5937], [78.9729, 20.6037], [78.9629, 20.6037]],
      status: 'pending',
      area: 2.5,
      claimant: 'Ramesh Kumar',
      village: 'Khandwa',
      submissionDate: '2025-01-10'
    },
    {
      id: 'FR2025002',
      coordinates: [[78.9829, 20.5837], [78.9929, 20.5837], [78.9929, 20.5937], [78.9829, 20.5937]],
      status: 'approved',
      area: 3.2,
      claimant: 'Sunita Devi',
      village: 'Barwani',
      submissionDate: '2025-01-08'
    },
    {
      id: 'FR2025003',
      coordinates: [[78.9529, 20.6137], [78.9629, 20.6137], [78.9629, 20.6237], [78.9529, 20.6237]],
      status: 'rejected',
      area: 1.8,
      claimant: 'Mohan Singh',
      village: 'Khargone',
      submissionDate: '2025-01-05'
    }
  ];

  const mockForestAreas = [
    {
      id: 'forest_001',
      name: 'Satpura National Park',
      type: 'protected',
      coordinates: [[78.8000, 20.4000], [79.2000, 20.4000], [79.2000, 20.8000], [78.8000, 20.8000]]
    },
    {
      id: 'forest_002',
      name: 'Kanha Tiger Reserve',
      type: 'reserve',
      coordinates: [[80.5000, 22.2000], [80.9000, 22.2000], [80.9000, 22.6000], [80.5000, 22.6000]]
    }
  ];

  useEffect(() => {
    // Simulate map initialization
    const initializeMap = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock map instance
        const mockMap = {
          center: currentCenter,
          zoom: currentZoom,
          layers: selectedLayers,
          features: [...mockClaimParcels, ...mockForestAreas]
        };
        
        setMapInstance(mockMap);
        setIsLoading(false);
      } catch (error) {
        setMapError('Failed to load map. Please check your connection.');
        setIsLoading(false);
      }
    };

    if (mapContainerRef?.current) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    // Handle search location
    if (searchLocation && mapInstance) {
      const mockCoordinates = [78.9629 + Math.random() * 0.1, 20.5937 + Math.random() * 0.1];
      setCurrentCenter(mockCoordinates);
      setCurrentZoom(12);
    }
  }, [searchLocation, mapInstance]);

  const handleMapInteraction = (event) => {
    const mockCoordinates = [78.9629 + Math.random() * 0.2, 20.5937 + Math.random() * 0.2];
    
    if (measurementMode) {
      const mockDistance = (Math.random() * 1000)?.toFixed(2);
      const mockArea = (Math.random() * 10)?.toFixed(2);
      setMeasurementResult({
        distance: `${mockDistance} m`,
        area: `${mockArea} hectares`,
        coordinates: mockCoordinates
      });
      if (onMeasurementComplete) {
        onMeasurementComplete({ distance: mockDistance, area: mockArea });
      }
    } else if (drawingMode) {
      if (onDrawingComplete) {
        onDrawingComplete({
          type: 'polygon',
          coordinates: mockCoordinates,
          area: (Math.random() * 5)?.toFixed(2)
        });
      }
    } else {
      // Check if clicked on a feature
      const clickedFeature = mockClaimParcels?.find(parcel => 
        Math.abs(parcel?.coordinates?.[0]?.[0] - mockCoordinates?.[0]) < 0.01 &&
        Math.abs(parcel?.coordinates?.[0]?.[1] - mockCoordinates?.[1]) < 0.01
      );
      
      if (clickedFeature) {
        setSelectedFeature(clickedFeature);
        if (onFeatureSelect) {
          onFeatureSelect(clickedFeature);
        }
      }
    }
    
    if (onMapClick) {
      onMapClick({ coordinates: mockCoordinates, feature: selectedFeature });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      case 'under_review': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const handleZoomIn = () => {
    setCurrentZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setCurrentZoom(prev => Math.max(prev - 1, 1));
  };

  const resetView = () => {
    setCurrentCenter([78.9629, 20.5937]);
    setCurrentZoom(8);
    setSelectedFeature(null);
    setMeasurementResult(null);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading map...</p>
          <p className="text-sm text-muted-foreground mt-1">Initializing WebGIS interface</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="relative w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center max-w-md">
          <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Map Loading Error</h3>
          <p className="text-muted-foreground mb-4">{mapError}</p>
          <Button onClick={() => window.location?.reload()}>
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-background">
      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="w-full h-full cursor-crosshair relative overflow-hidden rounded-lg border border-border"
        onClick={handleMapInteraction}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for map simulation */}
        <div className="absolute inset-0 bg-green-900/20">
          {/* Mock claim parcels */}
          {mockClaimParcels?.map((parcel, index) => (
            <div
              key={parcel?.id}
              className="absolute border-2 cursor-pointer transition-all duration-200 hover:border-4"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`,
                width: '80px',
                height: '60px',
                borderColor: getStatusColor(parcel?.status),
                backgroundColor: `${getStatusColor(parcel?.status)}20`
              }}
              onClick={(e) => {
                e?.stopPropagation();
                setSelectedFeature(parcel);
                if (onFeatureSelect) onFeatureSelect(parcel);
              }}
            >
              <div className="absolute -top-6 left-0 text-xs font-medium text-foreground bg-card px-1 rounded shadow">
                {parcel?.id}
              </div>
            </div>
          ))}

          {/* Mock forest areas */}
          {mockForestAreas?.map((forest, index) => (
            <div
              key={forest?.id}
              className="absolute border border-green-600 bg-green-600/10"
              style={{
                left: `${60 + index * 20}%`,
                top: `${20 + index * 25}%`,
                width: '120px',
                height: '100px'
              }}
            >
              <div className="absolute -top-6 left-0 text-xs font-medium text-foreground bg-card px-1 rounded shadow">
                {forest?.name}
              </div>
            </div>
          ))}

          {/* Measurement result overlay */}
          {measurementResult && (
            <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-sm mb-2">Measurement Result</h4>
              <div className="space-y-1 text-xs">
                <div>Distance: {measurementResult?.distance}</div>
                <div>Area: {measurementResult?.area}</div>
              </div>
            </div>
          )}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={resetView}
            title="Reset View"
          >
            <Icon name="Home" size={16} />
          </Button>
        </div>

        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded px-3 py-1 text-xs font-mono">
          {currentCenter?.[1]?.toFixed(4)}°N, {currentCenter?.[0]?.toFixed(4)}°E | Zoom: {currentZoom}
        </div>

        {/* Scale Bar */}
        <div className="absolute bottom-4 right-4 bg-card border border-border rounded px-2 py-1">
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-16 h-0.5 bg-foreground"></div>
            <span>1 km</span>
          </div>
        </div>
      </div>
      {/* Feature Info Panel */}
      {selectedFeature && (
        <div className="absolute top-4 left-4 w-80 bg-card border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Claim Details</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFeature(null)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Claim ID:</span>
              <span className="font-medium">{selectedFeature?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Claimant:</span>
              <span>{selectedFeature?.claimant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Village:</span>
              <span>{selectedFeature?.village}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Area:</span>
              <span>{selectedFeature?.area} hectares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span 
                className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                style={{
                  backgroundColor: `${getStatusColor(selectedFeature?.status)}20`,
                  color: getStatusColor(selectedFeature?.status)
                }}
              >
                {selectedFeature?.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Submitted:</span>
              <span>{selectedFeature?.submissionDate}</span>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <Button size="sm" variant="outline">
              <Icon name="Eye" size={14} className="mr-1" />
              View Details
            </Button>
            <Button size="sm" variant="outline">
              <Icon name="Edit" size={14} className="mr-1" />
              Edit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapCanvas;