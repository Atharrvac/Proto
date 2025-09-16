import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ userRole = 'Field Officer' }) => {
  const [timeFilter, setTimeFilter] = useState('today');

  const roleBasedActivities = {
    'Field Officer': [
      {
        id: 1,
        type: 'claim_submitted',
        title: 'New claim submitted',
        description: 'Claim #FR2025001 submitted by Ramesh Kumar from Village Khandwa',
        timestamp: '2025-01-13T17:45:00',
        user: 'Ramesh Kumar',
        location: 'Village Khandwa',
        status: 'pending',
        icon: 'FileText',
        color: 'text-primary'
      },
      {
        id: 2,
        type: 'verification_completed',
        title: 'Verification completed',
        description: 'Field verification completed for claim #FR2025002 in Village Pandhana',
        timestamp: '2025-01-13T16:30:00',
        user: 'You',
        location: 'Village Pandhana',
        status: 'verified',
        icon: 'CheckCircle',
        color: 'text-success'
      },
      {
        id: 3,
        type: 'document_uploaded',
        title: 'Documents uploaded',
        description: 'Survey documents uploaded for claim #FR2025003',
        timestamp: '2025-01-13T15:15:00',
        user: 'Suresh Patel',
        location: 'Village Khalwa',
        status: 'processing',
        icon: 'Upload',
        color: 'text-accent'
      },
      {
        id: 4,
        type: 'field_visit',
        title: 'Field visit scheduled',
        description: 'Site inspection scheduled for claim #FR2025004',
        timestamp: '2025-01-13T14:00:00',
        user: 'System',
        location: 'Village Barwani',
        status: 'scheduled',
        icon: 'Calendar',
        color: 'text-secondary'
      }
    ],
    'Committee Member': [
      {
        id: 1,
        type: 'claim_approved',
        title: 'Claims approved',
        description: 'Batch approval of 12 claims from Khandwa district completed',
        timestamp: '2025-01-13T16:45:00',
        user: 'Committee',
        location: 'Khandwa District',
        status: 'approved',
        icon: 'CheckCircle2',
        color: 'text-success'
      },
      {
        id: 2,
        type: 'meeting_scheduled',
        title: 'Meeting scheduled',
        description: 'Monthly review meeting scheduled for tomorrow 2:00 PM',
        timestamp: '2025-01-13T15:30:00',
        user: 'Admin',
        location: 'Conference Room A',
        status: 'scheduled',
        icon: 'Users',
        color: 'text-primary'
      },
      {
        id: 3,
        type: 'review_pending',
        title: 'Review required',
        description: '18 claims forwarded for committee review',
        timestamp: '2025-01-13T14:15:00',
        user: 'Field Officers',
        location: 'Multiple Districts',
        status: 'pending',
        icon: 'FileCheck',
        color: 'text-warning'
      }
    ],
    'Administrator': [
      {
        id: 1,
        type: 'user_registered',
        title: 'New users registered',
        description: '12 field officers registered and awaiting approval',
        timestamp: '2025-01-13T17:00:00',
        user: 'System',
        location: 'Multiple States',
        status: 'pending',
        icon: 'UserPlus',
        color: 'text-primary'
      },
      {
        id: 2,
        type: 'backup_completed',
        title: 'Data backup completed',
        description: 'Daily system backup completed successfully (2.4TB)',
        timestamp: '2025-01-13T02:00:00',
        user: 'System',
        location: 'Cloud Storage',
        status: 'completed',
        icon: 'Database',
        color: 'text-success'
      },
      {
        id: 3,
        type: 'system_update',
        title: 'System updated',
        description: 'WebGIS module updated with new satellite imagery layers',
        timestamp: '2025-01-13T01:30:00',
        user: 'System',
        location: 'All Regions',
        status: 'completed',
        icon: 'Settings',
        color: 'text-accent'
      }
    ],
    'Public Viewer': [
      {
        id: 1,
        type: 'data_published',
        title: 'New data published',
        description: '15 approved forest rights claims added to public dataset',
        timestamp: '2025-01-13T16:00:00',
        user: 'System',
        location: 'Public Portal',
        status: 'published',
        icon: 'Globe',
        color: 'text-primary'
      },
      {
        id: 2,
        type: 'map_updated',
        title: 'Map layer updated',
        description: 'Forest cover layer updated with latest satellite imagery',
        timestamp: '2025-01-12T10:00:00',
        user: 'System',
        location: 'Public Map',
        status: 'updated',
        icon: 'Map',
        color: 'text-success'
      }
    ]
  };

  const activities = roleBasedActivities?.[userRole] || roleBasedActivities?.['Field Officer'];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      verified: { color: 'bg-success/10 text-success', label: 'Verified' },
      approved: { color: 'bg-success/10 text-success', label: 'Approved' },
      processing: { color: 'bg-accent/10 text-accent', label: 'Processing' },
      scheduled: { color: 'bg-secondary/10 text-secondary', label: 'Scheduled' },
      completed: { color: 'bg-success/10 text-success', label: 'Completed' },
      published: { color: 'bg-primary/10 text-primary', label: 'Published' },
      updated: { color: 'bg-accent/10 text-accent', label: 'Updated' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date?.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const timeFilters = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>

        {/* Time Filter */}
        <div className="flex items-center space-x-1">
          {timeFilters?.map((filter) => (
            <button
              key={filter?.value}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-smooth ${
                timeFilter === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              onClick={() => setTimeFilter(filter?.value)}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity, index) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${activity?.color}`}>
                    <Icon name={activity?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity?.title}
                      </p>
                      {getStatusBadge(activity?.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {activity?.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{activity?.user}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{activity?.location}</span>
                        </span>
                      </div>
                      <span>{formatTime(activity?.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full" iconName="History" iconPosition="right">
          View activity history
        </Button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;