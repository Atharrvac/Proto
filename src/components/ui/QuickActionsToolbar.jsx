import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionsToolbar = ({ userRole = 'Field Officer', currentPage = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const roleBasedActions = {
    'Field Officer': [
      { 
        id: 'upload-claim', 
        label: 'Upload Claim', 
        icon: 'Upload', 
        path: '/claim-upload-interface',
        shortcut: 'Ctrl+U',
        description: 'Submit new forest rights claim'
      },
      { 
        id: 'verify-location', 
        label: 'Verify Location', 
        icon: 'MapPin', 
        path: '/claim-verification',
        shortcut: 'Ctrl+V',
        description: 'Verify claim location on map'
      },
      { 
        id: 'view-map', 
        label: 'View Map', 
        icon: 'Map', 
        path: '/interactive-web-gis-map',
        shortcut: 'Ctrl+M',
        description: 'Open interactive GIS map'
      },
      { 
        id: 'sync-offline', 
        label: 'Sync Data', 
        icon: 'RefreshCw', 
        action: 'sync',
        shortcut: 'Ctrl+S',
        description: 'Sync offline data'
      }
    ],
    'Committee Member': [
      { 
        id: 'review-claims', 
        label: 'Review Claims', 
        icon: 'FileCheck', 
        path: '/committee-review',
        shortcut: 'Ctrl+R',
        description: 'Review pending claims'
      },
      { 
        id: 'approve-batch', 
        label: 'Batch Approve', 
        icon: 'CheckCircle2', 
        action: 'batch-approve',
        shortcut: 'Ctrl+A',
        description: 'Approve multiple claims'
      },
      { 
        id: 'generate-report', 
        label: 'Generate Report', 
        icon: 'FileText', 
        action: 'generate-report',
        shortcut: 'Ctrl+G',
        description: 'Generate committee report'
      },
      { 
        id: 'view-analytics', 
        label: 'Analytics', 
        icon: 'BarChart3', 
        path: '/multi-role-dashboard',
        shortcut: 'Ctrl+D',
        description: 'View analytics dashboard'
      }
    ],
    'Administrator': [
      { 
        id: 'user-management', 
        label: 'Manage Users', 
        icon: 'Users', 
        action: 'manage-users',
        shortcut: 'Ctrl+U',
        description: 'Manage system users'
      },
      { 
        id: 'system-config', 
        label: 'System Config', 
        icon: 'Settings', 
        action: 'system-config',
        shortcut: 'Ctrl+C',
        description: 'Configure system settings'
      },
      { 
        id: 'audit-logs', 
        label: 'Audit Logs', 
        icon: 'FileSearch', 
        action: 'audit-logs',
        shortcut: 'Ctrl+L',
        description: 'View system audit logs'
      },
      { 
        id: 'backup-data', 
        label: 'Backup', 
        icon: 'Database', 
        action: 'backup',
        shortcut: 'Ctrl+B',
        description: 'Backup system data'
      }
    ],
    'Public Viewer': [
      { 
        id: 'public-map', 
        label: 'Public Map', 
        icon: 'Globe', 
        path: '/public-map-viewer',
        shortcut: 'Ctrl+P',
        description: 'View public forest map'
      },
      { 
        id: 'search-claims', 
        label: 'Search Claims', 
        icon: 'Search', 
        action: 'search',
        shortcut: 'Ctrl+F',
        description: 'Search public claims'
      },
      { 
        id: 'download-data', 
        label: 'Download Data', 
        icon: 'Download', 
        action: 'download',
        shortcut: 'Ctrl+D',
        description: 'Download public datasets'
      }
    ]
  };

  const currentActions = roleBasedActions?.[userRole] || roleBasedActions?.['Field Officer'];
  const primaryActions = currentActions?.slice(0, 3);
  const secondaryActions = currentActions?.slice(3);

  const handleAction = (action) => {
    if (action?.path) {
      window.location.href = action?.path;
    } else if (action?.action) {
      // Handle custom actions
      switch (action?.action) {
        case 'sync': console.log('Syncing offline data...');
          break;
        case 'batch-approve': console.log('Opening batch approval...');
          break;
        case 'generate-report': console.log('Generating report...');
          break;
        case 'search': console.log('Opening search...');
          break;
        default:
          console.log(`Executing action: ${action?.action}`);
      }
    }
    setIsExpanded(false);
  };

  // Don't show toolbar on mobile for space efficiency
  if (window.innerWidth < 768) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <div className="relative">
          <Button
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full elevation-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "X" : "Plus"} size={20} />
          </Button>

          {isExpanded && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-popover border border-border rounded-md elevation-3 animate-slide-in">
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  Quick Actions - {userRole}
                </div>
                {currentActions?.map((action) => (
                  <button
                    key={action?.id}
                    className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth"
                    onClick={() => handleAction(action)}
                  >
                    <Icon name={action?.icon} size={16} className="mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action?.label}</div>
                      <div className="text-xs text-muted-foreground">{action?.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden md:block bg-card border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 py-2">
        <div className="flex items-center space-x-2">
          <div className="text-xs font-medium text-muted-foreground">
            Quick Actions:
          </div>
          <div className="flex items-center space-x-1">
            {primaryActions?.map((action) => (
              <Button
                key={action?.id}
                variant="ghost"
                size="sm"
                className="px-3 py-1.5 text-xs font-medium transition-smooth"
                onClick={() => handleAction(action)}
                title={`${action?.description} (${action?.shortcut})`}
              >
                <Icon name={action?.icon} size={14} className="mr-1.5" />
                {action?.label}
              </Button>
            ))}
            
            {secondaryActions?.length > 0 && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 py-1.5 text-xs font-medium transition-smooth"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
                
                {isExpanded && (
                  <div className="absolute left-0 top-full mt-1 w-56 bg-popover border border-border rounded-md elevation-2 animate-slide-in z-50">
                    <div className="py-1">
                      {secondaryActions?.map((action) => (
                        <button
                          key={action?.id}
                          className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                          onClick={() => handleAction(action)}
                          title={action?.shortcut}
                        >
                          <Icon name={action?.icon} size={16} className="mr-3" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{action?.label}</div>
                            <div className="text-xs text-muted-foreground">{action?.description}</div>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {action?.shortcut}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Keyboard" size={12} />
            <span>Press Ctrl+K for command palette</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsToolbar;