import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ClaimsList = ({ claims, selectedClaim, onClaimSelect, onBulkAction }) => {
  const [selectedClaims, setSelectedClaims] = useState([]);
  const [sortBy, setSortBy] = useState('priority');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sortOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'date', label: 'Submission Date' },
    { value: 'area', label: 'Area Size' },
    { value: 'families', label: 'Families Count' },
    { value: 'days_pending', label: 'Days Pending' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Claims' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'in_review', label: 'In Review' },
    { value: 'requires_info', label: 'Requires Information' }
  ];

  const handleSelectAll = () => {
    if (selectedClaims?.length === filteredClaims?.length) {
      setSelectedClaims([]);
    } else {
      setSelectedClaims(filteredClaims?.map(claim => claim?.id));
    }
  };

  const handleClaimToggle = (claimId) => {
    setSelectedClaims(prev => 
      prev?.includes(claimId)
        ? prev?.filter(id => id !== claimId)
        : [...prev, claimId]
    );
  };

  const filteredClaims = claims?.filter(claim => {
      if (filterStatus !== 'all' && claim?.status !== filterStatus) return false;
      if (searchQuery && !claim?.village?.toLowerCase()?.includes(searchQuery?.toLowerCase()) && 
          !claim?.id?.toLowerCase()?.includes(searchQuery?.toLowerCase())) return false;
      return true;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'date':
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        case 'area':
          return b?.area - a?.area;
        case 'families':
          return b?.families - a?.families;
        case 'days_pending':
          return b?.daysPending - a?.daysPending;
        default:
          return 0;
      }
    });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-error text-error-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'in_review': return 'text-primary bg-primary/10';
      case 'requires_info': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-1 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Claims for Review</h3>
            <p className="text-sm text-muted-foreground">{filteredClaims?.length} claims pending</p>
          </div>
          {selectedClaims?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{selectedClaims?.length} selected</span>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('approve', selectedClaims)}>
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Bulk Approve
              </Button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <Input
            placeholder="Search by claim ID or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
          
          <div className="flex space-x-3">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="flex-1"
            />
            <Select
              options={statusOptions}
              value={filterStatus}
              onChange={setFilterStatus}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      {/* Claims List */}
      <div className="flex-1 overflow-y-auto">
        {filteredClaims?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="FileSearch" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">No claims found</h4>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filterStatus !== 'all' ? 'Try adjusting your search or filters' : 'No claims are currently pending review'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {/* Select All Header */}
            <div className="p-3 bg-muted/30 flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedClaims?.length === filteredClaims?.length && filteredClaims?.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary border-border rounded focus:ring-ring"
              />
              <span className="text-sm font-medium text-foreground">Select All</span>
            </div>

            {filteredClaims?.map((claim) => (
              <div
                key={claim?.id}
                className={`p-4 hover:bg-muted/30 transition-smooth cursor-pointer ${
                  selectedClaim?.id === claim?.id ? 'bg-primary/5 border-r-2 border-r-primary' : ''
                }`}
                onClick={() => onClaimSelect(claim)}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedClaims?.includes(claim?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleClaimToggle(claim?.id);
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-ring mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">#{claim?.id}</h4>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(claim?.priority)}`}>
                          {claim?.priority}
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(claim?.status)}`}>
                        {claim?.status?.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{claim?.village}, {claim?.district}</p>
                      <p className="text-sm text-muted-foreground">{claim?.type} • {claim?.area} ha • {claim?.families} families</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} />
                            <span>{claim?.submittedDate}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Clock" size={12} />
                            <span>{claim?.daysPending} days</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {claim?.hasDocuments && (
                            <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                          )}
                          {claim?.isVerified && (
                            <Icon name="CheckCircle" size={12} className="text-success" />
                          )}
                          {claim?.hasComments && (
                            <Icon name="MessageSquare" size={12} className="text-primary" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Total: {filteredClaims?.length} claims</span>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span>High Priority: {filteredClaims?.filter(c => c?.priority === 'High')?.length}</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>Medium: {filteredClaims?.filter(c => c?.priority === 'Medium')?.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsList;