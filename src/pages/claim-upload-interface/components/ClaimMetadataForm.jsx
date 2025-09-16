import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ClaimMetadataForm = ({ formData, onFormChange, errors = {} }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const stateOptions = [
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'od', label: 'Odisha' },
    { value: 'ap', label: 'Andhra Pradesh' },
    { value: 'ts', label: 'Telangana' },
    { value: 'wb', label: 'West Bengal' },
    { value: 'jh', label: 'Jharkhand' },
    { value: 'ct', label: 'Chhattisgarh' }
  ];

  const claimTypeOptions = [
    { value: 'individual', label: 'Individual Forest Rights (IFR)' },
    { value: 'community', label: 'Community Forest Rights (CFR)' },
    { value: 'community_resource', label: 'Community Forest Resource Rights' },
    { value: 'habitat', label: 'Habitat Rights for PTGs' },
    { value: 'development', label: 'Development Rights' }
  ];

  const landTypeOptions = [
    { value: 'forest_land', label: 'Forest Land' },
    { value: 'revenue_land', label: 'Revenue Land' },
    { value: 'mixed', label: 'Mixed (Forest + Revenue)' },
    { value: 'other', label: 'Other Government Land' }
  ];

  const documentTypeOptions = [
    { value: 'ration_card', label: 'Ration Card' },
    { value: 'voter_id', label: 'Voter ID Card' },
    { value: 'aadhar', label: 'Aadhar Card' },
    { value: 'revenue_records', label: 'Revenue Records' },
    { value: 'survey_settlement', label: 'Survey Settlement Records' },
    { value: 'gram_sabha_resolution', label: 'Gram Sabha Resolution' },
    { value: 'community_certificate', label: 'Community Certificate' },
    { value: 'other', label: 'Other Supporting Documents' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleCoordinateChange = (coordType, axis, value) => {
    const coordinates = formData?.coordinates || {};
    const coordGroup = coordinates?.[coordType] || {};
    
    onFormChange({
      ...formData,
      coordinates: {
        ...coordinates,
        [coordType]: {
          ...coordGroup,
          [axis]: value
        }
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Applicant Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter applicant's full name"
            value={formData?.applicantName || ''}
            onChange={(e) => handleInputChange('applicantName', e?.target?.value)}
            error={errors?.applicantName}
            required
          />
          
          <Input
            label="Father's/Husband's Name"
            type="text"
            placeholder="Enter father's or husband's name"
            value={formData?.guardianName || ''}
            onChange={(e) => handleInputChange('guardianName', e?.target?.value)}
            error={errors?.guardianName}
            required
          />
          
          <Input
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData?.mobileNumber || ''}
            onChange={(e) => handleInputChange('mobileNumber', e?.target?.value)}
            error={errors?.mobileNumber}
            pattern="[0-9]{10}"
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address (optional)"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
          />
        </div>
      </div>
      {/* Address Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Address Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label="Village"
            type="text"
            placeholder="Enter village name"
            value={formData?.village || ''}
            onChange={(e) => handleInputChange('village', e?.target?.value)}
            error={errors?.village}
            required
          />
          
          <Input
            label="Block/Tehsil"
            type="text"
            placeholder="Enter block or tehsil"
            value={formData?.block || ''}
            onChange={(e) => handleInputChange('block', e?.target?.value)}
            error={errors?.block}
            required
          />
          
          <Input
            label="District"
            type="text"
            placeholder="Enter district name"
            value={formData?.district || ''}
            onChange={(e) => handleInputChange('district', e?.target?.value)}
            error={errors?.district}
            required
          />
          
          <Select
            label="State"
            options={stateOptions}
            value={formData?.state || ''}
            onChange={(value) => handleInputChange('state', value)}
            error={errors?.state}
            placeholder="Select state"
            required
          />
          
          <Input
            label="PIN Code"
            type="text"
            placeholder="Enter 6-digit PIN code"
            value={formData?.pinCode || ''}
            onChange={(e) => handleInputChange('pinCode', e?.target?.value)}
            error={errors?.pinCode}
            pattern="[0-9]{6}"
            maxLength={6}
            required
          />
        </div>
      </div>
      {/* Claim Details */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Claim Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Claim Type"
            options={claimTypeOptions}
            value={formData?.claimType || ''}
            onChange={(value) => handleInputChange('claimType', value)}
            error={errors?.claimType}
            placeholder="Select claim type"
            required
          />
          
          <Select
            label="Land Type"
            options={landTypeOptions}
            value={formData?.landType || ''}
            onChange={(value) => handleInputChange('landType', value)}
            error={errors?.landType}
            placeholder="Select land type"
            required
          />
          
          <Input
            label="Total Area (in Hectares)"
            type="number"
            placeholder="Enter total area"
            value={formData?.totalArea || ''}
            onChange={(e) => handleInputChange('totalArea', e?.target?.value)}
            error={errors?.totalArea}
            min="0"
            step="0.01"
            required
          />
          
          <Input
            label="Survey Number"
            type="text"
            placeholder="Enter survey number"
            value={formData?.surveyNumber || ''}
            onChange={(e) => handleInputChange('surveyNumber', e?.target?.value)}
            error={errors?.surveyNumber}
          />
        </div>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Claim Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={4}
            placeholder="Describe the nature of your forest rights claim..."
            value={formData?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          {errors?.description && (
            <p className="text-sm text-error">{errors?.description}</p>
          )}
        </div>
      </div>
      {/* Geospatial Coordinates */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Location Coordinates</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} className="mr-2" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </Button>
        </div>
        
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Center Point</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Latitude"
                  type="number"
                  placeholder="e.g., 23.2599"
                  value={formData?.coordinates?.center?.lat || ''}
                  onChange={(e) => handleCoordinateChange('center', 'lat', e?.target?.value)}
                  error={errors?.centerLat}
                  step="0.000001"
                  required
                />
                <Input
                  label="Longitude"
                  type="number"
                  placeholder="e.g., 77.4126"
                  value={formData?.coordinates?.center?.lng || ''}
                  onChange={(e) => handleCoordinateChange('center', 'lng', e?.target?.value)}
                  error={errors?.centerLng}
                  step="0.000001"
                  required
                />
              </div>
            </div>
            
            {showAdvanced && (
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Boundary Points</h4>
                <div className="text-sm text-muted-foreground">
                  <p>Additional boundary coordinates can be added after initial submission</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Icon name="Map" size={16} className="mr-2" />
                    Open Map Tool
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Supporting Documents */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Icon name="Paperclip" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Supporting Documents</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the types of documents you are submitting with this claim:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTypeOptions?.map((doc) => (
              <Checkbox
                key={doc?.value}
                label={doc?.label}
                checked={formData?.documentTypes?.includes(doc?.value) || false}
                onChange={(e) => {
                  const currentTypes = formData?.documentTypes || [];
                  const newTypes = e?.target?.checked
                    ? [...currentTypes, doc?.value]
                    : currentTypes?.filter(type => type !== doc?.value);
                  handleInputChange('documentTypes', newTypes);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Declaration */}
      <div className="space-y-4 bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Declaration</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="I hereby declare that the information provided above is true and correct to the best of my knowledge."
            checked={formData?.declaration1 || false}
            onChange={(e) => handleInputChange('declaration1', e?.target?.checked)}
            error={errors?.declaration1}
            required
          />
          
          <Checkbox
            label="I understand that any false information may result in rejection of my claim and legal consequences."
            checked={formData?.declaration2 || false}
            onChange={(e) => handleInputChange('declaration2', e?.target?.checked)}
            error={errors?.declaration2}
            required
          />
          
          <Checkbox
            label="I consent to the processing of my personal data for the purpose of this forest rights claim."
            checked={formData?.dataConsent || false}
            onChange={(e) => handleInputChange('dataConsent', e?.target?.checked)}
            error={errors?.dataConsent}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimMetadataForm;