import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MeasurementTools = ({ 
  isActive, 
  onToggle, 
  measurementType, 
  onMeasurementTypeChange,
  onMeasurementComplete,
  onClearMeasurements 
}) => {
  const [measurements, setMeasurements] = useState([]);
  const [currentMeasurement, setCurrentMeasurement] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const measurementTypes = [
    { id: 'distance', name: 'Distance', icon: 'Ruler', unit: 'meters' },
    { id: 'area', name: 'Area', icon: 'Square', unit: 'hectares' },
    { id: 'bearing', name: 'Bearing', icon: 'Compass', unit: 'degrees' },
    { id: 'coordinates', name: 'Coordinates', icon: 'MapPin', unit: 'lat/lng' }
  ];

  // Mock measurement results
  const mockMeasurements = [
    {
      id: 1,
      type: 'distance',
      value: 1247.5,
      unit: 'meters',
      coordinates: [[76.3520, 21.8350], [76.3580, 21.8420]],
      timestamp: '2025-01-13 14:30:25'
    },
    {
      id: 2,
      type: 'area',
      value: 2.47,
      unit: 'hectares',
      coordinates: [[76.3520, 21.8350], [76.3580, 21.8350], [76.3580, 21.8420], [76.3520, 21.8420]],
      timestamp: '2025-01-13 14:32:10'
    },
    {
      id: 3,
      type: 'bearing',
      value: 45.7,
      unit: 'degrees',
      coordinates: [[76.3520, 21.8350], [76.3580, 21.8420]],
      timestamp: '2025-01-13 14:35:15'
    }
  ];

  const handleMeasurementTypeSelect = (type) => {
    if (onMeasurementTypeChange) {
      onMeasurementTypeChange(type);
    }
  };

  const handleStartMeasurement = () => {
    const newMeasurement = {
      id: Date.now(),
      type: measurementType,
      status: 'active',
      coordinates: [],
      timestamp: new Date()?.toISOString()
    };
    setCurrentMeasurement(newMeasurement);
  };

  const handleCompleteMeasurement = (result) => {
    const completedMeasurement = {
      ...currentMeasurement,
      ...result,
      status: 'completed'
    };
    
    setMeasurements(prev => [...prev, completedMeasurement]);
    setCurrentMeasurement(null);
    
    if (onMeasurementComplete) {
      onMeasurementComplete(completedMeasurement);
    }
  };

  const handleClearAll = () => {
    setMeasurements([]);
    setCurrentMeasurement(null);
    if (onClearMeasurements) {
      onClearMeasurements();
    }
  };

  const formatValue = (value, unit) => {
    switch (unit) {
      case 'meters':
        return value > 1000 ? `${(value / 1000)?.toFixed(2)} km` : `${value?.toFixed(2)} m`;
      case 'hectares':
        return `${value?.toFixed(2)} ha`;
      case 'degrees':
        return `${value?.toFixed(1)}°`;
      default:
        return value;
    }
  };

  const getMeasurementIcon = (type) => {
    const typeConfig = measurementTypes?.find(t => t?.id === type);
    return typeConfig ? typeConfig?.icon : 'Ruler';
  };

  if (!isActive) {
    return (
      <div className="absolute bottom-20 right-4 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={onToggle}
          className="shadow-lg"
          title="Open Measurement Tools"
        >
          <Icon name="Ruler" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-20 right-4 w-80 bg-card border border-border rounded-lg shadow-lg z-10 max-h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Ruler" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Measurement Tools</h3>
            <p className="text-xs text-muted-foreground">
              {measurements?.length} measurements
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <Icon name={isCollapsed ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            title="Close Tools"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <>
          {/* Measurement Type Selector */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Select Measurement Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {measurementTypes?.map((type) => (
                <Button
                  key={type?.id}
                  variant={measurementType === type?.id ? 'default' : 'outline'}
                  size="sm"
                  className="flex flex-col items-center justify-center h-16 p-2"
                  onClick={() => handleMeasurementTypeSelect(type?.id)}
                >
                  <Icon name={type?.icon} size={16} className="mb-1" />
                  <span className="text-xs">{type?.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Current Measurement */}
          {measurementType && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">
                  {measurementTypes?.find(t => t?.id === measurementType)?.name} Measurement
                </h4>
                {currentMeasurement ? (
                  <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
                    Active
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleStartMeasurement}
                  >
                    <Icon name="Play" size={14} className="mr-1" />
                    Start
                  </Button>
                )}
              </div>

              {currentMeasurement && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name={getMeasurementIcon(measurementType)} size={14} className="text-primary" />
                    <span className="text-sm font-medium">
                      {measurementType === 'distance' && 'Click points to measure distance'}
                      {measurementType === 'area' && 'Click points to define area boundary'}
                      {measurementType === 'bearing' && 'Click two points to measure bearing'}
                      {measurementType === 'coordinates' && 'Click on map to get coordinates'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCompleteMeasurement({
                        value: Math.random() * 1000,
                        unit: measurementTypes?.find(t => t?.id === measurementType)?.unit
                      })}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMeasurement(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Measurement Results */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Results</h4>
                {measurements?.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} className="mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              {measurements?.length === 0 && mockMeasurements?.length === 0 ? (
                <div className="text-center py-8">
                  <Icon name="Ruler" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No measurements yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Select a tool and start measuring</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...measurements, ...mockMeasurements]?.map((measurement, index) => (
                    <div key={measurement?.id || index} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={getMeasurementIcon(measurement?.type)} 
                            size={14} 
                            className="text-primary" 
                          />
                          <span className="text-sm font-medium capitalize">{measurement?.type}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6"
                          onClick={() => {
                            setMeasurements(prev => prev?.filter(m => m?.id !== measurement?.id));
                          }}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                      
                      <div className="text-lg font-semibold text-primary mb-1">
                        {formatValue(measurement?.value, measurement?.unit)}
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {new Date(measurement.timestamp)?.toLocaleString()}
                      </div>
                      
                      {measurement?.coordinates && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Icon name="Copy" size={12} className="mr-1" />
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              <Icon name="Download" size={12} className="mr-1" />
                              Export
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Download" size={14} className="mr-1" />
                Export All
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Icon name="Settings" size={14} className="mr-1" />
                Units
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MeasurementTools;