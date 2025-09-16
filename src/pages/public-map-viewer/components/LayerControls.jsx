import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const LayerControls = ({ layers, onLayerToggle, isVisible, onToggle }) => {
  const [activeTab, setActiveTab] = useState('layers');

  const layerCategories = {
    forest: {
      title: "Forest Layers",
      icon: "Trees",
      layers: [
        { id: 'dense-forest', name: 'Dense Forest', visible: true, opacity: 0.8 },
        { id: 'moderate-forest', name: 'Moderate Forest', visible: true, opacity: 0.7 },
        { id: 'open-forest', name: 'Open Forest', visible: true, opacity: 0.6 },
        { id: 'scrub-land', name: 'Scrub Land', visible: false, opacity: 0.5 }
      ]
    },
    claims: {
      title: "Claims Data",
      icon: "FileText",
      layers: [
        { id: 'approved-claims', name: 'Approved Claims', visible: true, opacity: 0.9 },
        { id: 'pending-claims', name: 'Under Review', visible: false, opacity: 0.7 },
        { id: 'community-claims', name: 'Community Rights', visible: true, opacity: 0.8 },
        { id: 'individual-claims', name: 'Individual Rights', visible: true, opacity: 0.8 }
      ]
    },
    boundaries: {
      title: "Boundaries",
      icon: "MapPin",
      layers: [
        { id: 'state-boundary', name: 'State Boundary', visible: true, opacity: 1.0 },
        { id: 'district-boundary', name: 'District Boundary', visible: true, opacity: 0.8 },
        { id: 'block-boundary', name: 'Block Boundary', visible: false, opacity: 0.6 },
        { id: 'village-boundary', name: 'Village Boundary', visible: false, opacity: 0.5 }
      ]
    }
  };

  const baseMaps = [
    { id: 'satellite', name: 'Satellite', active: false },
    { id: 'terrain', name: 'Terrain', active: true },
    { id: 'streets', name: 'Streets', active: false }
  ];

  const handleLayerToggle = (layerId, visible) => {
    if (onLayerToggle) {
      onLayerToggle(layerId, visible);
    }
  };

  const handleOpacityChange = (layerId, opacity) => {
    // Handle opacity change
    console.log(`Opacity changed for ${layerId}: ${opacity}`);
  };

  if (!isVisible) {
    return (
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="default"
          size="sm"
          onClick={onToggle}
          className="bg-card border border-border elevation-2"
        >
          <Icon name="Layers" size={16} className="mr-2" />
          Layers
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-4 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-3 z-10">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Layers" size={18} className="mr-2" />
          Map Layers
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-6 h-6"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-smooth ${
            activeTab === 'layers' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('layers')}
        >
          Data Layers
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-smooth ${
            activeTab === 'basemap' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('basemap')}
        >
          Base Map
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'layers' && (
          <div className="p-2 space-y-4">
            {Object.entries(layerCategories)?.map(([key, category]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center space-x-2 px-2 py-1">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                  <span className="font-medium text-foreground text-sm">{category?.title}</span>
                </div>
                
                <div className="space-y-2 pl-6">
                  {category?.layers?.map((layer) => (
                    <div key={layer?.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Checkbox
                          label={layer?.name}
                          checked={layer?.visible}
                          onChange={(e) => handleLayerToggle(layer?.id, e?.target?.checked)}
                          className="text-sm"
                        />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(layer?.opacity * 100)}%
                        </span>
                      </div>
                      
                      {layer?.visible && (
                        <div className="ml-6">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={layer?.opacity}
                            onChange={(e) => handleOpacityChange(layer?.id, parseFloat(e?.target?.value))}
                            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'basemap' && (
          <div className="p-4 space-y-3">
            {baseMaps?.map((baseMap) => (
              <div key={baseMap?.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={baseMap?.id}
                  name="basemap"
                  checked={baseMap?.active}
                  onChange={() => console.log(`Basemap changed to: ${baseMap?.id}`)}
                  className="w-4 h-4 text-primary"
                />
                <label htmlFor={baseMap?.id} className="text-sm font-medium text-foreground cursor-pointer">
                  {baseMap?.name}
                </label>
              </div>
            ))}
            
            <div className="pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <Icon name="Info" size={12} className="inline mr-1" />
                Base map affects the background imagery and terrain visualization
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerControls;