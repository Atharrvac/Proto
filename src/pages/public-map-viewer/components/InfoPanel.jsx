import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InfoPanel = ({ selectedFeature, onClose, isVisible }) => {
  const [activeTab, setActiveTab] = useState('details');

  const mockFeatureData = {
    type: 'Approved Claim',
    claimId: 'FR/MP/2024/001234',
    area: '2.5 hectares',
    claimType: 'Individual Forest Rights',
    status: 'Title Granted',
    approvalDate: '15/08/2024',
    village: 'Khandwa Village',
    district: 'Khandwa',
    state: 'Madhya Pradesh',
    forestType: 'Dense Forest',
    coordinates: '21.8245°N, 76.3502°E',
    elevation: '320 meters',
    details: {
      rightType: 'Habitation and Cultivation Rights',
      beneficiaryType: 'Individual',
      landUse: 'Agricultural and Residential',
      soilType: 'Red Sandy Loam',
      waterSource: 'Seasonal Stream',
      accessibility: 'Motorable Road within 2km'
    },
    statistics: {
      totalClaims: 1247,
      approvedClaims: 892,
      pendingClaims: 234,
      rejectedClaims: 121,
      averageProcessingTime: '8 months'
    }
  };

  const educationalContent = {
    title: "Understanding Forest Rights Act",
    sections: [
      {
        title: "What are Forest Rights?",
        content: `The Forest Rights Act, 2006 recognizes the rights of forest dwelling tribal communities and other traditional forest dwellers to forest resources, on which these communities were dependent for a variety of needs.`
      },
      {
        title: "Types of Rights",
        content: `Individual Forest Rights (IFR): Rights to cultivate and live in forest areas.\nCommunity Forest Rights (CFR): Rights of communities to protect, regenerate, conserve or manage community forest resources.`
      },
      {
        title: "Claim Process",
        content: `1. Application submission to Gram Sabha\n2. Verification by Forest Rights Committee\n3. Approval by Gram Sabha\n4. Verification by Sub-Divisional Level Committee\n5. Final approval by District Level Committee`
      }
    ]
  };

  if (!isVisible || !selectedFeature) {
    return null;
  }

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-3 z-20">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Info" size={18} className="mr-2" />
          Feature Information
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-6 h-6"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-smooth ${
            activeTab === 'details' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-smooth ${
            activeTab === 'statistics' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-smooth ${
            activeTab === 'education' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('education')}
        >
          Learn
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'details' && (
          <div className="p-4 space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Status</span>
              <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                {mockFeatureData?.status}
              </span>
            </div>

            {/* Basic Information */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Claim ID:</span>
                  <div className="font-medium text-foreground">{mockFeatureData?.claimId}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Area:</span>
                  <div className="font-medium text-foreground">{mockFeatureData?.area}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <div className="font-medium text-foreground">{mockFeatureData?.claimType}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Approved:</span>
                  <div className="font-medium text-foreground">{mockFeatureData?.approvalDate}</div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="pt-3 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Location</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Village:</span>
                  <span className="font-medium text-foreground">{mockFeatureData?.village}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">District:</span>
                  <span className="font-medium text-foreground">{mockFeatureData?.district}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">State:</span>
                  <span className="font-medium text-foreground">{mockFeatureData?.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="font-medium text-foreground font-mono text-xs">{mockFeatureData?.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="pt-3 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Additional Details</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(mockFeatureData?.details)?.map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">
                      {key?.replace(/([A-Z])/g, ' $1')?.trim()}:
                    </span>
                    <span className="font-medium text-foreground text-right max-w-48">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="p-4 space-y-4">
            <h4 className="font-medium text-foreground">Regional Statistics</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-3 rounded-lg">
                <div className="text-2xl font-bold text-primary">{mockFeatureData?.statistics?.totalClaims}</div>
                <div className="text-xs text-muted-foreground">Total Claims</div>
              </div>
              <div className="bg-success/5 p-3 rounded-lg">
                <div className="text-2xl font-bold text-success">{mockFeatureData?.statistics?.approvedClaims}</div>
                <div className="text-xs text-muted-foreground">Approved</div>
              </div>
              <div className="bg-warning/5 p-3 rounded-lg">
                <div className="text-2xl font-bold text-warning">{mockFeatureData?.statistics?.pendingClaims}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="bg-error/5 p-3 rounded-lg">
                <div className="text-2xl font-bold text-error">{mockFeatureData?.statistics?.rejectedClaims}</div>
                <div className="text-xs text-muted-foreground">Rejected</div>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Processing Time:</span>
                <span className="font-medium text-foreground">{mockFeatureData?.statistics?.averageProcessingTime}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                <Icon name="Info" size={12} className="inline mr-1" />
                Statistics are based on {mockFeatureData?.district} district data as of September 2025
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="p-4 space-y-4">
            <h4 className="font-medium text-foreground">{educationalContent?.title}</h4>
            
            {educationalContent?.sections?.map((section, index) => (
              <div key={index} className="space-y-2">
                <h5 className="font-medium text-foreground text-sm">{section?.title}</h5>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {section?.content}
                </div>
                {index < educationalContent?.sections?.length - 1 && (
                  <hr className="border-border" />
                )}
              </div>
            ))}

            <div className="pt-3 border-t border-border">
              <Button variant="outline" size="sm" className="w-full">
                <Icon name="ExternalLink" size={14} className="mr-2" />
                Learn More About Forest Rights
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;