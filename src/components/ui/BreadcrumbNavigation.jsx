import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbNavigation = ({ 
  items = [], 
  currentPage = '', 
  showHome = true,
  maxItems = 4 
}) => {
  const homeItem = { label: 'Dashboard', path: '/multi-role-dashboard', icon: 'Home' };
  
  // Build breadcrumb items
  let breadcrumbItems = [];
  
  if (showHome) {
    breadcrumbItems?.push(homeItem);
  }
  
  // Add provided items
  breadcrumbItems = [...breadcrumbItems, ...items];
  
  // Add current page if not already included
  if (currentPage && !breadcrumbItems?.some(item => item?.label === currentPage)) {
    breadcrumbItems?.push({ label: currentPage, path: '', current: true });
  }

  // Handle overflow - show first item, ellipsis, and last few items
  const shouldTruncate = breadcrumbItems?.length > maxItems;
  let displayItems = breadcrumbItems;
  
  if (shouldTruncate) {
    const firstItem = breadcrumbItems?.[0];
    const lastItems = breadcrumbItems?.slice(-2);
    displayItems = [firstItem, { ellipsis: true }, ...lastItems];
  }

  const handleNavigation = (path) => {
    if (path) {
      window.location.href = path;
    }
  };

  const getPageIcon = (label) => {
    const iconMap = {
      'Dashboard': 'LayoutDashboard',
      'Claims': 'FileText',
      'Upload': 'Upload',
      'Verification': 'CheckCircle',
      'Review': 'Users',
      'Maps': 'Map',
      'Interactive Map': 'Map',
      'Public Map': 'Globe',
      'Settings': 'Settings',
      'Profile': 'User',
      'Reports': 'BarChart3',
      'Analytics': 'TrendingUp'
    };
    
    return iconMap?.[label] || 'ChevronRight';
  };

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground py-2" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {displayItems?.map((item, index) => (
          <li key={index} className="flex items-center">
            {item?.ellipsis ? (
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-1 py-0.5 h-auto text-muted-foreground hover:text-foreground"
                  title="Show hidden items"
                >
                  <Icon name="MoreHorizontal" size={14} />
                </Button>
                <Icon name="ChevronRight" size={14} className="text-border" />
              </div>
            ) : (
              <>
                {item?.current || !item?.path ? (
                  <div className="flex items-center space-x-1.5 px-2 py-1 text-foreground font-medium">
                    <Icon name={getPageIcon(item?.label)} size={14} />
                    <span>{item?.label}</span>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1.5 px-2 py-1 h-auto text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => handleNavigation(item?.path)}
                  >
                    {item?.icon && <Icon name={item?.icon} size={14} />}
                    {!item?.icon && index === 0 && <Icon name={getPageIcon(item?.label)} size={14} />}
                    <span>{item?.label}</span>
                  </Button>
                )}
                
                {index < displayItems?.length - 1 && !displayItems?.[index + 1]?.ellipsis && (
                  <Icon name="ChevronRight" size={14} className="mx-1 text-border" />
                )}
              </>
            )}
          </li>
        ))}
      </ol>
      {/* Mobile: Show only current page */}
      <div className="md:hidden flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-1 h-auto"
          onClick={() => window.history?.back()}
        >
          <Icon name="ArrowLeft" size={14} />
        </Button>
        <div className="flex items-center space-x-1.5 text-foreground font-medium">
          <Icon name={getPageIcon(currentPage)} size={14} />
          <span>{currentPage}</span>
        </div>
      </div>
    </nav>
  );
};

// Predefined breadcrumb configurations for common pages
export const breadcrumbConfigs = {
  '/multi-role-dashboard': {
    items: [],
    currentPage: 'Dashboard'
  },
  '/claim-upload-interface': {
    items: [
      { label: 'Claims', path: '/claims' }
    ],
    currentPage: 'Upload Claim'
  },
  '/claim-verification': {
    items: [
      { label: 'Claims', path: '/claims' }
    ],
    currentPage: 'Verification'
  },
  '/committee-review': {
    items: [
      { label: 'Claims', path: '/claims' }
    ],
    currentPage: 'Committee Review'
  },
  '/interactive-web-gis-map': {
    items: [
      { label: 'Maps', path: '/maps' }
    ],
    currentPage: 'Interactive Map'
  },
  '/public-map-viewer': {
    items: [
      { label: 'Maps', path: '/maps' }
    ],
    currentPage: 'Public Map Viewer'
  }
};

export default BreadcrumbNavigation;