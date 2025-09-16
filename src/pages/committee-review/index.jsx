import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import QuickActionsToolbar from '../../components/ui/QuickActionsToolbar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ClaimsList from './components/ClaimsList';
import ClaimDetailsPanel from './components/ClaimDetailsPanel';
import DecisionPanel from './components/DecisionPanel';
import DiscussionPanel from './components/DiscussionPanel';
import VotingPanel from './components/VotingPanel';
import EvidenceComparisonTool from './components/EvidenceComparisonTool';
import LegalFrameworkPanel from './components/LegalFrameworkPanel';

const CommitteeReview = () => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activePanel, setActivePanel] = useState('details');
  const [viewMode, setViewMode] = useState('split');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock claims data
  const [claims] = useState([
    {
      id: 'FR2025001',
      type: 'Individual Forest Rights',
      village: 'Khandwa',
      district: 'Madhya Pradesh',
      state: 'Madhya Pradesh',
      block: 'Khandwa',
      area: 4.2,
      families: 1,
      priority: 'High',
      status: 'pending',
      submittedDate: '2025-01-10',
      daysPending: 3,
      hasDocuments: true,
      isVerified: true,
      hasComments: true,
      description: `This claim is submitted by Shri Ramesh Patel for individual forest rights over 4.2 hectares of forest land in Khandwa village. The family has been residing and cultivating this land for over 25 years, with evidence of continuous occupation and dependency on forest resources for livelihood. The claim includes traditional dwelling area, agricultural plots, and access to minor forest produce collection areas.`
    },
    {
      id: 'FR2025002',
      type: 'Community Forest Rights',
      village: 'Barwani',
      district: 'Barwani',
      state: 'Madhya Pradesh',
      block: 'Barwani',
      area: 15.8,
      families: 45,
      priority: 'Medium',
      status: 'in_review',
      submittedDate: '2025-01-08',
      daysPending: 5,
      hasDocuments: true,
      isVerified: true,
      hasComments: false,
      description: `Community forest rights claim submitted by Barwani Gram Sabha for 15.8 hectares covering traditional grazing grounds, water sources, and minor forest produce collection areas. The community has been using these resources for generations with sustainable practices.`
    },
    {
      id: 'FR2025003',
      type: 'Individual Forest Rights',
      village: 'Dhar',
      district: 'Dhar',
      state: 'Madhya Pradesh',
      block: 'Dhar',
      area: 2.1,
      families: 1,
      priority: 'Low',
      status: 'requires_info',
      submittedDate: '2025-01-05',
      daysPending: 8,
      hasDocuments: false,
      isVerified: false,
      hasComments: true,
      description: `Individual claim for forest rights over 2.1 hectares. Additional documentation required for verification of traditional occupation and boundary demarcation.`
    },
    {
      id: 'FR2025004',
      type: 'Community Forest Rights',
      village: 'Jhabua',
      district: 'Jhabua',
      state: 'Madhya Pradesh',
      block: 'Jhabua',
      area: 8.5,
      families: 23,
      priority: 'High',
      status: 'pending',
      submittedDate: '2025-01-12',
      daysPending: 1,
      hasDocuments: true,
      isVerified: false,
      hasComments: false,
      description: `Community claim for traditional forest areas including sacred groves and medicinal plant collection zones. Strong community consensus and traditional governance systems in place.`
    }
  ]);

  const panelOptions = [
    { value: 'details', label: 'Claim Details', icon: 'FileText' },
    { value: 'decision', label: 'Make Decision', icon: 'Gavel' },
    { value: 'discussion', label: 'Discussion', icon: 'MessageSquare' },
    { value: 'voting', label: 'Voting', icon: 'Vote' },
    { value: 'evidence', label: 'Evidence Comparison', icon: 'Compare' },
    { value: 'legal', label: 'Legal Framework', icon: 'Scale' }
  ];

  const viewModeOptions = [
    { value: 'split', label: 'Split View' },
    { value: 'full', label: 'Full Panel' },
    { value: 'list', label: 'List Only' }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (claims?.length > 0) {
        setSelectedClaim(claims?.[0]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [claims]);

  const handleClaimSelect = (claim) => {
    setSelectedClaim(claim);
    setActivePanel('details');
  };

  const handleDecision = async (decisionData) => {
    console.log('Committee decision:', decisionData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update claim status or refresh data
  };

  const handleVote = async (voteData) => {
    console.log('Committee vote:', voteData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleBulkAction = async (action, claimIds) => {
    console.log('Bulk action:', action, claimIds);
    // Simulate bulk processing
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const renderActivePanel = () => {
    if (!selectedClaim) return null;

    const commonProps = {
      claim: selectedClaim,
      onClose: () => setActivePanel('details')
    };

    switch (activePanel) {
      case 'details':
        return <ClaimDetailsPanel {...commonProps} />;
      case 'decision':
        return <DecisionPanel {...commonProps} onDecision={handleDecision} />;
      case 'discussion':
        return <DiscussionPanel {...commonProps} />;
      case 'voting':
        return <VotingPanel {...commonProps} onVote={handleVote} />;
      case 'evidence':
        return <EvidenceComparisonTool {...commonProps} />;
      case 'legal':
        return <LegalFrameworkPanel {...commonProps} />;
      default:
        return <ClaimDetailsPanel {...commonProps} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <QuickActionsToolbar userRole="Committee Member" currentPage="committee-review" />
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="font-medium text-foreground mb-2">Loading Committee Review</h3>
            <p className="text-sm text-muted-foreground">Fetching claims and committee data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActionsToolbar userRole="Committee Member" currentPage="committee-review" />
      <main className="pt-16">
        <div className="px-4 lg:px-6 py-4">
          <BreadcrumbNavigation
            items={[{ label: 'Claims', path: '/claims' }]}
            currentPage="Committee Review"
          />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Committee Review</h1>
              <p className="text-muted-foreground">
                Review and make decisions on Forest Rights Act claims
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Select
                options={viewModeOptions}
                value={viewMode}
                onChange={setViewMode}
                className="w-40"
              />
              
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Export Report
              </Button>
              
              <Button variant="default">
                <Icon name="Plus" size={16} className="mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>

          {/* Committee Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{claims?.length}</p>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {claims?.filter(c => c?.status === 'pending')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {claims?.filter(c => c?.priority === 'High')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">7/9</p>
                  <p className="text-sm text-muted-foreground">Members Present</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
            {/* Claims List */}
            {(viewMode === 'split' || viewMode === 'list') && (
              <div className={viewMode === 'list' ? 'col-span-12' : 'col-span-5'}>
                <ClaimsList
                  claims={claims}
                  selectedClaim={selectedClaim}
                  onClaimSelect={handleClaimSelect}
                  onBulkAction={handleBulkAction}
                />
              </div>
            )}

            {/* Panel Area */}
            {(viewMode === 'split' || viewMode === 'full') && selectedClaim && (
              <div className={viewMode === 'full' ? 'col-span-12' : 'col-span-7'}>
                <div className="bg-card border border-border rounded-lg h-full flex flex-col">
                  {/* Panel Navigation */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-1 overflow-x-auto">
                      {panelOptions?.map((option) => (
                        <Button
                          key={option?.value}
                          variant={activePanel === option?.value ? 'default' : 'ghost'}
                          size="sm"
                          className="whitespace-nowrap"
                          onClick={() => setActivePanel(option?.value)}
                        >
                          <Icon name={option?.icon} size={14} className="mr-1.5" />
                          {option?.label}
                        </Button>
                      ))}
                    </div>

                    {viewMode === 'full' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode('split')}
                      >
                        <Icon name="SplitSquareHorizontal" size={14} className="mr-1" />
                        Split View
                      </Button>
                    )}
                  </div>

                  {/* Panel Content */}
                  <div className="flex-1 overflow-hidden">
                    {renderActivePanel()}
                  </div>
                </div>
              </div>
            )}

            {/* No Selection State */}
            {!selectedClaim && viewMode !== 'list' && (
              <div className={viewMode === 'full' ? 'col-span-12' : 'col-span-7'}>
                <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="FileSearch" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Select a Claim to Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a claim from the list to view details and make committee decisions
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommitteeReview;