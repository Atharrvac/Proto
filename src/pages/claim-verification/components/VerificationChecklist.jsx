import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const VerificationChecklist = ({ claim, onChecklistUpdate, onSubmitVerification }) => {
  const [checklist, setChecklist] = useState({
    documentVerification: {
      aadhaarCard: { checked: true, required: true, comments: '' },
      bankPassbook: { checked: true, required: true, comments: '' },
      landRecords: { checked: false, required: true, comments: 'Requires additional verification' },
      photographicEvidence: { checked: true, required: false, comments: '' },
      witnessStatements: { checked: false, required: false, comments: 'Pending collection' }
    },
    fieldVerification: {
      boundaryMarking: { checked: true, required: true, comments: 'GPS coordinates verified' },
      landUsePattern: { checked: true, required: true, comments: 'Traditional agriculture confirmed' },
      forestCoverAssessment: { checked: false, required: true, comments: 'Satellite analysis pending' },
      accessibilityCheck: { checked: true, required: false, comments: '' },
      neighborVerification: { checked: false, required: false, comments: 'Scheduled for next visit' }
    },
    legalCompliance: {
      forestRightsEligibility: { checked: true, required: true, comments: 'Meets all criteria' },
      environmentalClearance: { checked: false, required: true, comments: 'Under review' },
      tribalStatusVerification: { checked: true, required: true, comments: 'ST certificate verified' },
      landCeilingCompliance: { checked: true, required: false, comments: '' },
      conflictResolution: { checked: true, required: false, comments: 'No conflicts identified' }
    }
  });

  const [activeSection, setActiveSection] = useState('documentVerification');
  const [overallComments, setOverallComments] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const sections = [
    { id: 'documentVerification', label: 'Document Verification', icon: 'FileCheck' },
    { id: 'fieldVerification', label: 'Field Verification', icon: 'MapPin' },
    { id: 'legalCompliance', label: 'Legal Compliance', icon: 'Scale' }
  ];

  const checklistItems = {
    documentVerification: [
      { id: 'aadhaarCard', label: 'Aadhaar Card Verification', description: 'Valid Aadhaar card with matching details' },
      { id: 'bankPassbook', label: 'Bank Account Details', description: 'Active bank account for benefit transfer' },
      { id: 'landRecords', label: 'Land Records Verification', description: 'Revenue records and survey settlement' },
      { id: 'photographicEvidence', label: 'Photographic Evidence', description: 'Site photographs and documentation' },
      { id: 'witnessStatements', label: 'Witness Statements', description: 'Community member testimonials' }
    ],
    fieldVerification: [
      { id: 'boundaryMarking', label: 'Boundary Marking', description: 'Physical boundary verification and GPS mapping' },
      { id: 'landUsePattern', label: 'Land Use Pattern', description: 'Current and historical land use assessment' },
      { id: 'forestCoverAssessment', label: 'Forest Cover Assessment', description: 'Satellite imagery and ground truth verification' },
      { id: 'accessibilityCheck', label: 'Accessibility Check', description: 'Road access and infrastructure assessment' },
      { id: 'neighborVerification', label: 'Neighbor Verification', description: 'Adjacent landowner consultations' }
    ],
    legalCompliance: [
      { id: 'forestRightsEligibility', label: 'Forest Rights Eligibility', description: 'FRA 2006 eligibility criteria compliance' },
      { id: 'environmentalClearance', label: 'Environmental Clearance', description: 'Environmental impact assessment if required' },
      { id: 'tribalStatusVerification', label: 'Tribal Status Verification', description: 'ST/OTFD certificate validation' },
      { id: 'landCeilingCompliance', label: 'Land Ceiling Compliance', description: 'State land ceiling act compliance' },
      { id: 'conflictResolution', label: 'Conflict Resolution', description: 'Resolution of any land disputes' }
    ]
  };

  const handleChecklistChange = (section, item, checked) => {
    setChecklist(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [item]: {
          ...prev?.[section]?.[item],
          checked
        }
      }
    }));
  };

  const handleCommentsChange = (section, item, comments) => {
    setChecklist(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [item]: {
          ...prev?.[section]?.[item],
          comments
        }
      }
    }));
  };

  const getCompletionStats = () => {
    let totalItems = 0;
    let completedItems = 0;
    let requiredItems = 0;
    let completedRequired = 0;

    Object.values(checklist)?.forEach(section => {
      Object.values(section)?.forEach(item => {
        totalItems++;
        if (item?.checked) completedItems++;
        if (item?.required) {
          requiredItems++;
          if (item?.checked) completedRequired++;
        }
      });
    });

    return { totalItems, completedItems, requiredItems, completedRequired };
  };

  const stats = getCompletionStats();
  const canSubmit = stats?.completedRequired === stats?.requiredItems;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmitVerification({
        checklist,
        overallComments,
        recommendation,
        stats
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Verification Checklist</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {stats?.completedItems}/{stats?.totalItems} Complete
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stats?.completedItems / stats?.totalItems) * 100}%` }}
          />
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-1">
          {sections?.map((section) => (
            <button
              key={section?.id}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                activeSection === section?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveSection(section?.id)}
            >
              <Icon name={section?.icon} size={14} />
              <span className="hidden sm:inline">{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {checklistItems?.[activeSection]?.map((item) => {
            const checklistItem = checklist?.[activeSection]?.[item?.id];
            return (
              <div key={item?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={checklistItem?.checked}
                    onChange={(e) => handleChecklistChange(activeSection, item?.id, e?.target?.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{item?.label}</h4>
                      {checklistItem?.required && (
                        <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                      {checklistItem?.checked && (
                        <Icon name="CheckCircle" size={16} className="text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item?.description}</p>
                    
                    <div className="mt-3">
                      <textarea
                        placeholder="Add comments or notes..."
                        value={checklistItem?.comments}
                        onChange={(e) => handleCommentsChange(activeSection, item?.id, e?.target?.value)}
                        className="w-full px-3 py-2 text-sm border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Summary Section */}
      <div className="p-4 border-t border-border space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Overall Comments
          </label>
          <textarea
            placeholder="Provide overall verification summary..."
            value={overallComments}
            onChange={(e) => setOverallComments(e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Recommendation
          </label>
          <select
            value={recommendation}
            onChange={(e) => setRecommendation(e?.target?.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select recommendation...</option>
            <option value="approve">Approve for Committee Review</option>
            <option value="reject">Reject Application</option>
            <option value="clarification">Request Additional Information</option>
            <option value="field_visit">Schedule Field Visit</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Required items: {stats?.completedRequired}/{stats?.requiredItems}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              disabled={!canSubmit || !recommendation}
              onClick={handleSubmit}
            >
              Submit Verification
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationChecklist;