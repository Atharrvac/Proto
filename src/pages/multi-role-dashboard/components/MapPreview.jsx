import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapPreview = ({ userRole = 'Field Officer' }) => {
  const [selectedLayer, setSelectedLayer] = useState('claims');

  const mapLayers = [
    { id: 'claims', label: 'Claims', icon: 'FileText', color: 'bg-primary' },
    { id: 'forest', label: 'Forest Cover', icon: 'TreePine', color: 'bg-success' },
    { id: 'boundaries', label: 'Boundaries', icon: 'Square', color: 'bg-accent' },
    { id: 'settlements', label: 'Settlements', icon: 'Home', color: 'bg-secondary' }
  ];

  const roleBasedData = {
    'Field Officer': {
      region: 'Khandwa District, Madhya Pradesh',
      coordinates: '22.0797,76.3500',
      hotspots: [
        { id: 1, name: 'Village Khandwa', claims: 12, lat: 22.0797, lng: 76.3500, status: 'pending' },
        { id: 2, name: 'Village Pandhana', claims: 8, lat: 22.1234, lng: 76.4567, status: 'verified' },
        { id: 3, name: 'Village Khalwa', claims: 15, lat: 22.0456, lng: 76.2890, status: 'review' }
      ]
    },
    'Committee Member': {
      region: 'Madhya Pradesh State',
      coordinates: '23.2599,77.4126',
      hotspots: [
        { id: 1, name: 'Khandwa District', claims: 89, lat: 22.0797, lng: 76.3500, status: 'pending' },
        { id: 2, name: 'Indore District', claims: 156, lat: 22.7196, lng: 75.8577, status: 'review' },
        { id: 3, name: 'Bhopal District', claims: 234, lat: 23.2599, lng: 77.4126, status: 'approved' }
      ]
    },
    'Administrator': {
      region: 'All India',
      coordinates: '20.5937,78.9629',
      hotspots: [
        { id: 1, name: 'Madhya Pradesh', claims: 1247, lat: 23.2599, lng: 77.4126, status: 'active' },
        { id: 2, name: 'Odisha', claims: 892, lat: 20.9517, lng: 85.0985, status: 'active' },
        { id: 3, name: 'Jharkhand', claims: 634, lat: 23.6102, lng: 85.2799, status: 'active' }
      ]
    },
    'Public Viewer': {
      region: 'Public Forest Areas',
      coordinates: '20.5937,78.9629',
      hotspots: [
        { id: 1, name: 'Protected Areas', claims: 456, lat: 20.5937, lng: 78.9629, status: 'public' },
        { id: 2, name: 'Community Forests', claims: 234, lat: 21.2787, lng: 81.8661, status: 'public' },
        { id: 3, name: 'Reserved Forests', claims: 189, lat: 19.0760, lng: 72.8777, status: 'public' }
      ]
    }
  };

  const currentData = roleBasedData?.[userRole] || roleBasedData?.['Field Officer'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'verified': return 'bg-success';
      case 'review': return 'bg-accent';
      case 'approved': return 'bg-primary';
      case 'active': return 'bg-success';
      case 'public': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const handleFullMapView = () => {
    window.location.href = '/interactive-web-gis-map';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Map Overview</h3>
            <p className="text-sm text-muted-foreground">{currentData?.region}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFullMapView}
            iconName="Maximize2"
            iconPosition="right"
          >
            Full Map
          </Button>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {mapLayers?.map((layer) => (
            <button
              key={layer?.id}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-smooth whitespace-nowrap ${
                selectedLayer === layer?.id
                  ? `${layer?.color} text-white`
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => setSelectedLayer(layer?.id)}
            >
              <Icon name={layer?.icon} size={14} />
              <span>{layer?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-80 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={currentData?.region}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${currentData?.coordinates}&z=10&output=embed`}
          className="border-0"
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="outline" size="icon" className="bg-card/90 backdrop-blur-sm">
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-card/90 backdrop-blur-sm">
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button variant="outline" size="icon" className="bg-card/90 backdrop-blur-sm">
            <Icon name="Layers" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <h4 className="text-xs font-medium text-foreground mb-2">Active Hotspots</h4>
          <div className="space-y-1">
            {currentData?.hotspots?.slice(0, 3)?.map((hotspot) => (
              <div key={hotspot?.id} className="flex items-center space-x-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(hotspot?.status)}`} />
                <span className="text-foreground font-medium">{hotspot?.name}</span>
                <span className="text-muted-foreground">({hotspot?.claims})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Map Statistics */}
      <div className="p-4 bg-muted/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{currentData?.hotspots?.reduce((sum, h) => sum + h?.claims, 0)}</p>
            <p className="text-xs text-muted-foreground">Total Claims</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{currentData?.hotspots?.length}</p>
            <p className="text-xs text-muted-foreground">Active Areas</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {Math.round(currentData?.hotspots?.reduce((sum, h) => sum + h?.claims, 0) / currentData?.hotspots?.length)}
            </p>
            <p className="text-xs text-muted-foreground">Avg per Area</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPreview;