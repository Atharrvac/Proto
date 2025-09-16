import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ClaimDetailsPanel = ({ claim, onUpdateClaim }) => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Claim Details', icon: 'FileText' },
    { id: 'applicant', label: 'Applicant Info', icon: 'User' },
    { id: 'documents', label: 'Documents', icon: 'Paperclip' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'verified': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-error/10 text-error border-error/20';
      case 'under_review': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Claim ID</label>
            <p className="text-sm font-mono bg-muted px-2 py-1 rounded">{claim?.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Claim Type</label>
            <p className="text-sm">{claim?.type}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Land Area</label>
            <p className="text-sm">{claim?.area} hectares</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Village</label>
            <p className="text-sm">{claim?.village}, {claim?.district}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Submission Date</label>
            <p className="text-sm">{new Date(claim.submissionDate)?.toLocaleDateString('en-IN')}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(claim?.status)}`}>
              <Icon name="Circle" size={8} className="mr-1 fill-current" />
              {claim?.status?.replace('_', ' ')?.toUpperCase()}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Priority</label>
            <div className="flex items-center space-x-1">
              <Icon name="Flag" size={14} className={getPriorityColor(claim?.priority)} />
              <span className={`text-sm font-medium ${getPriorityColor(claim?.priority)}`}>
                {claim?.priority?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Assigned Officer</label>
            <p className="text-sm">{claim?.assignedOfficer}</p>
          </div>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium text-muted-foreground">Claim Description</label>
        <p className="text-sm mt-1 p-3 bg-muted rounded-md">{claim?.description}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">GPS Coordinates</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="p-3 bg-muted rounded-md">
            <div className="text-xs text-muted-foreground">Latitude</div>
            <div className="font-mono text-sm">{claim?.coordinates?.lat}</div>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <div className="text-xs text-muted-foreground">Longitude</div>
            <div className="font-mono text-sm">{claim?.coordinates?.lng}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicantTab = () => (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
          <Icon name="User" size={24} className="text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{claim?.applicant?.name}</h3>
          <p className="text-sm text-muted-foreground">{claim?.applicant?.fatherName}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {claim?.applicant?.category}
            </span>
            <span className="text-xs text-muted-foreground">
              Age: {claim?.applicant?.age} years
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Aadhaar Number</label>
            <p className="text-sm font-mono">{claim?.applicant?.aadhaar}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
            <p className="text-sm">{claim?.applicant?.mobile}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Bank Account</label>
            <p className="text-sm font-mono">{claim?.applicant?.bankAccount}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-sm">{claim?.applicant?.address}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Occupation</label>
            <p className="text-sm">{claim?.applicant?.occupation}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Family Members</label>
            <p className="text-sm">{claim?.applicant?.familyMembers} members</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">Traditional Use Evidence</label>
        <p className="text-sm mt-1 p-3 bg-muted rounded-md">{claim?.applicant?.traditionalUse}</p>
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-4">
      {claim?.documents?.map((doc) => (
        <div key={doc?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{doc?.name}</p>
              <p className="text-xs text-muted-foreground">
                {doc?.size} • Uploaded {new Date(doc.uploadDate)?.toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              doc?.verified ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
            }`}>
              {doc?.verified ? 'Verified' : 'Pending'}
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="Eye" size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      {claim?.history?.map((event, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Clock" size={12} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{event?.action}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(event.timestamp)?.toLocaleDateString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{event?.description}</p>
            <p className="text-xs text-muted-foreground">By: {event?.officer}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Claim Information</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="ExternalLink" size={14} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 mt-3 border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab(tab?.id)}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'applicant' && renderApplicantTab()}
        {activeTab === 'documents' && renderDocumentsTab()}
        {activeTab === 'history' && renderHistoryTab()}
      </div>
    </div>
  );
};

export default ClaimDetailsPanel;