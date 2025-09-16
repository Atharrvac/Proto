import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ClaimQueue = ({ onClaimSelect, selectedClaimId }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [searchTerm, setSearchTerm] = useState('');

  const claims = [
    {
      id: 'FR2025001',
      applicantName: 'Ramesh Kumar Patel',
      village: 'Khandwa',
      district: 'Madhya Pradesh',
      area: 2.5,
      status: 'pending',
      priority: 'high',
      submissionDate: '2025-01-10',
      daysInQueue: 3,
      assignedOfficer: 'Rajesh Kumar',
      type: 'Individual Forest Rights'
    },
    {
      id: 'FR2025002',
      applicantName: 'Sunita Devi Meena',
      village: 'Banswara',
      district: 'Rajasthan',
      area: 1.8,
      status: 'under_review',
      priority: 'medium',
      submissionDate: '2025-01-08',
      daysInQueue: 5,
      assignedOfficer: 'Priya Sharma',
      type: 'Community Forest Rights'
    },
    {
      id: 'FR2025003',
      applicantName: 'Tribal Welfare Committee',
      village: 'Koraput',
      district: 'Odisha',
      area: 15.2,
      status: 'pending',
      priority: 'high',
      submissionDate: '2025-01-07',
      daysInQueue: 6,
      assignedOfficer: 'Rajesh Kumar',
      type: 'Community Forest Rights'
    },
    {
      id: 'FR2025004',
      applicantName: 'Lakshmi Tribal Sangha',
      village: 'Wayanad',
      district: 'Kerala',
      area: 8.7,
      status: 'verified',
      priority: 'low',
      submissionDate: '2025-01-05',
      daysInQueue: 8,
      assignedOfficer: 'Anjali Nair',
      type: 'Community Forest Rights'
    },
    {
      id: 'FR2025005',
      applicantName: 'Bharat Singh Gond',
      village: 'Bastar',
      district: 'Chhattisgarh',
      area: 3.2,
      status: 'pending',
      priority: 'medium',
      submissionDate: '2025-01-09',
      daysInQueue: 4,
      assignedOfficer: 'Rajesh Kumar',
      type: 'Individual Forest Rights'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Claims' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'verified', label: 'Verified' },
    { value: 'my_claims', label: 'My Assigned Claims' }
  ];

  const sortOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'date', label: 'Submission Date' },
    { value: 'days_in_queue', label: 'Days in Queue' },
    { value: 'area', label: 'Land Area' },
    { value: 'district', label: 'District' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'verified': return 'bg-success/10 text-success border-success/20';
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

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const filteredClaims = claims?.filter(claim => {
    if (filter === 'my_claims') {
      return claim?.assignedOfficer === 'Rajesh Kumar';
    }
    if (filter !== 'all') {
      return claim?.status === filter;
    }
    return true;
  })?.filter(claim => {
    if (!searchTerm) return true;
    return claim?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
           claim?.applicantName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
           claim?.village?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
           claim?.district?.toLowerCase()?.includes(searchTerm?.toLowerCase());
  });

  const sortedClaims = [...filteredClaims]?.sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
      case 'date':
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      case 'days_in_queue':
        return b?.daysInQueue - a?.daysInQueue;
      case 'area':
        return b?.area - a?.area;
      case 'district':
        return a?.district?.localeCompare(b?.district);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Verification Queue</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {filteredClaims?.length} claims
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          <Select
            options={filterOptions}
            value={filter}
            onChange={setFilter}
            placeholder="Filter by status"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedClaims?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileX" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No claims found</p>
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {sortedClaims?.map((claim) => (
              <div
                key={claim?.id}
                className={`p-3 border rounded-lg cursor-pointer transition-smooth hover:bg-muted/50 ${
                  selectedClaimId === claim?.id 
                    ? 'border-primary bg-primary/5' :'border-border'
                }`}
                onClick={() => onClaimSelect(claim)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-semibold">{claim?.id}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(claim?.status)}`}>
                      {claim?.status?.replace('_', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getPriorityIcon(claim?.priority)} 
                      size={14} 
                      className={getPriorityColor(claim?.priority)} 
                    />
                    <span className={`text-xs font-medium ${getPriorityColor(claim?.priority)}`}>
                      {claim?.priority?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-sm">{claim?.applicantName}</p>
                  <p className="text-xs text-muted-foreground">
                    {claim?.village}, {claim?.district}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{claim?.area} hectares</span>
                    <span>{claim?.daysInQueue} days in queue</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{claim?.type}</span>
                    <span className="text-muted-foreground">
                      {new Date(claim.submissionDate)?.toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                {claim?.assignedOfficer === 'Rajesh Kumar' && (
                  <div className="mt-2 flex items-center space-x-1">
                    <Icon name="User" size={12} className="text-primary" />
                    <span className="text-xs text-primary font-medium">Assigned to you</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Queue Statistics */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-warning">
              {claims?.filter(c => c?.status === 'pending')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-primary">
              {claims?.filter(c => c?.status === 'under_review')?.length}
            </div>
            <div className="text-xs text-muted-foreground">In Review</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-success">
              {claims?.filter(c => c?.status === 'verified')?.length}
            </div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimQueue;