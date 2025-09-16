import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActionsToolbar from '../../components/ui/QuickActionsToolbar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import MapCanvas from './components/MapCanvas';
import LayerControlPanel from './components/LayerControlPanel';
import MapToolbar from './components/MapToolbar';
import SearchLocationPanel from './components/SearchLocationPanel';
import FeatureInfoPanel from './components/FeatureInfoPanel';
import MeasurementTools from './components/MeasurementTools';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InteractiveWebGISMap = () => {
  // Map state
  const [selectedLayers, setSelectedLayers] = useState(['satellite', 'states', 'districts', 'forest_cover', 'pending_claims', 'approved_claims']);
  const [mapMode, setMapMode] = useState('2d');
  const [activeTool, setActiveTool] = useState('pan');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  
  // Panel visibility states
  const [isLayerPanelCollapsed, setIsLayerPanelCollapsed] = useState(false);
  const [isSearchPanelVisible, setIsSearchPanelVisible] = useState(false);
  const [isMeasurementToolsActive, setIsMeasurementToolsActive] = useState(false);
  
  // Measurement state
  const [measurementMode, setMeasurementMode] = useState(null);
  const [drawingMode, setDrawingMode] = useState(null);
  
  // User context
  const [userRole] = useState('Field Officer');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState('online');

  // Breadcrumb configuration
  const breadcrumbItems = [
    { label: 'Maps', path: '/maps' }
  ];

  useEffect(() => {
    // Check online/offline status
    const handleOnline = () => {
      setIsOfflineMode(false);
      setSyncStatus('online');
    };
    
    const handleOffline = () => {
      setIsOfflineMode(true);
      setSyncStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial status check
    setIsOfflineMode(!navigator.onLine);
    setSyncStatus(navigator.onLine ? 'online' : 'offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Layer management handlers
  const handleLayerToggle = (layerId, visible) => {
    if (visible) {
      setSelectedLayers(prev => [...prev, layerId]);
    } else {
      setSelectedLayers(prev => prev?.filter(id => id !== layerId));
    }
  };

  const handleLayerOpacityChange = (layerId, opacity) => {
    console.log(`Layer ${layerId} opacity changed to ${opacity}%`);
  };

  // Map interaction handlers
  const handleMapClick = (event) => {
    console.log('Map clicked:', event);
  };

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const handleLocationSelect = (location) => {
    setSearchLocation(location);
    setIsSearchPanelVisible(false);
  };

  // Tool handlers
  const handleToolSelect = (toolId) => {
    setActiveTool(toolId);
    
    // Reset modes when switching tools
    if (toolId !== 'measure_distance' && toolId !== 'measure_area') {
      setMeasurementMode(null);
    }
    if (!toolId?.startsWith('draw_')) {
      setDrawingMode(null);
    }
  };

  const handleMeasurementStart = (measurementType) => {
    setMeasurementMode(measurementType);
    setActiveTool(measurementType);
  };

  const handleDrawingStart = (drawingType) => {
    setDrawingMode(drawingType);
    setActiveTool(drawingType);
  };

  const handleAnalysisStart = (analysisType) => {
    console.log(`Starting ${analysisType} analysis`);
    setActiveTool(analysisType);
  };

  const handleMeasurementComplete = (result) => {
    console.log('Measurement completed:', result);
    setMeasurementMode(null);
  };

  const handleDrawingComplete = (result) => {
    console.log('Drawing completed:', result);
    setDrawingMode(null);
  };

  // Feature info handlers
  const handleFeatureEdit = () => {
    console.log('Editing feature:', selectedFeature);
  };

  const handleFeatureDelete = () => {
    console.log('Deleting feature:', selectedFeature);
    setSelectedFeature(null);
  };

  const handleFeatureViewDetails = () => {
    console.log('Viewing details for:', selectedFeature);
    // Navigate to detailed view
    window.location.href = '/claim-verification';
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event?.ctrlKey || event?.metaKey) return;
      
      switch (event?.key?.toLowerCase()) {
        case 'p': handleToolSelect('pan');
          break;
        case 's': handleToolSelect('select');
          break;
        case 'm': handleMeasurementStart('measure_distance');
          break;
        case 'a': handleMeasurementStart('measure_area');
          break;
        case 'f':
          // Fit to bounds
          console.log('Fitting to bounds');
          break;
        case 'escape': setActiveTool('pan');
          setMeasurementMode(null);
          setDrawingMode(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActionsToolbar userRole={userRole} currentPage="Interactive Map" />
      <main className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="px-4 lg:px-6 py-2 border-b border-border bg-card">
          <BreadcrumbNavigation 
            items={breadcrumbItems}
            currentPage="Interactive WebGIS Map"
          />
        </div>

        {/* Status Bar */}
        <div className="px-4 lg:px-6 py-2 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${syncStatus === 'online' ? 'bg-success' : 'bg-warning'}`}></div>
                <span className="text-muted-foreground">
                  {syncStatus === 'online' ? 'Online' : 'Offline Mode'}
                </span>
              </div>
              <div className="text-muted-foreground">
                {selectedLayers?.length} layers active
              </div>
              <div className="text-muted-foreground">
                Tool: {activeTool?.replace('_', ' ')}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isOfflineMode && (
                <Button variant="outline" size="sm">
                  <Icon name="RefreshCw" size={14} className="mr-1" />
                  Sync Data
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={14} className="mr-1" />
                Map Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-[calc(100vh-8rem)] overflow-hidden">
          {/* Main Map Canvas */}
          <MapCanvas
            selectedLayers={selectedLayers}
            mapMode={mapMode}
            onMapClick={handleMapClick}
            onFeatureSelect={handleFeatureSelect}
            searchLocation={searchLocation}
            measurementMode={measurementMode}
            drawingMode={drawingMode}
            onMeasurementComplete={handleMeasurementComplete}
            onDrawingComplete={handleDrawingComplete}
          />

          {/* Layer Control Panel */}
          <LayerControlPanel
            isCollapsed={isLayerPanelCollapsed}
            onToggleCollapse={() => setIsLayerPanelCollapsed(!isLayerPanelCollapsed)}
            selectedLayers={selectedLayers}
            onLayerToggle={handleLayerToggle}
            onLayerOpacityChange={handleLayerOpacityChange}
            onLayerOrderChange={(layers) => setSelectedLayers(layers)}
          />

          {/* Map Toolbar */}
          <MapToolbar
            onToolSelect={handleToolSelect}
            activeTool={activeTool}
            onMeasurementStart={handleMeasurementStart}
            onDrawingStart={handleDrawingStart}
            onAnalysisStart={handleAnalysisStart}
            mapMode={mapMode}
            onMapModeChange={setMapMode}
          />

          {/* Search Location Panel */}
          <SearchLocationPanel
            onLocationSelect={handleLocationSelect}
            onSearchResults={(results) => console.log('Search results:', results)}
            isVisible={isSearchPanelVisible}
            onToggleVisibility={() => setIsSearchPanelVisible(!isSearchPanelVisible)}
          />

          {/* Feature Info Panel */}
          <FeatureInfoPanel
            selectedFeature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
            onEdit={handleFeatureEdit}
            onDelete={handleFeatureDelete}
            onViewDetails={handleFeatureViewDetails}
            userRole={userRole}
          />

          {/* Measurement Tools */}
          <MeasurementTools
            isActive={isMeasurementToolsActive}
            onToggle={() => setIsMeasurementToolsActive(!isMeasurementToolsActive)}
            measurementType={measurementMode}
            onMeasurementTypeChange={setMeasurementMode}
            onMeasurementComplete={handleMeasurementComplete}
            onClearMeasurements={() => setMeasurementMode(null)}
          />

          {/* Loading Overlay */}
          {syncStatus === 'syncing' && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
              <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <p className="font-medium">Syncing map data...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we update the layers</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Help Overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">P</kbd> for Pan</span>
                <span>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">S</kbd> for Select</span>
                <span>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">M</kbd> for Measure</span>
                <span>Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">ESC</kbd> to reset</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InteractiveWebGISMap;