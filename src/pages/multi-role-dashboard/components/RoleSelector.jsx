import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleSelector = ({ currentRole, onRoleChange, availableRoles = [] }) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roleConfig = {
    'Field Officer': { 
      icon: 'MapPin', 
      color: 'bg-primary/10 text-primary border-primary/20',
      description: 'Field verification and claim collection',
      permissions: ['Upload Claims', 'Verify Locations', 'Field Visits']
    },
    'Committee Member': { 
      icon: 'Users', 
      color: 'bg-secondary/10 text-secondary border-secondary/20',
      description: 'Review and approve forest rights claims',
      permissions: ['Review Claims', 'Committee Meetings', 'Bulk Approval']
    },
    'Administrator': { 
      icon: 'Shield', 
      color: 'bg-accent/10 text-accent border-accent/20',
      description: 'System administration and user management',
      permissions: ['User Management', 'System Config', 'Audit Logs']
    },
    'Public Viewer': { 
      icon: 'Eye', 
      color: 'bg-muted text-muted-foreground border-border',
      description: 'View public forest rights information',
      permissions: ['Public Map', 'Search Claims', 'Download Data']
    },
    'Verification Officer': { 
      icon: 'CheckCircle', 
      color: 'bg-success/10 text-success border-success/20',
      description: 'Technical verification and validation',
      permissions: ['Technical Review', 'Document Validation', 'GIS Analysis']
    }
  };

  const currentConfig = roleConfig?.[currentRole] || roleConfig?.['Field Officer'];

  const handleRoleSwitch = (role) => {
    if (onRoleChange) {
      onRoleChange(role);
    }
    setIsRoleMenuOpen(false);
  };

  // If only one role available, show as badge without dropdown
  if (availableRoles?.length <= 1) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 elevation-1">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${currentConfig?.color}`}>
            <Icon name={currentConfig?.icon} size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{currentRole}</h3>
            <p className="text-sm text-muted-foreground">{currentConfig?.description}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">Permissions:</p>
          <div className="flex flex-wrap gap-1">
            {currentConfig?.permissions?.map((permission, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Current Role</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
          >
            Switch
          </Button>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${currentConfig?.color}`}>
            <Icon name={currentConfig?.icon} size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-foreground">{currentRole}</h4>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{currentConfig?.description}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Key Permissions:</p>
          <div className="flex flex-wrap gap-1">
            {currentConfig?.permissions?.slice(0, 3)?.map((permission, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                {permission}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isRoleMenuOpen && (
        <div className="border-t border-border bg-muted/30">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
              Available Roles
            </div>
            {availableRoles?.map((role) => {
              const config = roleConfig?.[role] || roleConfig?.['Field Officer'];
              return (
                <button
                  key={role}
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-card rounded-md transition-smooth ${
                    role === currentRole ? 'bg-card border border-border' : ''
                  }`}
                  onClick={() => handleRoleSwitch(role)}
                >
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mr-3 ${config?.color}`}>
                    <Icon name={config?.icon} size={16} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-foreground">{role}</div>
                    <div className="text-xs text-muted-foreground">{config?.description}</div>
                  </div>
                  {role === currentRole && (
                    <Icon name="Check" size={14} className="text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;