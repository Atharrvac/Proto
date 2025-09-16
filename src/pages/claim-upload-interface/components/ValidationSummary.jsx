import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationSummary = ({ errors = {}, warnings = [], isValid = false, onFixError }) => {
  const errorCount = Object.keys(errors)?.length;
  const warningCount = warnings?.length;
  
  const errorCategories = {
    applicant: {
      title: 'Applicant Information',
      icon: 'User',
      fields: ['applicantName', 'guardianName', 'mobileNumber', 'email']
    },
    address: {
      title: 'Address Details',
      icon: 'MapPin',
      fields: ['village', 'block', 'district', 'state', 'pinCode']
    },
    claim: {
      title: 'Claim Information',
      icon: 'FileText',
      fields: ['claimType', 'landType', 'totalArea', 'description']
    },
    location: {
      title: 'Location Coordinates',
      icon: 'Navigation',
      fields: ['centerLat', 'centerLng', 'coordinates']
    },
    documents: {
      title: 'Documents & Declaration',
      icon: 'Paperclip',
      fields: ['documentTypes', 'declaration1', 'declaration2', 'dataConsent']
    }
  };

  const getErrorsByCategory = () => {
    const categorizedErrors = {};
    
    Object.entries(errorCategories)?.forEach(([categoryKey, category]) => {
      const categoryErrors = {};
      category?.fields?.forEach(field => {
        if (errors?.[field]) {
          categoryErrors[field] = errors?.[field];
        }
      });
      
      if (Object.keys(categoryErrors)?.length > 0) {
        categorizedErrors[categoryKey] = {
          ...category,
          errors: categoryErrors
        };
      }
    });
    
    return categorizedErrors;
  };

  const categorizedErrors = getErrorsByCategory();

  const getFieldLabel = (fieldKey) => {
    const fieldLabels = {
      applicantName: 'Full Name',
      guardianName: "Father\'s/Husband\'s Name",
      mobileNumber: 'Mobile Number',
      email: 'Email Address',
      village: 'Village',
      block: 'Block/Tehsil',
      district: 'District',
      state: 'State',
      pinCode: 'PIN Code',
      claimType: 'Claim Type',
      landType: 'Land Type',
      totalArea: 'Total Area',
      description: 'Claim Description',
      centerLat: 'Center Latitude',
      centerLng: 'Center Longitude',
      coordinates: 'Location Coordinates',
      documentTypes: 'Document Types',
      declaration1: 'Truth Declaration',
      declaration2: 'False Information Warning',
      dataConsent: 'Data Processing Consent'
    };
    
    return fieldLabels?.[fieldKey] || fieldKey;
  };

  if (isValid && errorCount === 0 && warningCount === 0) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={24} className="text-success-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-success">All Validations Passed!</h3>
            <p className="text-success/80 mt-1">Your claim is ready for submission.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className={`border rounded-lg p-6 ${
        errorCount > 0 
          ? 'bg-error/5 border-error/20' 
          : warningCount > 0 
          ? 'bg-warning/5 border-warning/20' :'bg-muted/30 border-border'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            errorCount > 0 
              ? 'bg-error text-error-foreground' 
              : warningCount > 0 
              ? 'bg-warning text-warning-foreground'
              : 'bg-muted text-muted-foreground'
          }`}>
            <Icon name={errorCount > 0 ? "AlertCircle" : warningCount > 0 ? "AlertTriangle" : "Info"} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {errorCount > 0 ? 'Validation Errors Found' : 'Review Required'}
            </h3>
            <p className="text-muted-foreground mt-1">
              {errorCount > 0 && `${errorCount} error${errorCount > 1 ? 's' : ''} must be fixed before submission`}
              {errorCount === 0 && warningCount > 0 && `${warningCount} warning${warningCount > 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>
      </div>
      {/* Error Categories */}
      {Object.entries(categorizedErrors)?.map(([categoryKey, category]) => (
        <div key={categoryKey} className="bg-card border border-border rounded-lg">
          <div className="bg-error/5 border-b border-error/20 p-4">
            <div className="flex items-center space-x-2">
              <Icon name={category?.icon} size={20} className="text-error" />
              <h4 className="font-semibold text-foreground">{category?.title}</h4>
              <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full">
                {Object.keys(category?.errors)?.length} error{Object.keys(category?.errors)?.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {Object.entries(category?.errors)?.map(([fieldKey, errorMessage]) => (
              <div key={fieldKey} className="flex items-start space-x-3">
                <Icon name="X" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{getFieldLabel(fieldKey)}</p>
                  <p className="text-sm text-error mt-1">{errorMessage}</p>
                </div>
                {onFixError && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFixError(fieldKey)}
                    className="text-error border-error/20 hover:bg-error/5"
                  >
                    Fix
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Warnings */}
      {warnings?.length > 0 && (
        <div className="bg-card border border-border rounded-lg">
          <div className="bg-warning/5 border-b border-warning/20 p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <h4 className="font-semibold text-foreground">Warnings</h4>
              <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                {warnings?.length} warning{warnings?.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            {warnings?.map((warning, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{warning?.message}</p>
                  {warning?.suggestion && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Suggestion: {warning?.suggestion}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Validation Tips */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Validation Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure all required fields are filled with accurate information</li>
              <li>• Upload clear, readable documents in PDF or image format</li>
              <li>• Verify location coordinates are within the correct geographical area</li>
              <li>• Double-check mobile number and email for future communications</li>
              <li>• Review all declarations before accepting them</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationSummary;