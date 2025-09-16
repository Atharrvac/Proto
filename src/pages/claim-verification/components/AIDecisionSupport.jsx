import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIDecisionSupport = ({ claim, onScoreUpdate }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeInsight, setActiveInsight] = useState('overview');

  useEffect(() => {
    // Simulate AI analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisData({
        overallScore: 78,
        confidence: 85,
        riskLevel: 'low',
        factors: {
          documentAuthenticity: { score: 92, weight: 25, status: 'high' },
          spatialAccuracy: { score: 85, weight: 30, status: 'high' },
          historicalConsistency: { score: 71, weight: 20, status: 'medium' },
          communitySupport: { score: 68, weight: 15, status: 'medium' },
          legalCompliance: { score: 89, weight: 10, status: 'high' }
        },
        recommendations: [
          {
            type: 'approve',
            confidence: 78,
            reasoning: 'Strong documentation and spatial verification support approval',
            conditions: ['Verify community consensus', 'Confirm boundary markers']
          },
          {
            type: 'field_visit',
            confidence: 15,
            reasoning: 'Minor discrepancies in historical land use patterns',
            conditions: ['Schedule site inspection', 'Interview local community']
          },
          {
            type: 'reject',
            confidence: 7,
            reasoning: 'Low probability based on current evidence',
            conditions: ['Significant legal issues identified']
          }
        ],
        insights: {
          satelliteAnalysis: {
            forestCover: 87,
            landUseConsistency: 74,
            changeDetection: 'stable',
            lastUpdated: '2025-01-10'
          },
          documentAnalysis: {
            authenticityScore: 94,
            consistencyCheck: 89,
            missingDocuments: ['Survey Settlement Record'],
            flaggedIssues: []
          },
          spatialAnalysis: {
            boundaryAccuracy: 91,
            overlapDetection: 'none',
            accessibilityScore: 76,
            proximityFactors: ['Forest boundary: 50m', 'Road access: 200m']
          }
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  }, [claim]);

  const insightTabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { id: 'documents', label: 'Documents', icon: 'FileCheck' },
    { id: 'spatial', label: 'Spatial', icon: 'Map' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="text-center p-6 bg-muted rounded-lg">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${analysisData?.overallScore * 2.51} 251`}
              className={getScoreColor(analysisData?.overallScore)}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{analysisData?.overallScore}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-1">Approval Probability</h3>
        <p className="text-sm text-muted-foreground">
          Confidence: {analysisData?.confidence}% • Risk: <span className={getRiskColor(analysisData?.riskLevel)}>{analysisData?.riskLevel?.toUpperCase()}</span>
        </p>
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-3">
        <h4 className="font-semibold">Contributing Factors</h4>
        {Object.entries(analysisData?.factors)?.map(([key, factor]) => (
          <div key={key} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium capitalize">
                  {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                </span>
                <span className={`text-sm font-semibold ${getScoreColor(factor?.score)}`}>
                  {factor?.score}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getScoreBg(factor?.score)} ${getScoreColor(factor?.score)}`}
                  style={{ width: `${factor?.score}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Weight: {factor?.weight}%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h4 className="font-semibold">AI Recommendations</h4>
        {analysisData?.recommendations?.map((rec, index) => (
          <div key={index} className="p-3 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium capitalize">{rec?.type?.replace('_', ' ')}</span>
              <span className="text-sm text-muted-foreground">{rec?.confidence}% confidence</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{rec?.reasoning}</p>
            {rec?.conditions?.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">Conditions:</div>
                {rec?.conditions?.map((condition, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground flex items-center">
                    <Icon name="ArrowRight" size={10} className="mr-1" />
                    {condition}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSatelliteInsights = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{analysisData?.insights?.satelliteAnalysis?.forestCover}%</div>
          <div className="text-xs text-muted-foreground">Forest Cover</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-warning">{analysisData?.insights?.satelliteAnalysis?.landUseConsistency}%</div>
          <div className="text-xs text-muted-foreground">Land Use Consistency</div>
        </div>
      </div>
      
      <div className="p-3 border border-border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Change Detection</span>
          <span className="text-sm bg-success/10 text-success px-2 py-1 rounded-full">
            {analysisData?.insights?.satelliteAnalysis?.changeDetection}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          No significant changes detected in the last 5 years. Land use pattern remains consistent with traditional forest rights usage.
        </p>
        <div className="text-xs text-muted-foreground mt-2">
          Last updated: {analysisData?.insights?.satelliteAnalysis?.lastUpdated}
        </div>
      </div>
    </div>
  );

  const renderDocumentInsights = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{analysisData?.insights?.documentAnalysis?.authenticityScore}%</div>
          <div className="text-xs text-muted-foreground">Authenticity Score</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{analysisData?.insights?.documentAnalysis?.consistencyCheck}%</div>
          <div className="text-xs text-muted-foreground">Consistency Check</div>
        </div>
      </div>

      {analysisData?.insights?.documentAnalysis?.missingDocuments?.length > 0 && (
        <div className="p-3 border border-warning rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="font-medium">Missing Documents</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            {analysisData?.insights?.documentAnalysis?.missingDocuments?.map((doc, index) => (
              <li key={index} className="flex items-center">
                <Icon name="ArrowRight" size={10} className="mr-1" />
                {doc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analysisData?.insights?.documentAnalysis?.flaggedIssues?.length === 0 && (
        <div className="p-3 border border-success rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="font-medium text-success">No Issues Detected</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            All submitted documents passed authenticity and consistency checks.
          </p>
        </div>
      )}
    </div>
  );

  const renderSpatialInsights = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{analysisData?.insights?.spatialAnalysis?.boundaryAccuracy}%</div>
          <div className="text-xs text-muted-foreground">Boundary Accuracy</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-warning">{analysisData?.insights?.spatialAnalysis?.accessibilityScore}%</div>
          <div className="text-xs text-muted-foreground">Accessibility Score</div>
        </div>
      </div>

      <div className="p-3 border border-border rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="font-medium">Overlap Detection</span>
        </div>
        <p className="text-sm text-muted-foreground">
          No boundary overlaps detected with existing claims or protected areas.
        </p>
      </div>

      <div className="p-3 border border-border rounded-lg">
        <div className="font-medium mb-2">Proximity Factors</div>
        <div className="space-y-1">
          {analysisData?.insights?.spatialAnalysis?.proximityFactors?.map((factor, index) => (
            <div key={index} className="text-sm text-muted-foreground flex items-center">
              <Icon name="MapPin" size={12} className="mr-2" />
              {factor}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isAnalyzing) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">Analyzing claim data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">AI Decision Support</h2>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              AI Powered
            </span>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} />
            </Button>
          </div>
        </div>

        <div className="flex space-x-1">
          {insightTabs?.map((tab) => (
            <button
              key={tab?.id}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-smooth ${
                activeInsight === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveInsight(tab?.id)}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {activeInsight === 'overview' && renderOverview()}
        {activeInsight === 'satellite' && renderSatelliteInsights()}
        {activeInsight === 'documents' && renderDocumentInsights()}
        {activeInsight === 'spatial' && renderSpatialInsights()}
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Analysis completed at {new Date()?.toLocaleTimeString('en-IN')}</span>
          <Button variant="ghost" size="sm">
            <Icon name="Download" size={14} className="mr-1" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIDecisionSupport;