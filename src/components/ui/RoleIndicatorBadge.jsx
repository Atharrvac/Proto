import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const RoleIndicatorBadge = ({ currentRole = 'Field Officer', availableRoles = [], onRoleChange }) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const roleConfig = {
    'Field Officer': { icon: 'MapPin', color: 'bg-primary/10 text-primary border-primary/20' },
    'Committee Member': { icon: 'Users', color: 'bg-secondary/10 text-secondary border-secondary/20' },
    'Administrator': { icon: 'Shield', color: 'bg-accent/10 text-accent border-accent/20' },
    'Public Viewer': { icon: 'Eye', color: 'bg-muted text-muted-foreground border-border' },
    'Verification Officer': { icon: 'CheckCircle', color: 'bg-success/10 text-success border-success/20' }
  };

  const handleRoleSwitch = (role) => {
    if (onRoleChange) {
      onRoleChange(role);
    }
    setIsRoleMenuOpen(false);
  };

  const currentConfig = roleConfig?.[currentRole] || roleConfig?.['Field Officer'];

  return (
    <div className="relative">
      {availableRoles?.length > 1 ? (
        <Button
          variant="ghost"
          size="sm"
          className={`px-3 py-1 text-xs font-medium rounded-full border transition-smooth ${currentConfig?.color}`}
          onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
        >
          <Icon name={currentConfig?.icon} size={12} className="mr-1" />
          <span className="hidden sm:inline">{currentRole}</span>
          <span className="sm:hidden">{currentRole?.split(' ')?.[0]}</span>
          <Icon name="ChevronDown" size={12} className="ml-1" />
        </Button>
      ) : (
        <div className={`flex items-center px-3 py-1 text-xs font-medium rounded-full border ${currentConfig?.color}`}>
          <Icon name={currentConfig?.icon} size={12} className="mr-1" />
          <span className="hidden sm:inline">{currentRole}</span>
          <span className="sm:hidden">{currentRole?.split(' ')?.[0]}</span>
        </div>
      )}
      {isRoleMenuOpen && availableRoles?.length > 1 && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md elevation-2 animate-slide-in z-50">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border">
              Switch Role
            </div>
            {availableRoles?.map((role) => {
              const config = roleConfig?.[role] || roleConfig?.['Field Officer'];
              return (
                <button
                  key={role}
                  className={`flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-smooth ${
                    role === currentRole ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => handleRoleSwitch(role)}
                >
                  <Icon name={config?.icon} size={16} className="mr-2" />
                  {role}
                  {role === currentRole && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
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

export default RoleIndicatorBadge;