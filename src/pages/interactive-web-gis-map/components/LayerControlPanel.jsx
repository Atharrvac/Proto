import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LayerControlPanel = ({ 
  isCollapsed, 
  onToggleCollapse, 
  selectedLayers, 
  onLayerToggle,
  onLayerOpacityChange,
  onLayerOrderChange 
}) => {
  const [activeTab, setActiveTab] = useState('layers');

  const layerCategories = [
    {
      id: 'base',
      name: 'Base Maps',
      layers: [
        { id: 'satellite', name: 'Satellite Imagery', visible: true, opacity: 100, type: 'raster' },
        { id: 'terrain', name: 'Terrain', visible: false, opacity: 80, type: 'raster' },
        { id: 'streets', name: 'Street Map', visible: false, opacity: 100, type: 'vector' },
        { id: 'hybrid', name: 'Hybrid', visible: false, opacity: 90, type: 'raster' }
      ]
    },
    {
      id: 'administrative',
      name: 'Administrative Boundaries',
      layers: [
        { id: 'states', name: 'State Boundaries', visible: true, opacity: 70, type: 'vector' },
        { id: 'districts', name: 'District Boundaries', visible: true, opacity: 60, type: 'vector' },
        { id: 'blocks', name: 'Block Boundaries', visible: false, opacity: 50, type: 'vector' },
        { id: 'villages', name: 'Village Boundaries', visible: false, opacity: 40, type: 'vector' }
      ]
    },
    {
      id: 'forest',
      name: 'Forest & Environment',
      layers: [
        { id: 'forest_cover', name: 'Forest Cover', visible: true, opacity: 75, type: 'raster' },
        { id: 'protected_areas', name: 'Protected Areas', visible: true, opacity: 80, type: 'vector' },
        { id: 'wildlife_corridors', name: 'Wildlife Corridors', visible: false, opacity: 60, type: 'vector' },
        { id: 'biodiversity_hotspots', name: 'Biodiversity Hotspots', visible: false, opacity: 70, type: 'vector' }
      ]
    },
    {
      id: 'claims',
      name: 'FRA Claims',
      layers: [
        { id: 'pending_claims', name: 'Pending Claims', visible: true, opacity: 90, type: 'vector' },
        { id: 'approved_claims', name: 'Approved Claims', visible: true, opacity: 85, type: 'vector' },
        { id: 'rejected_claims', name: 'Rejected Claims', visible: false, opacity: 70, type: 'vector' },
        { id: 'under_review', name: 'Under Review', visible: true, opacity: 80, type: 'vector' }
      ]
    },
    {
      id: 'analysis',
      name: 'Analysis Layers',
      layers: [
        { id: 'change_detection', name: 'Change Detection', visible: false, opacity: 60, type: 'raster' },
        { id: 'land_use', name: 'Land Use Classification', visible: false, opacity: 70, type: 'raster' },
        { id: 'slope_analysis', name: 'Slope Analysis', visible: false, opacity: 50, type: 'raster' },
        { id: 'drainage_network', name: 'Drainage Network', visible: false, opacity: 60, type: 'vector' }
      ]
    }
  ];

  const handleLayerToggle = (layerId, visible) => {
    if (onLayerToggle) {
      onLayerToggle(layerId, visible);
    }
  };

  const handleOpacityChange = (layerId, opacity) => {
    if (onLayerOpacityChange) {
      onLayerOpacityChange(layerId, opacity);
    }
  };

  const getLayerIcon = (type) => {
    switch (type) {
      case 'raster': return 'Image';
      case 'vector': return 'Map';
      default: return 'Layers';
    }
  };

  const getLayerStats = () => {
    const totalLayers = layerCategories?.reduce((sum, cat) => sum + cat?.layers?.length, 0);
    const visibleLayers = layerCategories?.reduce((sum, cat) => 
      sum + cat?.layers?.filter(layer => layer?.visible)?.length, 0
    );
    return { total: totalLayers, visible: visibleLayers };
  };

  const stats = getLayerStats();

  if (isCollapsed) {
    return (
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={onToggleCollapse}
          className="shadow-lg"
          title="Expand Layer Panel"
        >
          <Icon name="Layers" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 w-80 bg-card border border-border rounded-lg shadow-lg z-10 max-h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Layers" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Layer Control</h3>
            <p className="text-xs text-muted-foreground">
              {stats?.visible} of {stats?.total} layers visible
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          title="Collapse Panel"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'layers' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('layers')}
        >
          <Icon name="Layers" size={14} className="mr-1" />
          Layers
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'legend' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('legend')}
        >
          <Icon name="Info" size={14} className="mr-1" />
          Legend
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'layers' && (
          <div className="p-4 space-y-4">
            {layerCategories?.map((category) => (
              <div key={category?.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">{category?.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      const allVisible = category?.layers?.every(layer => layer?.visible);
                      category?.layers?.forEach(layer => {
                        handleLayerToggle(layer?.id, !allVisible);
                      });
                    }}
                  >
                    Toggle All
                  </Button>
                </div>
                
                <div className="space-y-2 ml-2">
                  {category?.layers?.map((layer) => (
                    <div key={layer?.id} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={layer?.visible}
                          onChange={(e) => handleLayerToggle(layer?.id, e?.target?.checked)}
                        />
                        <Icon 
                          name={getLayerIcon(layer?.type)} 
                          size={14} 
                          className="text-muted-foreground" 
                        />
                        <span className="text-sm text-foreground flex-1">{layer?.name}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6"
                          title="Layer Settings"
                        >
                          <Icon name="Settings" size={12} />
                        </Button>
                      </div>
                      
                      {layer?.visible && (
                        <div className="ml-6 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground w-16">Opacity:</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={layer?.opacity}
                              onChange={(e) => handleOpacityChange(layer?.id, parseInt(e?.target?.value))}
                              className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-muted-foreground w-8">{layer?.opacity}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'legend' && (
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">FRA Claim Status</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded border"></div>
                  <span className="text-sm">Approved Claims</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
                  <span className="text-sm">Pending Claims</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded border"></div>
                  <span className="text-sm">Under Review</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded border"></div>
                  <span className="text-sm">Rejected Claims</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Forest Types</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-800 rounded border"></div>
                  <span className="text-sm">Dense Forest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded border"></div>
                  <span className="text-sm">Moderate Forest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-400 rounded border"></div>
                  <span className="text-sm">Open Forest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-600 rounded border"></div>
                  <span className="text-sm">Scrubland</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Administrative</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-red-600 border"></div>
                  <span className="text-sm">State Boundary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-blue-600 border"></div>
                  <span className="text-sm">District Boundary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-gray-600 border border-dashed"></div>
                  <span className="text-sm">Block Boundary</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="RefreshCw" size={14} className="mr-1" />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LayerControlPanel;