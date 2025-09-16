import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/multi-role-dashboard', icon: 'LayoutDashboard' },
    { label: 'Claims', path: '/claim-upload-interface', icon: 'FileText' },
    { label: 'Maps', path: '/interactive-web-gis-map', icon: 'Map' },
    { label: 'Verification', path: '/claim-verification', icon: 'CheckCircle' },
    { label: 'Review', path: '/committee-review', icon: 'Users' }
  ];

  const notifications = [
    { id: 1, title: 'New claim submitted', message: 'Claim #FR2025001 requires verification', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Committee review pending', message: '3 claims awaiting committee decision', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'Verification completed', message: 'Claim #FR2025002 has been approved', time: '2 hours ago', type: 'success' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="TreePine" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-foreground">FRA Atlas WebGIS</h1>
            <p className="text-xs text-muted-foreground">Forest Rights Management</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.slice(0, 4)?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              className="px-3 py-2 text-sm font-medium transition-smooth hover:bg-muted"
              onClick={() => handleNavigation(item?.path)}
            >
              <Icon name={item?.icon} size={16} className="mr-2" />
              {item?.label}
            </Button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="px-3 py-2 text-sm font-medium transition-smooth hover:bg-muted"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name="MoreHorizontal" size={16} className="mr-2" />
              More
            </Button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md elevation-2 animate-slide-in">
                <div className="py-1">
                  {navigationItems?.slice(4)?.map((item) => (
                    <button
                      key={item?.path}
                      className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                      onClick={() => handleNavigation(item?.path)}
                    >
                      <Icon name={item?.icon} size={16} className="mr-2" />
                      {item?.label}
                    </button>
                  ))}
                  <hr className="my-1 border-border" />
                  <button className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Role Badge */}
          <div className="hidden md:flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20">
            <Icon name="Shield" size={12} className="mr-1" />
            Field Officer
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleNotifications}
            >
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-md elevation-3 animate-slide-in">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="p-4 border-b border-border hover:bg-muted/50 transition-smooth">
                      <div className="flex items-start space-x-3">
                        <Icon 
                          name={getNotificationIcon(notification?.type)} 
                          size={16} 
                          className={getNotificationColor(notification?.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-popover-foreground">{notification?.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleProfile}
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                RK
              </div>
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md elevation-3 animate-slide-in">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">Rajesh Kumar</p>
                  <p className="text-sm text-muted-foreground">rajesh.kumar@fra.gov.in</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="Globe" size={16} className="mr-3" />
                    Language
                  </button>
                  <hr className="my-1 border-border" />
                  <button className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-muted transition-smooth">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border elevation-2">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth"
                onClick={() => handleNavigation(item?.path)}
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </button>
            ))}
            <hr className="my-2 border-border" />
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth">
              <Icon name="Settings" size={16} className="mr-3" />
              Settings
            </button>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth">
              <Icon name="HelpCircle" size={16} className="mr-3" />
              Help
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;