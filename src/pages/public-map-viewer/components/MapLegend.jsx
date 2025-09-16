import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapLegend = ({ layers, onLayerToggle, isVisible, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState({
    forest: true,
    claims: true,
    boundaries: false
  });

  const legendData = {
    forest: {
      title: "Forest Types",
      items: [
        { color: "#2D5016", label: "Dense Forest", description: "Crown density >70%" },
        { color: "#4A7C23", label: "Moderate Forest", description: "Crown density 40-70%" },
        { color: "#7BA428", label: "Open Forest", description: "Crown density 10-40%" },
        { color: "#A8CC3A", label: "Scrub Land", description: "Degraded forest areas" }
      ]
    },
    claims: {
      title: "Forest Rights Claims",
      items: [
        { color: "#1B5E20", label: "Approved Claims", description: "Titles granted" },
        { color: "#FF8F00", label: "Under Review", description: "Committee evaluation" },
        { color: "#2196F3", label: "Community Claims", description: "Gram Sabha rights" },
        { color: "#9C27B0", label: "Individual Claims", description: "Personal holdings" }
      ]
    },
    boundaries: {
      title: "Administrative Boundaries",
      items: [
        { color: "#E91E63", label: "State Boundary", description: "State administrative limits" },
        { color: "#FF5722", label: "District Boundary", description: "District administrative limits" },
        { color: "#795548", label: "Block Boundary", description: "Block administrative limits" },
        { color: "#607D8B", label: "Village Boundary", description: "Gram Sabha limits" }
      ]
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  if (!isVisible) {
    return (
      <div className="absolute bottom-4 left-4 z-10">
        <Button
          variant="default"
          size="sm"
          onClick={onToggle}
          className="bg-card border border-border elevation-2"
        >
          <Icon name="Map" size={16} className="mr-2" />
          Legend
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-3 z-10">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Map" size={18} className="mr-2" />
          Map Legend
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
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(legendData)?.map(([key, section]) => (
          <div key={key} className="border-b border-border last:border-b-0">
            <button
              className="flex items-center justify-between w-full p-3 text-left hover:bg-muted/50 transition-smooth"
              onClick={() => toggleSection(key)}
            >
              <span className="font-medium text-foreground">{section?.title}</span>
              <Icon 
                name={expandedSections?.[key] ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            
            {expandedSections?.[key] && (
              <div className="px-3 pb-3 space-y-2">
                {section?.items?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded border border-border flex-shrink-0"
                      style={{ backgroundColor: item?.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{item?.label}</div>
                      <div className="text-xs text-muted-foreground">{item?.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="text-xs text-muted-foreground">
          <Icon name="Info" size={12} className="inline mr-1" />
          Data updated: September 2025 | Source: Forest Department
        </div>
      </div>
    </div>
  );
};

export default MapLegend;