import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import QuickActionsToolbar from '../../components/ui/QuickActionsToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DocumentUploadSection from './components/DocumentUploadSection';
import ClaimMetadataForm from './components/ClaimMetadataForm';
import GeospatialMapIntegration from './components/GeospatialMapIntegration';
import ProgressTracker from './components/ProgressTracker';
import ValidationSummary from './components/ValidationSummary';

const ClaimUploadInterface = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [coordinates, setCoordinates] = useState({
    center: { lat: 23.2599, lng: 77.4126 }
  });
  const [boundaryPoints, setBoundaryPoints] = useState([]);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState([]);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save draft functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (Object.keys(formData)?.length > 0 || uploadedFiles?.length > 0) {
        localStorage.setItem('claimDraft', JSON.stringify({
          formData,
          uploadedFiles: uploadedFiles?.map(f => ({ name: f?.name, size: f?.size, type: f?.type })),
          coordinates,
          boundaryPoints,
          currentStep,
          completedSteps,
          timestamp: new Date()?.toISOString()
        }));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }
    }, 3000);

    return () => clearTimeout(saveTimer);
  }, [formData, uploadedFiles, coordinates, boundaryPoints, currentStep, completedSteps]);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('claimDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft?.formData || {});
        setCoordinates(draft?.coordinates || { center: { lat: 23.2599, lng: 77.4126 } });
        setBoundaryPoints(draft?.boundaryPoints || []);
        setCurrentStep(draft?.currentStep || 1);
        setCompletedSteps(draft?.completedSteps || []);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const validateCurrentStep = () => {
    const newErrors = {};
    const newWarnings = [];

    switch (currentStep) {
      case 1: // Document Upload
        if (uploadedFiles?.length === 0) {
          newErrors.documents = 'At least one document must be uploaded';
        }
        break;

      case 2: // Claim Details
        if (!formData?.applicantName?.trim()) {
          newErrors.applicantName = 'Applicant name is required';
        }
        if (!formData?.guardianName?.trim()) {
          newErrors.guardianName = "Father's/Husband's name is required";
        }
        if (!formData?.mobileNumber?.trim()) {
          newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/?.test(formData?.mobileNumber)) {
          newErrors.mobileNumber = 'Mobile number must be 10 digits';
        }
        if (!formData?.village?.trim()) {
          newErrors.village = 'Village name is required';
        }
        if (!formData?.district?.trim()) {
          newErrors.district = 'District name is required';
        }
        if (!formData?.state) {
          newErrors.state = 'State selection is required';
        }
        if (!formData?.claimType) {
          newErrors.claimType = 'Claim type selection is required';
        }
        if (!formData?.landType) {
          newErrors.landType = 'Land type selection is required';
        }
        if (!formData?.totalArea || parseFloat(formData?.totalArea) <= 0) {
          newErrors.totalArea = 'Valid total area is required';
        }
        if (!formData?.declaration1) {
          newErrors.declaration1 = 'Truth declaration must be accepted';
        }
        if (!formData?.declaration2) {
          newErrors.declaration2 = 'False information warning must be accepted';
        }
        if (!formData?.dataConsent) {
          newErrors.dataConsent = 'Data processing consent is required';
        }

        // Warnings
        if (!formData?.email?.trim()) {
          newWarnings?.push({
            message: 'Email address not provided',
            suggestion: 'Adding email will help with claim status updates'
          });
        }
        if (!formData?.description?.trim()) {
          newWarnings?.push({
            message: 'Claim description is empty',
            suggestion: 'Detailed description helps in faster processing'
          });
        }
        break;

      case 3: // Location Mapping
        if (!coordinates?.center?.lat || !coordinates?.center?.lng) {
          newErrors.coordinates = 'Location coordinates are required';
        } else {
          // Validate coordinate ranges for India
          const lat = parseFloat(coordinates?.center?.lat);
          const lng = parseFloat(coordinates?.center?.lng);
          
          if (lat < 6 || lat > 37) {
            newErrors.centerLat = 'Latitude must be within India (6° to 37° N)';
          }
          if (lng < 68 || lng > 97) {
            newErrors.centerLng = 'Longitude must be within India (68° to 97° E)';
          }
        }

        if (boundaryPoints?.length === 0) {
          newWarnings?.push({
            message: 'No boundary points defined',
            suggestion: 'Adding boundary points improves claim accuracy'
          });
        }
        break;

      case 4: // Review & Submit
        // Final validation of all steps
        if (uploadedFiles?.length === 0) {
          newErrors.documents = 'Documents are required for submission';
        }
        if (!formData?.applicantName || !formData?.claimType) {
          newErrors.form = 'Required form fields are missing';
        }
        if (!coordinates?.center?.lat || !coordinates?.center?.lng) {
          newErrors.location = 'Location coordinates are required';
        }
        break;
    }

    setErrors(newErrors);
    setWarnings(newWarnings);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      const newCompletedSteps = [...completedSteps];
      if (!newCompletedSteps?.includes(currentStep)) {
        newCompletedSteps?.push(currentStep);
        setCompletedSteps(newCompletedSteps);
      }
      
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep || completedSteps?.includes(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear draft after successful submission
      localStorage.removeItem('claimDraft');
      
      // Show success message and redirect
      alert('Claim submitted successfully! You will receive a confirmation email shortly.');
      window.location.href = '/multi-role-dashboard';
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilesChange = (files) => {
    setUploadedFiles(Array.from(files));
    setIsUploading(false);
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  const handleBoundaryChange = (newBoundaryPoints) => {
    setBoundaryPoints(newBoundaryPoints);
  };

  const handleFixError = (fieldKey) => {
    // Navigate to appropriate step based on field
    if (['documents']?.includes(fieldKey)) {
      setCurrentStep(1);
    } else if (['applicantName', 'guardianName', 'mobileNumber', 'village', 'district', 'state', 'claimType', 'landType', 'totalArea', 'declaration1', 'declaration2', 'dataConsent']?.includes(fieldKey)) {
      setCurrentStep(2);
    } else if (['coordinates', 'centerLat', 'centerLng']?.includes(fieldKey)) {
      setCurrentStep(3);
    }
  };

  const clearDraft = () => {
    if (confirm('Are you sure you want to clear all data and start over?')) {
      localStorage.removeItem('claimDraft');
      setFormData({});
      setUploadedFiles([]);
      setCoordinates({ center: { lat: 23.2599, lng: 77.4126 } });
      setBoundaryPoints([]);
      setCurrentStep(1);
      setCompletedSteps([]);
      setErrors({});
      setWarnings([]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DocumentUploadSection
            onFilesChange={handleFilesChange}
            uploadedFiles={uploadedFiles}
            isUploading={isUploading}
          />
        );
      
      case 2:
        return (
          <ClaimMetadataForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      
      case 3:
        return (
          <GeospatialMapIntegration
            coordinates={coordinates}
            onCoordinatesChange={handleCoordinatesChange}
            boundaryPoints={boundaryPoints}
            onBoundaryChange={handleBoundaryChange}
          />
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <ValidationSummary
              errors={errors}
              warnings={warnings}
              isValid={Object.keys(errors)?.length === 0}
              onFixError={handleFixError}
            />
            {Object.keys(errors)?.length === 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Submission Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Applicant Details</h4>
                    <p><strong>Name:</strong> {formData?.applicantName}</p>
                    <p><strong>Mobile:</strong> {formData?.mobileNumber}</p>
                    <p><strong>Village:</strong> {formData?.village}, {formData?.district}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Claim Details</h4>
                    <p><strong>Type:</strong> {formData?.claimType}</p>
                    <p><strong>Area:</strong> {formData?.totalArea} hectares</p>
                    <p><strong>Documents:</strong> {uploadedFiles?.length} files uploaded</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuickActionsToolbar userRole="Field Officer" currentPage="claim-upload" />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <BreadcrumbNavigation
            items={[
              { label: 'Claims', path: '/claims' }
            ]}
            currentPage="Upload Claim"
          />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Submit Forest Rights Claim</h1>
              <p className="text-muted-foreground mt-2">
                Upload documents and provide claim details for Forest Rights Act verification
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {isDraftSaved && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success text-sm rounded-md">
                  <Icon name="Check" size={16} />
                  <span>Draft saved</span>
                </div>
              )}
              
              <Button variant="outline" onClick={clearDraft}>
                <Icon name="Trash2" size={16} className="mr-2" />
                Clear Draft
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Tracker Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProgressTracker
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Step Content */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon name={
                    currentStep === 1 ? "Upload" :
                    currentStep === 2 ? "FileText" :
                    currentStep === 3 ? "MapPin" : "CheckCircle"
                  } size={24} className="text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    {currentStep === 1 && "Upload Documents"}
                    {currentStep === 2 && "Claim Information"}
                    {currentStep === 3 && "Location Mapping"}
                    {currentStep === 4 && "Review & Submit"}
                  </h2>
                </div>
                
                {renderStepContent()}
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                >
                  <Icon name="ChevronLeft" size={16} className="mr-2" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-4">
                  {currentStep < 4 ? (
                    <Button
                      variant="default"
                      onClick={handleNextStep}
                      disabled={Object.keys(errors)?.length > 0}
                    >
                      Next
                      <Icon name="ChevronRight" size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      disabled={Object.keys(errors)?.length > 0 || isSubmitting}
                      loading={isSubmitting}
                    >
                      <Icon name="Send" size={16} className="mr-2" />
                      {isSubmitting ? 'Submitting...' : 'Submit Claim'}
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Help Section */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>• For technical support, call: <strong>1800-XXX-XXXX</strong></p>
                      <p>• Email support: <strong>support@fra-atlas.gov.in</strong></p>
                      <p>• Office hours: Monday to Friday, 9:00 AM to 6:00 PM</p>
                      <p>• Your claim will be processed within 30 working days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClaimUploadInterface;