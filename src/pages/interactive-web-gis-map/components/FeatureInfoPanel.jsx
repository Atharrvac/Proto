import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureInfoPanel = ({ 
  selectedFeature, 
  onClose, 
  onEdit, 
  onDelete, 
  onViewDetails,
  userRole = 'Field Officer' 
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);

  if (!selectedFeature) return null;

  const mockClaimDetails = {
    id: 'FR2025001',
    claimant: 'Ramesh Kumar',
    fatherName: 'Suresh Kumar',
    village: 'Khandwa',
    district: 'Khandwa',
    state: 'Madhya Pradesh',
    surveyNumber: 'Survey No. 45/2',
    area: 2.5,
    claimType: 'Individual Forest Rights',
    status: 'pending',
    submissionDate: '2025-01-10',
    lastUpdated: '2025-01-12',
    coordinates: [76.3520, 21.8350],
    documents: [
      { name: 'Application Form', type: 'PDF', size: '2.3 MB', status: 'verified' },
      { name: 'Survey Settlement Record', type: 'PDF', size: '1.8 MB', status: 'pending' },
      { name: 'Community Certificate', type: 'PDF', size: '0.9 MB', status: 'verified' },
      { name: 'Satellite Imagery', type: 'TIFF', size: '15.2 MB', status: 'verified' }
    ],
    timeline: [
      { date: '2025-01-10', event: 'Claim submitted by claimant', user: 'Ramesh Kumar' },
      { date: '2025-01-11', event: 'Initial verification completed', user: 'Field Officer' },
      { date: '2025-01-12', event: 'Forwarded to committee review', user: 'District Officer' },
      { date: '2025-01-13', event: 'Pending committee decision', user: 'System' }
    ],
    verification: {
      fieldVerification: 'completed',
      documentVerification: 'completed',
      boundaryVerification: 'pending',
      communityConsent: 'obtained',
      environmentalClearance: 'not_required'
    },
    gisData: {
      area: '2.47 hectares',
      perimeter: '628.5 meters',
      forestType: 'Mixed Deciduous',
      forestDensity: 'Moderate',
      slope: '5-15 degrees',
      elevation: '450-480 meters',
      waterBodies: 'Seasonal stream nearby',
      accessibility: 'Accessible by foot path'
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected': return 'text-error bg-error/10 border-error/20';
      case 'under_review': return 'text-primary bg-primary/10 border-primary/20';
      case 'verified': return 'text-success bg-success/10 border-success/20';
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'obtained': return 'text-success bg-success/10 border-success/20';
      case 'not_required': return 'text-muted-foreground bg-muted/50 border-border';
      default: return 'text-muted-foreground bg-muted/50 border-border';
    }
  };

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'PDF': return 'FileText';
      case 'TIFF': return 'Image';
      case 'DOC': return 'FileText';
      default: return 'File';
    }
  };

  const canEdit = userRole === 'Field Officer' || userRole === 'Administrator';
  const canDelete = userRole === 'Administrator';

  return (
    <div className="absolute top-4 right-4 w-96 bg-card border border-border rounded-lg shadow-lg z-20 max-h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">{mockClaimDetails?.id}</h3>
            <p className="text-xs text-muted-foreground">FRA Claim Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {canEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
              title="Edit Claim"
            >
              <Icon name="Edit" size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Close Panel"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Status Bar */}
      <div className="px-4 py-2 border-b border-border">
        <div className="flex items-center justify-between">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(mockClaimDetails?.status)}`}
          >
            {mockClaimDetails?.status?.replace('_', ' ')?.toUpperCase()}
          </span>
          <div className="text-xs text-muted-foreground">
            Updated: {mockClaimDetails?.lastUpdated}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {['details', 'documents', 'timeline', 'gis']?.map((tab) => (
          <button
            key={tab}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'details' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Claimant</label>
                <p className="font-medium">{mockClaimDetails?.claimant}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Father's Name</label>
                <p className="font-medium">{mockClaimDetails?.fatherName}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Village</label>
                <p className="font-medium">{mockClaimDetails?.village}</p>
              </div>
              <div>
                <label className="text-muted-foreground">District</label>
                <p className="font-medium">{mockClaimDetails?.district}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Survey Number</label>
                <p className="font-medium">{mockClaimDetails?.surveyNumber}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Area</label>
                <p className="font-medium">{mockClaimDetails?.area} hectares</p>
              </div>
              <div className="col-span-2">
                <label className="text-muted-foreground">Claim Type</label>
                <p className="font-medium">{mockClaimDetails?.claimType}</p>
              </div>
              <div className="col-span-2">
                <label className="text-muted-foreground">Coordinates</label>
                <p className="font-medium font-mono text-xs">
                  {mockClaimDetails?.coordinates?.[1]?.toFixed(6)}°N, {mockClaimDetails?.coordinates?.[0]?.toFixed(6)}°E
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-2">Verification Status</h4>
              <div className="space-y-2">
                {Object.entries(mockClaimDetails?.verification)?.map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.toLowerCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(value)}`}>
                      {value?.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="p-4">
            <div className="space-y-3">
              {mockClaimDetails?.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name={getDocumentIcon(doc?.type)} size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium">{doc?.name}</p>
                      <p className="text-xs text-muted-foreground">{doc?.type} • {doc?.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(doc?.status)}`}>
                      {doc?.status}
                    </span>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <Icon name="Download" size={12} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {canEdit && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="Upload" size={14} className="mr-2" />
                  Upload Document
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="p-4">
            <div className="space-y-4">
              {mockClaimDetails?.timeline?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event?.event}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">by {event?.user}</p>
                      <p className="text-xs text-muted-foreground">{event?.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gis' && (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Spatial Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(mockClaimDetails?.gisData)?.map(([key, value]) => (
                  <div key={key}>
                    <label className="text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.toLowerCase()}
                    </label>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={14} className="mr-1" />
                  Export KML
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Map" size={14} className="mr-1" />
                  View in 3D
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Ruler" size={14} className="mr-1" />
                  Measure
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Camera" size={14} className="mr-1" />
                  Capture
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            <Icon name="ExternalLink" size={14} className="mr-1" />
            Full Details
          </Button>
          {canEdit && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={onEdit}
            >
              <Icon name="Edit" size={14} className="mr-1" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onDelete}
            >
              <Icon name="Trash2" size={14} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureInfoPanel;