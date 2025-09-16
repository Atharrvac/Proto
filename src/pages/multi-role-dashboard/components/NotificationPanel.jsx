import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ userRole = 'Field Officer' }) => {
  const [filter, setFilter] = useState('all');

  const roleBasedNotifications = {
    'Field Officer': [
      {
        id: 1,
        title: 'New claim assignment',
        message: 'Claim #FR2025001 from Village Khandwa assigned for field verification',
        time: '5 minutes ago',
        type: 'assignment',
        priority: 'high',
        read: false,
        icon: 'MapPin'
      },
      {
        id: 2,
        title: 'Document upload required',
        message: 'Claim #FR2025002 missing survey documents. Upload required within 24 hours',
        time: '1 hour ago',
        type: 'action',
        priority: 'medium',
        read: false,
        icon: 'Upload'
      },
      {
        id: 3,
        title: 'Field visit scheduled',
        message: 'Site visit scheduled for tomorrow 10:00 AM at Village Pandhana',
        time: '2 hours ago',
        type: 'schedule',
        priority: 'medium',
        read: true,
        icon: 'Calendar'
      },
      {
        id: 4,
        title: 'Verification completed',
        message: 'Successfully verified claim #FR2025003. Forwarded to committee review',
        time: '3 hours ago',
        type: 'success',
        priority: 'low',
        read: true,
        icon: 'CheckCircle'
      }
    ],
    'Committee Member': [
      {
        id: 1,
        title: 'Committee meeting reminder',
        message: 'Monthly review meeting scheduled for tomorrow 2:00 PM in Conference Room A',
        time: '30 minutes ago',
        type: 'meeting',
        priority: 'high',
        read: false,
        icon: 'Users'
      },
      {
        id: 2,
        title: 'Claims pending review',
        message: '18 claims awaiting committee decision. Review deadline: End of week',
        time: '2 hours ago',
        type: 'review',
        priority: 'high',
        read: false,
        icon: 'FileCheck'
      },
      {
        id: 3,
        title: 'Batch approval completed',
        message: 'Successfully approved 12 claims from Khandwa district',
        time: '4 hours ago',
        type: 'success',
        priority: 'low',
        read: true,
        icon: 'CheckCircle2'
      }
    ],
    'Administrator': [
      {
        id: 1,
        title: 'System maintenance scheduled',
        message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM IST. Users will be notified',
        time: '1 hour ago',
        type: 'system',
        priority: 'medium',
        read: false,
        icon: 'Settings'
      },
      {
        id: 2,
        title: 'New user registration',
        message: '12 new field officers registered this week. Approval required',
        time: '3 hours ago',
        type: 'user',
        priority: 'medium',
        read: false,
        icon: 'UserPlus'
      },
      {
        id: 3,
        title: 'Data backup completed',
        message: 'Daily backup completed successfully. 2.4TB data archived',
        time: '6 hours ago',
        type: 'backup',
        priority: 'low',
        read: true,
        icon: 'Database'
      }
    ],
    'Public Viewer': [
      {
        id: 1,
        title: 'New public data available',
        message: '15 new approved forest rights claims published in public dataset',
        time: '2 hours ago',
        type: 'data',
        priority: 'low',
        read: false,
        icon: 'Globe'
      },
      {
        id: 2,
        title: 'Map layer updated',
        message: 'Forest cover layer updated with latest satellite imagery',
        time: '1 day ago',
        type: 'update',
        priority: 'low',
        read: true,
        icon: 'Map'
      }
    ]
  };

  const notifications = roleBasedNotifications?.[userRole] || roleBasedNotifications?.['Field Officer'];

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.type === filter;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-muted';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'assignment': return 'text-primary';
      case 'action': return 'text-warning';
      case 'success': return 'text-success';
      case 'meeting': return 'text-accent';
      case 'system': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'assignment', label: 'Assignments', count: notifications?.filter(n => n?.type === 'assignment')?.length },
    { value: 'action', label: 'Actions', count: notifications?.filter(n => n?.type === 'action')?.length }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                {unreadCount} new
              </span>
            )}
            <Button variant="ghost" size="sm" iconName="Settings" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full transition-smooth whitespace-nowrap ${
                filter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
              onClick={() => setFilter(option?.value)}
            >
              {option?.label}
              {option?.count > 0 && (
                <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                  filter === option?.value
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {option?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 border-b border-border hover:bg-muted/50 transition-smooth border-l-4 ${getPriorityColor(notification?.priority)} ${
                !notification?.read ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getTypeColor(notification?.type)}`}>
                  <Icon name={notification?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification?.title}
                    </p>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {notification?.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification?.time}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      notification?.priority === 'high' ?'bg-error/10 text-error'
                        : notification?.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                    }`}>
                      {notification?.priority}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full" iconName="ExternalLink" iconPosition="right">
          View all notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationPanel;