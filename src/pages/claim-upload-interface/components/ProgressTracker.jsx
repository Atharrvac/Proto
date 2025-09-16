import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ currentStep = 1, completedSteps = [] }) => {
  const steps = [
    {
      id: 1,
      title: 'Document Upload',
      description: 'Upload required documents',
      icon: 'Upload'
    },
    {
      id: 2,
      title: 'Claim Details',
      description: 'Fill claim information',
      icon: 'FileText'
    },
    {
      id: 3,
      title: 'Location Mapping',
      description: 'Set geographical coordinates',
      icon: 'MapPin'
    },
    {
      id: 4,
      title: 'Review & Submit',
      description: 'Review and submit claim',
      icon: 'CheckCircle'
    }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps?.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    if (stepId < currentStep) return 'completed';
    return 'pending';
  };

  const getStepIcon = (step) => {
    const status = getStepStatus(step?.id);
    if (status === 'completed') return 'CheckCircle';
    if (status === 'current') return step?.icon;
    return step?.icon;
  };

  const getStepClasses = (stepId) => {
    const status = getStepStatus(stepId);
    
    switch (status) {
      case 'completed':
        return {
          container: 'text-success',
          icon: 'bg-success text-success-foreground',
          line: 'bg-success'
        };
      case 'current':
        return {
          container: 'text-primary',
          icon: 'bg-primary text-primary-foreground',
          line: 'bg-border'
        };
      default:
        return {
          container: 'text-muted-foreground',
          icon: 'bg-muted text-muted-foreground',
          line: 'bg-border'
        };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Route" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Claim Submission Progress</h3>
      </div>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-8">
          {steps?.map((step, index) => {
            const classes = getStepClasses(step?.id);
            const isLast = index === steps?.length - 1;
            
            return (
              <div key={step?.id} className="relative flex items-start space-x-4">
                {/* Step Icon */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-background ${classes?.icon} transition-smooth`}>
                  <Icon name={getStepIcon(step)} size={20} />
                </div>
                {/* Step Content */}
                <div className={`flex-1 min-w-0 pb-8 ${classes?.container}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold">{step?.title}</h4>
                      <p className="text-sm opacity-80 mt-1">{step?.description}</p>
                    </div>
                    
                    {/* Step Status Badge */}
                    <div className="flex items-center space-x-2">
                      {getStepStatus(step?.id) === 'completed' && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                          <Icon name="Check" size={12} />
                          <span>Complete</span>
                        </div>
                      )}
                      
                      {getStepStatus(step?.id) === 'current' && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span>In Progress</span>
                        </div>
                      )}
                      
                      {getStepStatus(step?.id) === 'pending' && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          <Icon name="Clock" size={12} />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Additional Step Info */}
                  {getStepStatus(step?.id) === 'current' && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-md">
                      <div className="flex items-center space-x-2">
                        <Icon name="Info" size={16} className="text-primary" />
                        <div className="text-sm">
                          {step?.id === 1 && "Upload your supporting documents in PDF or image format"}
                          {step?.id === 2 && "Provide accurate claim details and applicant information"}
                          {step?.id === 3 && "Mark your claim location on the interactive map"}
                          {step?.id === 4 && "Review all information before final submission"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Progress Line Segment */}
                {!isLast && (
                  <div className={`absolute left-6 top-12 w-0.5 h-8 ${
                    getStepStatus(step?.id) === 'completed' ? 'bg-success' : 'bg-border'
                  } transition-smooth`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Estimated completion time: 15-20 minutes</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-muted-foreground">
              Progress: {completedSteps?.length}/{steps?.length} steps
            </div>
            <div className="w-24 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps?.length / steps?.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;