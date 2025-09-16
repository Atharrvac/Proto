import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const DecisionPanel = ({ claim, onDecision, onClose }) => {
  const [decision, setDecision] = useState('');
  const [justification, setJustification] = useState('');
  const [conditions, setConditions] = useState([]);
  const [template, setTemplate] = useState('');
  const [customCondition, setCustomCondition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const decisionOptions = [
    { value: 'approve', label: 'Approve Claim', description: 'Grant forest rights as requested' },
    { value: 'approve_conditional', label: 'Approve with Conditions', description: 'Grant rights with specific conditions' },
    { value: 'reject', label: 'Reject Claim', description: 'Deny forest rights application' },
    { value: 'return', label: 'Return for Clarification', description: 'Request additional information' }
  ];

  const templateOptions = [
    { value: '', label: 'Select template...' },
    { value: 'standard_approval', label: 'Standard Approval' },
    { value: 'conditional_approval', label: 'Conditional Approval' },
    { value: 'insufficient_evidence', label: 'Insufficient Evidence' },
    { value: 'boundary_dispute', label: 'Boundary Dispute' },
    { value: 'overlapping_claim', label: 'Overlapping Claim' }
  ];

  const standardConditions = [
    { id: 'sustainable_use', label: 'Sustainable forest resource use only' },
    { id: 'no_commercial', label: 'No commercial exploitation allowed' },
    { id: 'conservation', label: 'Maintain forest conservation practices' },
    { id: 'monitoring', label: 'Submit annual usage reports' },
    { id: 'boundary_marking', label: 'Clear boundary demarcation required' },
    { id: 'community_consent', label: 'Community consensus maintained' }
  ];

  const templates = {
    standard_approval: `Based on thorough review of the submitted documents and field verification reports, the committee finds the claim to be valid and in compliance with the Forest Rights Act, 2006. The applicant has demonstrated continuous occupation and dependency on the forest land for livelihood purposes.`,
    conditional_approval: `The committee approves the claim subject to the conditions specified below. The applicant must comply with all conditions to maintain the granted rights.`,
    insufficient_evidence: `The committee requires additional evidence to support the claim. Please provide the missing documentation and resubmit for review.`,
    boundary_dispute: `The committee has identified potential boundary conflicts that require resolution before final approval can be granted.`,
    overlapping_claim: `The committee has identified overlapping claims in the same area that require coordination and resolution.`
  };

  const handleTemplateChange = (value) => {
    setTemplate(value);
    if (templates?.[value]) {
      setJustification(templates?.[value]);
    }
  };

  const handleConditionToggle = (conditionId) => {
    setConditions(prev => 
      prev?.includes(conditionId)
        ? prev?.filter(id => id !== conditionId)
        : [...prev, conditionId]
    );
  };

  const addCustomCondition = () => {
    if (customCondition?.trim()) {
      setConditions(prev => [...prev, `custom_${Date.now()}`]);
      setCustomCondition('');
    }
  };

  const handleSubmit = async () => {
    if (!decision || !justification?.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const decisionData = {
        claimId: claim?.id,
        decision,
        justification,
        conditions: decision === 'approve_conditional' ? conditions : [],
        timestamp: new Date()?.toISOString(),
        committeeId: 'COMM-2025-001'
      };

      await onDecision(decisionData);
      onClose();
    } catch (error) {
      console.error('Error submitting decision:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDecisionColor = (value) => {
    switch (value) {
      case 'approve': return 'text-success';
      case 'approve_conditional': return 'text-warning';
      case 'reject': return 'text-error';
      case 'return': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getDecisionIcon = (value) => {
    switch (value) {
      case 'approve': return 'CheckCircle';
      case 'approve_conditional': return 'AlertCircle';
      case 'reject': return 'XCircle';
      case 'return': return 'RotateCcw';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Gavel" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Committee Decision</h3>
            <p className="text-sm text-muted-foreground">Claim #{claim?.id}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Decision Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Select Decision</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {decisionOptions?.map((option) => (
              <button
                key={option?.value}
                className={`p-4 border-2 rounded-lg text-left transition-smooth ${
                  decision === option?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                }`}
                onClick={() => setDecision(option?.value)}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getDecisionIcon(option?.value)} 
                    size={20} 
                    className={decision === option?.value ? 'text-primary' : getDecisionColor(option?.value)}
                  />
                  <div>
                    <p className="font-medium text-foreground">{option?.label}</p>
                    <p className="text-sm text-muted-foreground">{option?.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Template Selection */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Decision Template</h4>
          <Select
            options={templateOptions}
            value={template}
            onChange={handleTemplateChange}
            placeholder="Choose a template to auto-fill justification"
          />
        </div>

        {/* Justification */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Justification *</h4>
          <textarea
            className="w-full h-32 p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Provide detailed justification for your decision..."
            value={justification}
            onChange={(e) => setJustification(e?.target?.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            {justification?.length}/500 characters
          </p>
        </div>

        {/* Conditions (only for conditional approval) */}
        {decision === 'approve_conditional' && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Approval Conditions</h4>
            
            <div className="space-y-3">
              {standardConditions?.map((condition) => (
                <Checkbox
                  key={condition?.id}
                  label={condition?.label}
                  checked={conditions?.includes(condition?.id)}
                  onChange={() => handleConditionToggle(condition?.id)}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Add custom condition..."
                value={customCondition}
                onChange={(e) => setCustomCondition(e?.target?.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={addCustomCondition}>
                <Icon name="Plus" size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Legal Framework Reference */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h5 className="font-medium text-foreground mb-2">Legal Framework</h5>
          <p className="text-sm text-muted-foreground">
            This decision is made under the provisions of the Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006, and the Rules made thereunder.
          </p>
        </div>

        {/* Committee Information */}
        <div className="p-4 border border-border rounded-lg">
          <h5 className="font-medium text-foreground mb-3">Committee Details</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Committee ID:</span>
              <p className="font-medium">COMM-2025-001</p>
            </div>
            <div>
              <span className="text-muted-foreground">Review Date:</span>
              <p className="font-medium">2025-01-13</p>
            </div>
            <div>
              <span className="text-muted-foreground">Members Present:</span>
              <p className="font-medium">7 of 9</p>
            </div>
            <div>
              <span className="text-muted-foreground">Quorum:</span>
              <p className="font-medium text-success">Met</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Decision will be recorded and cannot be modified after submission
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleSubmit}
              disabled={!decision || !justification?.trim() || isSubmitting}
              loading={isSubmitting}
            >
              <Icon name="Check" size={16} className="mr-2" />
              Submit Decision
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionPanel;