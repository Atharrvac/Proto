import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionCards = ({ userRole = 'Field Officer' }) => {
  const roleBasedActions = {
    'Field Officer': [
      {
        id: 'upload-claim',
        title: 'Upload New Claim',
        description: 'Submit forest rights claim with documents',
        icon: 'Upload',
        color: 'bg-primary',
        path: '/claim-upload-interface',
        badge: 'New',
        stats: '24 pending'
      },
      {
        id: 'verify-location',
        title: 'Verify Claims',
        description: 'Review and verify submitted claims',
        icon: 'MapPin',
        color: 'bg-accent',
        path: '/claim-verification',
        badge: 'Urgent',
        stats: '8 pending'
      },
      {
        id: 'field-visit',
        title: 'Field Assignments',
        description: 'View scheduled field visits',
        icon: 'Calendar',
        color: 'bg-secondary',
        action: 'field-visits',
        stats: '3 today'
      },
      {
        id: 'offline-sync',
        title: 'Sync Offline Data',
        description: 'Upload collected offline data',
        icon: 'RefreshCw',
        color: 'bg-success',
        action: 'sync-data',
        stats: '12 items'
      }
    ],
    'Committee Member': [
      {
        id: 'review-claims',
        title: 'Review Claims',
        description: 'Committee review and approval',
        icon: 'FileCheck',
        color: 'bg-primary',
        path: '/committee-review',
        badge: 'Priority',
        stats: '18 pending'
      },
      {
        id: 'meeting-schedule',
        title: 'Committee Meetings',
        description: 'Schedule and manage meetings',
        icon: 'Users',
        color: 'bg-accent',
        action: 'meetings',
        stats: 'Next: Tomorrow'
      },
      {
        id: 'generate-reports',
        title: 'Generate Reports',
        description: 'Create committee reports',
        icon: 'FileText',
        color: 'bg-secondary',
        action: 'reports',
        stats: '5 this month'
      },
      {
        id: 'bulk-approve',
        title: 'Bulk Actions',
        description: 'Approve multiple claims',
        icon: 'CheckCircle2',
        color: 'bg-success',
        action: 'bulk-approve',
        stats: '12 selected'
      }
    ],
    'Administrator': [
      {
        id: 'user-management',
        title: 'Manage Users',
        description: 'Add and manage system users',
        icon: 'UserPlus',
        color: 'bg-primary',
        action: 'user-management',
        stats: '156 active'
      },
      {
        id: 'system-config',
        title: 'System Settings',
        description: 'Configure system parameters',
        icon: 'Settings',
        color: 'bg-accent',
        action: 'system-config',
        stats: 'Last: 2 days ago'
      },
      {
        id: 'audit-logs',
        title: 'Audit Logs',
        description: 'View system activity logs',
        icon: 'FileSearch',
        color: 'bg-secondary',
        action: 'audit-logs',
        stats: '1,247 entries'
      },
      {
        id: 'backup-restore',
        title: 'Data Backup',
        description: 'Backup and restore data',
        icon: 'Database',
        color: 'bg-warning',
        action: 'backup',
        stats: 'Last: Yesterday'
      }
    ],
    'Public Viewer': [
      {
        id: 'public-map',
        title: 'Public Map',
        description: 'View public forest rights map',
        icon: 'Globe',
        color: 'bg-primary',
        path: '/public-map-viewer',
        stats: '892 claims'
      },
      {
        id: 'search-claims',
        title: 'Search Claims',
        description: 'Search public claim records',
        icon: 'Search',
        color: 'bg-accent',
        action: 'search-claims',
        stats: '634 approved'
      },
      {
        id: 'download-data',
        title: 'Download Data',
        description: 'Download public datasets',
        icon: 'Download',
        color: 'bg-secondary',
        action: 'download-data',
        stats: '45.2K ha'
      },
      {
        id: 'community-info',
        title: 'Community Info',
        description: 'View community information',
        icon: 'Home',
        color: 'bg-success',
        action: 'community-info',
        stats: '78 communities'
      }
    ]
  };

  const actions = roleBasedActions?.[userRole] || roleBasedActions?.['Field Officer'];

  const handleActionClick = (action) => {
    if (action?.path) {
      window.location.href = action?.path;
    } else if (action?.action) {
      console.log(`Executing action: ${action?.action}`);
      // Handle custom actions here
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {actions?.map((action) => (
        <div
          key={action?.id}
          className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-smooth cursor-pointer group"
          onClick={() => handleActionClick(action)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${action?.color} text-white flex items-center justify-center group-hover:scale-110 transition-smooth`}>
              <Icon name={action?.icon} size={24} />
            </div>
            {action?.badge && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                action?.badge === 'New' ? 'bg-success/10 text-success' :
                action?.badge === 'Urgent' ? 'bg-error/10 text-error' :
                action?.badge === 'Priority'? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
              }`}>
                {action?.badge}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
              {action?.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {action?.description}
            </p>
            {action?.stats && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">{action?.stats}</span>
                <Icon name="ArrowRight" size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionCards;