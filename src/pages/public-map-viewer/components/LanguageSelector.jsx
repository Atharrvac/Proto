import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ onLanguageChange, isVisible, onToggle }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' }
  ];

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('fra-atlas-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('fra-atlas-language', languageCode);
    
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }
    
    // Close the selector
    if (onToggle) {
      onToggle();
    }
  };

  const getCurrentLanguage = () => {
    return languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];
  };

  if (!isVisible) {
    return (
      <div className="absolute top-4 right-20 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="bg-card border border-border elevation-2 px-3"
        >
          <span className="mr-2">{getCurrentLanguage()?.flag}</span>
          <span className="hidden sm:inline">{getCurrentLanguage()?.nativeName}</span>
          <span className="sm:hidden">{getCurrentLanguage()?.code?.toUpperCase()}</span>
          <Icon name="ChevronDown" size={14} className="ml-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 right-20 z-10">
      <div className="w-64 bg-card border border-border rounded-lg elevation-3">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center">
            <Icon name="Globe" size={18} className="mr-2" />
            Select Language
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-6 h-6"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        <div className="p-2">
          {languages?.map((language) => (
            <button
              key={language?.code}
              className={`flex items-center w-full px-3 py-2 text-left rounded-md transition-smooth ${
                currentLanguage === language?.code
                  ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted'
              }`}
              onClick={() => handleLanguageChange(language?.code)}
            >
              <span className="text-lg mr-3">{language?.flag}</span>
              <div className="flex-1">
                <div className="font-medium">{language?.nativeName}</div>
                <div className="text-xs text-muted-foreground">{language?.name}</div>
              </div>
              {currentLanguage === language?.code && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border bg-muted/30">
          <div className="text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            Language preference is saved locally and will persist across sessions
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;