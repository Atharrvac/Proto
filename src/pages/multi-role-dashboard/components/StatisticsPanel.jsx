import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ userRole = 'Field Officer' }) => {
  const roleBasedStats = {
    'Field Officer': [
      { label: 'Active Claims', value: '24', change: '+3', trend: 'up', icon: 'FileText', color: 'text-primary' },
      { label: 'Pending Verification', value: '8', change: '-2', trend: 'down', icon: 'Clock', color: 'text-warning' },
      { label: 'Completed Today', value: '5', change: '+5', trend: 'up', icon: 'CheckCircle', color: 'text-success' },
      { label: 'Field Visits', value: '12', change: '+1', trend: 'up', icon: 'MapPin', color: 'text-accent' }
    ],
    'Committee Member': [
      { label: 'Pending Reviews', value: '18', change: '+6', trend: 'up', icon: 'Users', color: 'text-primary' },
      { label: 'Approved Claims', value: '142', change: '+12', trend: 'up', icon: 'CheckCircle2', color: 'text-success' },
      { label: 'Rejected Claims', value: '8', change: '+2', trend: 'up', icon: 'XCircle', color: 'text-error' },
      { label: 'Committee Meetings', value: '3', change: '0', trend: 'neutral', icon: 'Calendar', color: 'text-accent' }
    ],
    'Administrator': [
      { label: 'Total Claims', value: '1,247', change: '+89', trend: 'up', icon: 'Database', color: 'text-primary' },
      { label: 'Active Users', value: '156', change: '+12', trend: 'up', icon: 'Users', color: 'text-success' },
      { label: 'System Uptime', value: '99.8%', change: '+0.2%', trend: 'up', icon: 'Activity', color: 'text-accent' },
      { label: 'Data Storage', value: '2.4TB', change: '+120GB', trend: 'up', icon: 'HardDrive', color: 'text-warning' }
    ],
    'Public Viewer': [
      { label: 'Public Claims', value: '892', change: '+15', trend: 'up', icon: 'Globe', color: 'text-primary' },
      { label: 'Approved Rights', value: '634', change: '+8', trend: 'up', icon: 'Shield', color: 'text-success' },
      { label: 'Forest Area', value: '45.2K ha', change: '+0.8K', trend: 'up', icon: 'TreePine', color: 'text-accent' },
      { label: 'Communities', value: '78', change: '+2', trend: 'up', icon: 'Home', color: 'text-secondary' }
    ]
  };

  const stats = roleBasedStats?.[userRole] || roleBasedStats?.['Field Officer'];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor(stat?.trend)}`}>
              <Icon name={getTrendIcon(stat?.trend)} size={16} />
              <span>{stat?.change}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            <p className="text-sm text-muted-foreground">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsPanel;