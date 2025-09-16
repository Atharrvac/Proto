import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const ClaimDetailsPanel = ({ claim, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'documents', label: 'Documents', icon: 'Paperclip' },
    { id: 'verification', label: 'Verification', icon: 'CheckCircle' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const documents = [
    { id: 1, name: 'Application Form', type: 'PDF', size: '2.4 MB', status: 'verified', uploadDate: '2025-01-10' },
    { id: 2, name: 'Survey Settlement Record', type: 'PDF', size: '1.8 MB', status: 'verified', uploadDate: '2025-01-10' },
    { id: 3, name: 'Community Certificate', type: 'PDF', size: '956 KB', status: 'pending', uploadDate: '2025-01-11' },
    { id: 4, name: 'Satellite Imagery', type: 'TIFF', size: '15.2 MB', status: 'verified', uploadDate: '2025-01-12' }
  ];

  const verificationReports = [
    {
      id: 1,
      officer: 'Rajesh Kumar',
      role: 'Field Officer',
      date: '2025-01-12',
      status: 'approved',
      comments: 'Field verification completed. All boundaries match with satellite imagery. Community occupation confirmed for 15+ years.',
      confidence: 95
    },
    {
      id: 2,
      officer: 'Priya Sharma',
      role: 'Technical Officer',
      date: '2025-01-13',
      status: 'approved',
      comments: 'Technical verification successful. GPS coordinates verified, no overlapping claims found.',
      confidence: 92
    }
  ];

  const historyEvents = [
    { date: '2025-01-10', event: 'Claim submitted by Gram Sabha', user: 'Ramesh Patel', type: 'submission' },
    { date: '2025-01-11', event: 'Initial document review completed', user: 'System', type: 'review' },
    { date: '2025-01-12', event: 'Field verification assigned', user: 'Rajesh Kumar', type: 'assignment' },
    { date: '2025-01-13', event: 'Field verification completed', user: 'Rajesh Kumar', type: 'verification' },
    { date: '2025-01-13', event: 'Technical review completed', user: 'Priya Sharma', type: 'review' },
    { date: '2025-01-13', event: 'Forwarded to committee', user: 'System', type: 'forwarding' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
      case 'approved': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'submission': return 'Upload';
      case 'review': return 'FileSearch';
      case 'assignment': return 'UserCheck';
      case 'verification': return 'CheckCircle';
      case 'forwarding': return 'ArrowRight';
      default: return 'Clock';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Claim #{claim?.id}</h3>
            <p className="text-sm text-muted-foreground">{claim?.village}, {claim?.district}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex items-center border-b border-border overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => setActiveTab(tab?.id)}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Claim Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Claim Type:</span>
                    <span className="font-medium">{claim?.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span className="font-medium">{claim?.area} hectares</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Families:</span>
                    <span className="font-medium">{claim?.families}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium">{claim?.submittedDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Location Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">State:</span>
                    <span className="font-medium">{claim?.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">District:</span>
                    <span className="font-medium">{claim?.district}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Block:</span>
                    <span className="font-medium">{claim?.block}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Village:</span>
                    <span className="font-medium">{claim?.village}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Claim Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {claim?.description}
              </p>
            </div>

            {/* Priority and Status */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Flag" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Priority:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    claim?.priority === 'High' ? 'bg-error/10 text-error' :
                    claim?.priority === 'Medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {claim?.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Days Pending:</span>
                  <span className="text-sm font-medium text-foreground">{claim?.daysPending}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Supporting Documents</h4>
              <span className="text-sm text-muted-foreground">{documents?.length} files</span>
            </div>
            
            <div className="space-y-3">
              {documents?.map((doc) => (
                <div key={doc?.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-smooth">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc?.name}</p>
                      <p className="text-sm text-muted-foreground">{doc?.type} • {doc?.size} • {doc?.uploadDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc?.status)}`}>
                      {doc?.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Verification Reports</h4>
            
            <div className="space-y-4">
              {verificationReports?.map((report) => (
                <div key={report?.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {report?.officer?.split(' ')?.map(n => n?.[0])?.join('')}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report?.officer}</p>
                        <p className="text-sm text-muted-foreground">{report?.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report?.status)}`}>
                        {report?.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">{report?.date}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{report?.comments}</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Target" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium">Confidence:</span>
                      <span className="text-sm font-medium text-success">{report?.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Location & Boundaries</h4>
            
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Claim Location"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=22.5726,88.3639&z=14&output=embed"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Coordinates</h5>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latitude:</span>
                    <span className="font-mono">22.5726°N</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longitude:</span>
                    <span className="font-mono">88.3639°E</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Survey Details</h5>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Survey No:</span>
                    <span className="font-mono">SV-2025-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="text-success font-medium">±2.5m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Claim History</h4>
            
            <div className="space-y-4">
              {historyEvents?.map((event, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={getEventIcon(event?.type)} size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{event?.event}</p>
                    <p className="text-sm text-muted-foreground">by {event?.user}</p>
                    <p className="text-xs text-muted-foreground">{event?.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimDetailsPanel;