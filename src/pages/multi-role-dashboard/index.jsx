import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatisticsPanel from './components/StatisticsPanel';
import MapPreview from './components/MapPreview';
import QuickActionCards from './components/QuickActionCards';
import NotificationPanel from './components/NotificationPanel';
import RecentActivityFeed from './components/RecentActivityFeed';
import RoleSelector from './components/RoleSelector';

const MultiRoleDashboard = () => {
  const [currentRole, setCurrentRole] = useState('Field Officer');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: '28°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    location: 'Khandwa, MP'
  });

  // Available roles for demo - in real app this would come from user permissions
  const availableRoles = [
    'Field Officer',
    'Committee Member', 
    'Administrator',
    'Public Viewer'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    console.log(`Role switched to: ${newRole}`);
  };

  const getRoleGreeting = () => {
    const hour = currentTime?.getHours();
    const timeGreeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
    
    const roleSpecificGreeting = {
      'Field Officer': 'Ready for field work today?',
      'Committee Member': 'Review pending claims await your attention.',
      'Administrator': 'System status and user management overview.',
      'Public Viewer': 'Explore public forest rights information.'
    };

    return {
      greeting: timeGreeting,
      message: roleSpecificGreeting?.[currentRole] || roleSpecificGreeting?.['Field Officer']
    };
  };

  const greeting = getRoleGreeting();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="TreePine" size={32} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {greeting?.greeting}, Rajesh Kumar
                  </h1>
                  <p className="text-muted-foreground">{greeting?.message}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{currentTime?.toLocaleDateString('en-IN', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{currentTime?.toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Quick Info */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-muted rounded-lg">
                <Icon name="Cloud" size={20} className="text-accent" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">{weatherData?.temperature}</p>
                  <p className="text-muted-foreground">{weatherData?.condition}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-3 space-y-6">
            {/* Statistics Panel */}
            <StatisticsPanel userRole={currentRole} />

            {/* Quick Action Cards */}
            <QuickActionCards userRole={currentRole} />

            {/* Map Preview */}
            <MapPreview userRole={currentRole} />

            {/* Recent Activity Feed */}
            <RecentActivityFeed userRole={currentRole} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Role Selector */}
            <RoleSelector 
              currentRole={currentRole}
              onRoleChange={handleRoleChange}
              availableRoles={availableRoles}
            />

            {/* Notifications Panel */}
            <NotificationPanel userRole={currentRole} />

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-lg p-4 elevation-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  iconName="Map"
                  iconPosition="left"
                  onClick={() => window.location.href = '/interactive-web-gis-map'}
                >
                  Interactive Map
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => window.location.href = '/claim-upload-interface'}
                >
                  Upload Claim
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  iconName="CheckCircle"
                  iconPosition="left"
                  onClick={() => window.location.href = '/claim-verification'}
                >
                  Verify Claims
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  iconName="Users"
                  iconPosition="left"
                  onClick={() => window.location.href = '/committee-review'}
                >
                  Committee Review
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  iconName="Globe"
                  iconPosition="left"
                  onClick={() => window.location.href = '/public-map-viewer'}
                >
                  Public Map
                </Button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-card border border-border rounded-lg p-4 elevation-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm text-success">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Map Services</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm text-success">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">File Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <span className="text-sm text-warning">85% Full</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="TreePine" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">FRA Atlas WebGIS</p>
                <p className="text-xs text-muted-foreground">Forest Rights Management System</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} Government of India. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MultiRoleDashboard;