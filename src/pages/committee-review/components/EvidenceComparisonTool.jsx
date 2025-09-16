import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EvidenceComparisonTool = ({ claim, onClose }) => {
  const [leftDocument, setLeftDocument] = useState('');
  const [rightDocument, setRightDocument] = useState('');
  const [comparisonMode, setComparisonMode] = useState('side-by-side');
  const [zoomLevel, setZoomLevel] = useState(100);

  const documents = [
    { value: 'application', label: 'Application Form', type: 'PDF', url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600' },
    { value: 'survey', label: 'Survey Settlement Record', type: 'PDF', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600' },
    { value: 'satellite', label: 'Satellite Imagery', type: 'Image', url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600' },
    { value: 'field_report', label: 'Field Verification Report', type: 'PDF', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600' },
    { value: 'community_cert', label: 'Community Certificate', type: 'PDF', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600' },
    { value: 'boundary_map', label: 'Boundary Map', type: 'Image', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600' }
  ];

  const comparisonModes = [
    { value: 'side-by-side', label: 'Side by Side' },
    { value: 'overlay', label: 'Overlay' },
    { value: 'difference', label: 'Difference View' }
  ];

  const annotations = [
    {
      id: 1,
      x: 45,
      y: 30,
      type: 'boundary',
      label: 'Northern Boundary',
      description: 'Matches survey records',
      status: 'verified'
    },
    {
      id: 2,
      x: 60,
      y: 70,
      type: 'structure',
      label: 'Dwelling Structure',
      description: 'Visible in satellite imagery',
      status: 'verified'
    },
    {
      id: 3,
      x: 25,
      y: 50,
      type: 'discrepancy',
      label: 'Area Discrepancy',
      description: 'Minor difference in measurement',
      status: 'flagged'
    }
  ];

  const getDocumentUrl = (docValue) => {
    const doc = documents?.find(d => d?.value === docValue);
    return doc ? doc?.url : '';
  };

  const getAnnotationColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-success text-success-foreground';
      case 'flagged': return 'bg-warning text-warning-foreground';
      case 'error': return 'bg-error text-error-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Compare" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Evidence Comparison</h3>
            <p className="text-sm text-muted-foreground">Claim #{claim?.id}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Controls */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Left Document"
            options={documents}
            value={leftDocument}
            onChange={setLeftDocument}
            placeholder="Select document..."
          />
          <Select
            label="Right Document"
            options={documents}
            value={rightDocument}
            onChange={setRightDocument}
            placeholder="Select document..."
          />
          <Select
            label="Comparison Mode"
            options={comparisonModes}
            value={comparisonMode}
            onChange={setComparisonMode}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <Icon name="ZoomOut" size={16} />
            </Button>
            <span className="text-sm font-medium px-3 py-1 bg-muted rounded-md">
              {zoomLevel}%
            </span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <Icon name="ZoomIn" size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetZoom}>
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share" size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
      {/* Comparison View */}
      <div className="flex-1 overflow-hidden">
        {!leftDocument || !rightDocument ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium text-foreground mb-2">Select Documents to Compare</h4>
              <p className="text-sm text-muted-foreground">
                Choose two documents from the dropdowns above to start comparison
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full p-4">
            {comparisonMode === 'side-by-side' && (
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/30 border-b border-border">
                    <h4 className="font-medium text-foreground">
                      {documents?.find(d => d?.value === leftDocument)?.label}
                    </h4>
                  </div>
                  <div className="relative h-full overflow-auto">
                    <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                      <Image
                        src={getDocumentUrl(leftDocument)}
                        alt="Left document"
                        className="w-full h-auto"
                      />
                      {/* Annotations for left document */}
                      {annotations?.map((annotation) => (
                        <div
                          key={`left-${annotation?.id}`}
                          className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${getAnnotationColor(annotation?.status)}`}
                          style={{ left: `${annotation?.x}%`, top: `${annotation?.y}%` }}
                          title={`${annotation?.label}: ${annotation?.description}`}
                        >
                          {annotation?.id}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="p-3 bg-muted/30 border-b border-border">
                    <h4 className="font-medium text-foreground">
                      {documents?.find(d => d?.value === rightDocument)?.label}
                    </h4>
                  </div>
                  <div className="relative h-full overflow-auto">
                    <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                      <Image
                        src={getDocumentUrl(rightDocument)}
                        alt="Right document"
                        className="w-full h-auto"
                      />
                      {/* Annotations for right document */}
                      {annotations?.map((annotation) => (
                        <div
                          key={`right-${annotation?.id}`}
                          className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer ${getAnnotationColor(annotation?.status)}`}
                          style={{ left: `${annotation?.x}%`, top: `${annotation?.y}%` }}
                          title={`${annotation?.label}: ${annotation?.description}`}
                        >
                          {annotation?.id}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {comparisonMode === 'overlay' && (
              <div className="border border-border rounded-lg overflow-hidden h-full">
                <div className="p-3 bg-muted/30 border-b border-border">
                  <h4 className="font-medium text-foreground">Overlay Comparison</h4>
                </div>
                <div className="relative h-full overflow-auto">
                  <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
                    <div className="relative">
                      <Image
                        src={getDocumentUrl(leftDocument)}
                        alt="Base document"
                        className="w-full h-auto"
                      />
                      <Image
                        src={getDocumentUrl(rightDocument)}
                        alt="Overlay document"
                        className="absolute top-0 left-0 w-full h-auto opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Annotations Panel */}
      {(leftDocument || rightDocument) && (
        <div className="border-t border-border p-4">
          <h4 className="font-medium text-foreground mb-3">Annotations</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {annotations?.map((annotation) => (
              <div key={annotation?.id} className="flex items-center space-x-3 p-2 border border-border rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getAnnotationColor(annotation?.status)}`}>
                  {annotation?.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">{annotation?.label}</p>
                  <p className="text-xs text-muted-foreground">{annotation?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceComparisonTool;