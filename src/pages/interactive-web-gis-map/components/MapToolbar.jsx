import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapToolbar = ({ 
  onToolSelect, 
  activeTool, 
  onMeasurementStart,
  onDrawingStart,
  onAnalysisStart,
  mapMode,
  onMapModeChange 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeToolGroup, setActiveToolGroup] = useState('navigation');

  const toolGroups = [
    {
      id: 'navigation',
      name: 'Navigation',
      tools: [
        { id: 'pan', name: 'Pan', icon: 'Move', shortcut: 'P' },
        { id: 'zoom_in', name: 'Zoom In', icon: 'ZoomIn', shortcut: '+' },
        { id: 'zoom_out', name: 'Zoom Out', icon: 'ZoomOut', shortcut: '-' },
        { id: 'fit_bounds', name: 'Fit to Bounds', icon: 'Maximize2', shortcut: 'F' }
      ]
    },
    {
      id: 'selection',
      name: 'Selection',
      tools: [
        { id: 'select', name: 'Select Features', icon: 'MousePointer', shortcut: 'S' },
        { id: 'select_box', name: 'Box Select', icon: 'Square', shortcut: 'B' },
        { id: 'select_polygon', name: 'Polygon Select', icon: 'Pentagon', shortcut: 'Shift+S' },
        { id: 'identify', name: 'Identify', icon: 'Info', shortcut: 'I' }
      ]
    },
    {
      id: 'measurement',
      name: 'Measurement',
      tools: [
        { id: 'measure_distance', name: 'Measure Distance', icon: 'Ruler', shortcut: 'M' },
        { id: 'measure_area', name: 'Measure Area', icon: 'Square', shortcut: 'A' },
        { id: 'measure_bearing', name: 'Measure Bearing', icon: 'Compass', shortcut: 'C' },
        { id: 'coordinates', name: 'Get Coordinates', icon: 'MapPin', shortcut: 'G' }
      ]
    },
    {
      id: 'drawing',
      name: 'Drawing & Annotation',
      tools: [
        { id: 'draw_point', name: 'Draw Point', icon: 'Circle', shortcut: 'Ctrl+P' },
        { id: 'draw_line', name: 'Draw Line', icon: 'Minus', shortcut: 'Ctrl+L' },
        { id: 'draw_polygon', name: 'Draw Polygon', icon: 'Pentagon', shortcut: 'Ctrl+D' },
        { id: 'draw_rectangle', name: 'Draw Rectangle', icon: 'Square', shortcut: 'Ctrl+R' },
        { id: 'add_text', name: 'Add Text', icon: 'Type', shortcut: 'T' },
        { id: 'add_arrow', name: 'Add Arrow', icon: 'ArrowRight', shortcut: 'Ctrl+A' }
      ]
    },
    {
      id: 'analysis',
      name: 'Analysis',
      tools: [
        { id: 'buffer', name: 'Buffer Analysis', icon: 'Circle', shortcut: 'Ctrl+B' },
        { id: 'overlay', name: 'Overlay Analysis', icon: 'Layers', shortcut: 'Ctrl+O' },
        { id: 'proximity', name: 'Proximity Analysis', icon: 'Target', shortcut: 'Ctrl+X' },
        { id: 'statistics', name: 'Spatial Statistics', icon: 'BarChart3', shortcut: 'Ctrl+S' }
      ]
    },
    {
      id: 'export',
      name: 'Export & Share',
      tools: [
        { id: 'print', name: 'Print Map', icon: 'Printer', shortcut: 'Ctrl+P' },
        { id: 'export_image', name: 'Export as Image', icon: 'Image', shortcut: 'Ctrl+E' },
        { id: 'export_pdf', name: 'Export as PDF', icon: 'FileText', shortcut: 'Ctrl+Shift+P' },
        { id: 'share_link', name: 'Share Link', icon: 'Share2', shortcut: 'Ctrl+Shift+S' }
      ]
    }
  ];

  const mapModes = [
    { id: '2d', name: '2D View', icon: 'Map' },
    { id: '3d', name: '3D View', icon: 'Box' },
    { id: 'street', name: 'Street View', icon: 'Navigation' },
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' }
  ];

  const handleToolClick = (tool) => {
    if (onToolSelect) {
      onToolSelect(tool?.id);
    }

    // Handle specific tool actions
    switch (tool?.id) {
      case 'measure_distance': case'measure_area': case'measure_bearing':
        if (onMeasurementStart) {
          onMeasurementStart(tool?.id);
        }
        break;
      case 'draw_point': case'draw_line': case'draw_polygon': case'draw_rectangle':
        if (onDrawingStart) {
          onDrawingStart(tool?.id);
        }
        break;
      case 'buffer': case'overlay': case'proximity': case'statistics':
        if (onAnalysisStart) {
          onAnalysisStart(tool?.id);
        }
        break;
      case 'print':
        window.print();
        break;
      case 'export_image':
        console.log('Exporting map as image...');
        break;
      case 'share_link':
        navigator.clipboard?.writeText(window.location?.href);
        break;
    }
  };

  const getCurrentModeIcon = () => {
    const currentMode = mapModes?.find(mode => mode?.id === mapMode);
    return currentMode ? currentMode?.icon : 'Map';
  };

  return (
    <>
      {/* Main Toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-card border border-border rounded-lg shadow-lg p-2">
          <div className="flex items-center space-x-1">
            {/* Map Mode Selector */}
            <div className="flex items-center space-x-1 pr-2 border-r border-border">
              <Button
                variant={mapMode === '2d' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => onMapModeChange && onMapModeChange('2d')}
                title="2D View"
              >
                <Icon name="Map" size={16} />
              </Button>
              <Button
                variant={mapMode === '3d' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => onMapModeChange && onMapModeChange('3d')}
                title="3D View"
              >
                <Icon name="Box" size={16} />
              </Button>
            </div>

            {/* Quick Tools */}
            <Button
              variant={activeTool === 'pan' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleToolClick({ id: 'pan', name: 'Pan' })}
              title="Pan (P)"
            >
              <Icon name="Move" size={16} />
            </Button>
            
            <Button
              variant={activeTool === 'select' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleToolClick({ id: 'select', name: 'Select' })}
              title="Select (S)"
            >
              <Icon name="MousePointer" size={16} />
            </Button>

            <Button
              variant={activeTool === 'measure_distance' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleToolClick({ id: 'measure_distance', name: 'Measure Distance' })}
              title="Measure Distance (M)"
            >
              <Icon name="Ruler" size={16} />
            </Button>

            <Button
              variant={activeTool === 'draw_polygon' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleToolClick({ id: 'draw_polygon', name: 'Draw Polygon' })}
              title="Draw Polygon (Ctrl+D)"
            >
              <Icon name="Pentagon" size={16} />
            </Button>

            {/* More Tools Toggle */}
            <div className="pl-2 border-l border-border">
              <Button
                variant={isExpanded ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                title="More Tools"
              >
                <Icon name="MoreHorizontal" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Expanded Toolbar */}
      {isExpanded && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 w-96">
            {/* Tool Group Tabs */}
            <div className="flex flex-wrap gap-1 mb-4 border-b border-border pb-2">
              {toolGroups?.map((group) => (
                <button
                  key={group?.id}
                  className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                    activeToolGroup === group?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setActiveToolGroup(group?.id)}
                >
                  {group?.name}
                </button>
              ))}
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-4 gap-2">
              {toolGroups?.find(group => group?.id === activeToolGroup)
                ?.tools?.map((tool) => (
                  <Button
                    key={tool?.id}
                    variant={activeTool === tool?.id ? 'default' : 'ghost'}
                    size="sm"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => handleToolClick(tool)}
                    title={`${tool?.name} (${tool?.shortcut})`}
                  >
                    <Icon name={tool?.icon} size={16} className="mb-1" />
                    <span className="text-xs text-center leading-tight">{tool?.name}</span>
                  </Button>
                ))}
            </div>

            {/* Close Button */}
            <div className="flex justify-end mt-4 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={14} className="mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Tool Status */}
      {activeTool && activeTool !== 'pan' && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={14} />
              <span className="text-sm font-medium">
                {activeTool === 'measure_distance' && 'Click to start measuring distance'}
                {activeTool === 'measure_area' && 'Click to start measuring area'}
                {activeTool === 'draw_polygon' && 'Click to start drawing polygon'}
                {activeTool === 'select' && 'Click to select features'}
                {activeTool === 'identify' && 'Click on features to identify'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => onToolSelect && onToolSelect('pan')}
              >
                <Icon name="X" size={12} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapToolbar;