import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationPanel = ({ isOpen, onToggle, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        title: 'New claim submitted',
        message: 'Claim #FR2025001 from Village Khandwa requires verification',
        time: '5 min ago',
        type: 'info',
        priority: 'medium',
        read: false,
        category: 'claim'
      },
      {
        id: 2,
        title: 'Committee review pending',
        message: '3 claims awaiting committee decision in Madhya Pradesh region',
        time: '1 hour ago',
        type: 'warning',
        priority: 'high',
        read: false,
        category: 'review'
      },
      {
        id: 3,
        title: 'Verification completed',
        message: 'Claim #FR2025002 has been approved and forwarded to committee',
        time: '2 hours ago',
        type: 'success',
        priority: 'low',
        read: true,
        category: 'verification'
      },
      {
        id: 4,
        title: 'System maintenance',
        message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM IST',
        time: '3 hours ago',
        type: 'info',
        priority: 'low',
        read: false,
        category: 'system'
      },
      {
        id: 5,
        title: 'Document upload failed',
        message: 'Claim #FR2025003 - Survey document upload failed. Please retry.',
        time: '4 hours ago',
        type: 'error',
        priority: 'high',
        read: false,
        category: 'error'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications?.filter(n => !n?.read)?.length);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityIndicator = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification?.read;
    return notification?.category === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'claim', label: 'Claims', count: notifications?.filter(n => n?.category === 'claim')?.length },
    { value: 'review', label: 'Reviews', count: notifications?.filter(n => n?.category === 'review')?.length },
    { value: 'verification', label: 'Verification', count: notifications?.filter(n => n?.category === 'verification')?.length }
  ];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={onToggle}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-md elevation-3 animate-slide-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-popover-foreground">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={markAllAsRead}
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={onClose}
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1 p-2 border-b border-border overflow-x-auto">
            {filterOptions?.map((option) => (
              <button
                key={option?.value}
                className={`flex items-center px-3 py-1 text-xs font-medium rounded-full transition-smooth whitespace-nowrap ${
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

          {/* Notifications List */}
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
                  className={`p-4 border-b border-border hover:bg-muted/50 transition-smooth cursor-pointer ${
                    !notification?.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => markAsRead(notification?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Icon 
                        name={getNotificationIcon(notification?.type)} 
                        size={16} 
                        className={getNotificationColor(notification?.type)}
                      />
                      <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getPriorityIndicator(notification?.priority)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${!notification?.read ? 'text-popover-foreground' : 'text-muted-foreground'}`}>
                          {notification?.title}
                        </p>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification?.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">{notification?.time}</p>
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

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <Button variant="ghost" size="sm" className="w-full">
              <Icon name="ExternalLink" size={14} className="mr-2" />
              View all notifications
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;