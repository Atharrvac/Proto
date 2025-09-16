import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AccessibilityControls = ({ isVisible, onToggle }) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    colorBlindFriendly: false
  });

  useEffect(() => {
    // Load saved accessibility preferences
    const savedSettings = localStorage.getItem('fra-atlas-accessibility');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    if (settings?.highContrast) {
      root.classList?.add('high-contrast');
    } else {
      root.classList?.remove('high-contrast');
    }
    
    if (settings?.largeText) {
      root.classList?.add('large-text');
    } else {
      root.classList?.remove('large-text');
    }
    
    if (settings?.reducedMotion) {
      root.classList?.add('reduced-motion');
    } else {
      root.classList?.remove('reduced-motion');
    }
    
    if (settings?.colorBlindFriendly) {
      root.classList?.add('color-blind-friendly');
    } else {
      root.classList?.remove('color-blind-friendly');
    }
    
    // Save settings
    localStorage.setItem('fra-atlas-accessibility', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      colorBlindFriendly: false
    };
    setSettings(defaultSettings);
  };

  const accessibilityOptions = [
    {
      key: 'highContrast',
      label: 'High Contrast Mode',
      description: 'Increases contrast for better visibility',
      icon: 'Contrast'
    },
    {
      key: 'largeText',
      label: 'Large Text',
      description: 'Increases font size for better readability',
      icon: 'Type'
    },
    {
      key: 'reducedMotion',
      label: 'Reduced Motion',
      description: 'Minimizes animations and transitions',
      icon: 'Pause'
    },
    {
      key: 'screenReader',
      label: 'Screen Reader Support',
      description: 'Enhanced support for screen readers',
      icon: 'Volume2'
    },
    {
      key: 'keyboardNavigation',
      label: 'Keyboard Navigation',
      description: 'Enhanced keyboard navigation support',
      icon: 'Keyboard'
    },
    {
      key: 'colorBlindFriendly',
      label: 'Color Blind Friendly',
      description: 'Uses patterns and shapes in addition to colors',
      icon: 'Eye'
    }
  ];

  if (!isVisible) {
    return (
      <div className="absolute bottom-20 right-4 z-10">
        <Button
          variant="default"
          size="sm"
          onClick={onToggle}
          className="bg-card border border-border elevation-2"
          title="Accessibility Options"
        >
          <Icon name="Accessibility" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-3 z-10">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Accessibility" size={18} className="mr-2" />
          Accessibility
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetSettings}
            className="text-xs"
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-6 h-6"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto p-4 space-y-4">
        {accessibilityOptions?.map((option) => (
          <div key={option?.key} className="space-y-2">
            <Checkbox
              label={option?.label}
              description={option?.description}
              checked={settings?.[option?.key]}
              onChange={(e) => handleSettingChange(option?.key, e?.target?.checked)}
            />
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border space-y-3">
        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSettingChange('highContrast', !settings?.highContrast)}
            className="flex-1"
          >
            <Icon name="Contrast" size={14} className="mr-1" />
            Contrast
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSettingChange('largeText', !settings?.largeText)}
            className="flex-1"
          >
            <Icon name="Type" size={14} className="mr-1" />
            Text Size
          </Button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="font-medium">Keyboard Shortcuts:</div>
          <div>• Tab: Navigate elements</div>
          <div>• Space/Enter: Activate buttons</div>
          <div>• Arrow keys: Navigate map</div>
          <div>• +/- : Zoom in/out</div>
          <div>• Esc: Close dialogs</div>
        </div>

        {/* Contact Info */}
        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <Icon name="HelpCircle" size={12} className="inline mr-1" />
            Need help? Contact accessibility support at{' '}
            <a href="mailto:accessibility@fra.gov.in" className="text-primary hover:underline">
              accessibility@fra.gov.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityControls;