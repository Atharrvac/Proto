import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionsToolbar from '../../components/ui/QuickActionsToolbar';
import ClaimQueue from './components/ClaimQueue';
import ClaimDetailsPanel from './components/ClaimDetailsPanel';
import VerificationMapView from './components/VerificationMapView';
import VerificationChecklist from './components/VerificationChecklist';
import AIDecisionSupport from './components/AIDecisionSupport';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClaimVerification = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activePanel, setActivePanel] = useState('details');
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState({});

  // Mock claim data
  const mockClaim = {
    id: 'FR2025001',
    type: 'Individual Forest Rights',
    area: 2.5,
    village: 'Khandwa',
    district: 'Madhya Pradesh',
    status: 'pending',
    priority: 'high',
    submissionDate: '2025-01-10T00:00:00Z',
    assignedOfficer: 'Rajesh Kumar',
    description: `Application for individual forest rights over 2.5 hectares of land traditionally used for agriculture and minor forest produce collection. The land has been in continuous use by the applicant's family for over three generations, with evidence of traditional cultivation practices and sustainable forest management.`,
    coordinates: {
      lat: 22.1991,
      lng: 76.1810
    },
    applicant: {
      name: 'Ramesh Kumar Patel',fatherName: 'Shyam Lal Patel',age: 45,category: 'Scheduled Tribe',aadhaar: '1234-5678-9012',mobile: '+91-9876543210',bankAccount: 'SBIN0001234 - 12345678901',address: 'Village Khandwa, Post Khandwa, District Madhya Pradesh - 450001',occupation: 'Traditional Farmer',
      familyMembers: 6,
      traditionalUse: `The land has been used by our family for traditional agriculture, growing millets, pulses, and collecting minor forest produce like honey, medicinal plants, and bamboo. Our ancestors have been living on this land for over 100 years, practicing sustainable farming methods that preserve the forest ecosystem.`
    },
    documents: [
      {
        id: 1,
        name: 'Aadhaar Card.pdf',size: '245 KB',uploadDate: '2025-01-10T10:30:00Z',
        verified: true
      },
      {
        id: 2,
        name: 'Bank Passbook.pdf',size: '189 KB',uploadDate: '2025-01-10T10:32:00Z',
        verified: true
      },
      {
        id: 3,
        name: 'Land Survey Document.pdf',size: '1.2 MB',uploadDate: '2025-01-10T10:35:00Z',
        verified: false
      },
      {
        id: 4,
        name: 'Community Certificate.pdf',size: '567 KB',uploadDate: '2025-01-10T10:38:00Z',
        verified: true
      },
      {
        id: 5,
        name: 'Site Photographs.zip',size: '3.4 MB',uploadDate: '2025-01-10T10:40:00Z',
        verified: true
      }
    ],
    history: [
      {
        action: 'Claim Submitted',description: 'Initial claim submission with all required documents',timestamp: '2025-01-10T10:00:00Z',officer: 'System'
      },
      {
        action: 'Document Verification Started',description: 'Automated document verification process initiated',timestamp: '2025-01-10T11:00:00Z',officer: 'System'
      },
      {
        action: 'Assigned for Field Verification',description: 'Claim assigned to field officer for verification',timestamp: '2025-01-11T09:00:00Z',officer: 'District Collector'
      },
      {
        action: 'GPS Coordinates Verified',description: 'Location coordinates verified using satellite imagery',timestamp: '2025-01-12T14:30:00Z',officer: 'Rajesh Kumar'
      }
    ]
  };

  useEffect(() => {
    // Set initial selected claim
    setSelectedClaim(mockClaim);
  }, []);

  const panels = [
    { id: 'details', label: 'Claim Details', icon: 'FileText' },
    { id: 'map', label: 'Map View', icon: 'Map' },
    { id: 'checklist', label: 'Verification', icon: 'CheckSquare' },
    { id: 'ai', label: 'AI Support', icon: 'Brain' }
  ];

  const handleClaimSelect = (claim) => {
    setSelectedClaim(claim);
    setActivePanel('details');
  };

  const handleVerificationSubmit = (verificationData) => {
    console.log('Verification submitted:', verificationData);
    // Handle verification submission
    setVerificationProgress(prev => ({
      ...prev,
      [selectedClaim?.id]: verificationData
    }));
  };

  const handleBoundaryUpdate = (boundaries) => {
    console.log('Boundary updated:', boundaries);
    // Handle boundary updates
  };

  const breadcrumbItems = [
    { label: 'Claims', path: '/claims' }
  ];

  const renderActivePanel = () => {
    if (!selectedClaim) {
      return (
        <div className="flex items-center justify-center h-full bg-card border border-border rounded-lg">
          <div className="text-center">
            <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Claim to Verify</h3>
            <p className="text-sm text-muted-foreground">
              Choose a claim from the queue to begin the verification process
            </p>
          </div>
        </div>
      );
    }

    switch (activePanel) {
      case 'details':
        return <ClaimDetailsPanel claim={selectedClaim} onUpdateClaim={setSelectedClaim} />;
      case 'map':
        return <VerificationMapView claim={selectedClaim} onBoundaryUpdate={handleBoundaryUpdate} />;
      case 'checklist':
        return (
          <VerificationChecklist 
            claim={selectedClaim} 
            onChecklistUpdate={setVerificationProgress}
            onSubmitVerification={handleVerificationSubmit}
          />
        );
      case 'ai':
        return <AIDecisionSupport claim={selectedClaim} onScoreUpdate={setVerificationProgress} />;
      default:
        return <ClaimDetailsPanel claim={selectedClaim} onUpdateClaim={setSelectedClaim} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActionsToolbar userRole="Field Officer" currentPage="claim-verification" />
      <main className="pt-16">
        <div className="px-4 lg:px-6 py-4">
          <BreadcrumbNavigation 
            items={breadcrumbItems}
            currentPage="Claim Verification"
          />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Claim Verification</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Review and verify Forest Rights Act claims through systematic evaluation
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Filter" size={14} className="mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} className="mr-2" />
                Export
              </Button>
              <Button variant="default" size="sm">
                <Icon name="Plus" size={14} className="mr-2" />
                Bulk Actions
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Claims Queue - Left Sidebar */}
            <div className="col-span-12 lg:col-span-3">
              <ClaimQueue 
                onClaimSelect={handleClaimSelect}
                selectedClaimId={selectedClaim?.id}
              />
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9">
              {selectedClaim && (
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-lg font-semibold">{selectedClaim?.id}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm font-medium">{selectedClaim?.applicant?.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {panels?.map((panel) => (
                          <button
                            key={panel?.id}
                            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                              activePanel === panel?.id
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                            onClick={() => setActivePanel(panel?.id)}
                          >
                            <Icon name={panel?.icon} size={14} />
                            <span className="hidden sm:inline">{panel?.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {activePanel === 'map' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsFullscreenMap(!isFullscreenMap)}
                        >
                          <Icon name={isFullscreenMap ? "Minimize2" : "Maximize2"} size={14} />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Panel Content */}
              <div className={`${isFullscreenMap ? 'fixed inset-0 z-50 bg-background' : ''}`}>
                {renderActivePanel()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClaimVerification;