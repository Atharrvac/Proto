import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LegalFrameworkPanel = ({ claim, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('fra-act');

  const legalSections = [
    { id: 'fra-act', label: 'FRA Act 2006', icon: 'Scale' },
    { id: 'rules', label: 'FRA Rules 2008', icon: 'BookOpen' },
    { id: 'guidelines', label: 'Guidelines', icon: 'FileText' },
    { id: 'precedents', label: 'Precedents', icon: 'Gavel' },
    { id: 'circulars', label: 'Circulars', icon: 'Mail' }
  ];

  const fraActSections = [
    {
      id: 'section-3',
      title: 'Section 3 - Recognition of Forest Rights',
      content: `Subject to the provisions of this Act, the Central Government hereby recognizes the rights of forest dwelling Scheduled Tribes and other traditional forest dwellers to forest resources which they have been traditionally accessing for habitation and for livelihood, and ensures that the same are not adversely affected by any State action or legal process.`,
      relevance: 'high',
      applicability: 'This section directly applies to the current claim as it establishes the fundamental right to forest resources for traditional forest dwellers.'
    },
    {
      id: 'section-4',
      title: 'Section 4 - Recognition of Rights',
      content: `The forest rights recognized under this Act shall include—\n(a) right to hold and live in the forest land under the individual or common occupation for habitation or for self-cultivation for livelihood by a member or members of a forest dwelling Scheduled Tribe or other traditional forest dwellers;\n(b) community rights such as nistar, by whatever name called, including those used in erstwhile Princely States, Zamindari or such other intermediary regimes;`,
      relevance: 'high',
      applicability: 'Defines the specific types of rights that can be recognized, relevant for determining the scope of the current claim.'
    },
    {
      id: 'section-6',
      title: 'Section 6 - Forest Rights Committee',
      content: `For the purposes of initiating the process for determining the nature and extent of individual forest rights or community forest rights or both that may be given to the forest dwelling Scheduled Tribes and other traditional forest dwellers, the Gram Sabha shall constitute a Forest Rights Committee.`,
      relevance: 'medium',
      applicability: 'Establishes the authority of committees like this one to make decisions on forest rights claims.'
    }
  ];

  const precedentCases = [
    {
      id: 'case-1',
      title: 'Orissa Mining Corporation vs. Ministry of Environment',
      year: '2013',
      court: 'Supreme Court of India',
      summary: 'Established the principle that forest rights must be settled before any forest land can be diverted for non-forest purposes.',
      relevance: 'medium',
      keyPoints: [
        'Forest rights recognition is mandatory before land diversion',
        'Community consent is essential for any forest land use change',
        'Traditional occupation must be proven through evidence'
      ]
    },
    {
      id: 'case-2',
      title: 'Niyamgiri Hills Case',
      year: '2014',
      court: 'Supreme Court of India',
      summary: 'Recognized the rights of tribal communities over sacred groves and traditional forest areas.',
      relevance: 'high',
      keyPoints: [
        'Cultural and religious significance of forest areas recognized',
        'Community decision-making process upheld',
        'Environmental protection linked to traditional rights'
      ]
    }
  ];

  const guidelines = [
    {
      id: 'guideline-1',
      title: 'Evidence Requirements for Individual Claims',
      content: `Individual forest rights claims must be supported by:\n• Proof of residence in forest area for at least 75 years (as of 2005)\n• Evidence of traditional occupation and cultivation\n• Community verification of the claim\n• Survey settlement records or revenue records\n• Satellite imagery or other documentary evidence`,
      category: 'documentation'
    },
    {
      id: 'guideline-2',
      title: 'Committee Decision Making Process',
      content: `Forest Rights Committees must:\n• Ensure quorum of at least 2/3 members\n• Record detailed reasons for decisions\n• Provide opportunity for claim presentation\n• Consider all available evidence\n• Follow principles of natural justice`,
      category: 'procedure'
    }
  ];

  const getRelevanceColor = (relevance) => {
    switch (relevance) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const filteredContent = () => {
    switch (activeSection) {
      case 'fra-act':
        return fraActSections?.filter(section => 
          !searchQuery || section?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          section?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      case 'precedents':
        return precedentCases?.filter(case_ => 
          !searchQuery || case_?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          case_?.summary?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      case 'guidelines':
        return guidelines?.filter(guideline => 
          !searchQuery || guideline?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          guideline?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      default:
        return [];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Scale" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Legal Framework</h3>
            <p className="text-sm text-muted-foreground">Reference materials for Claim #{claim?.id}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Search */}
      <div className="p-4 border-b border-border">
        <Input
          placeholder="Search legal provisions, cases, or guidelines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-border overflow-x-auto">
        {legalSections?.map((section) => (
          <button
            key={section?.id}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
              activeSection === section?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            onClick={() => setActiveSection(section?.id)}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeSection === 'fra-act' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Forest Rights Act, 2006</h4>
              <span className="text-sm text-muted-foreground">{filteredContent()?.length} sections</span>
            </div>
            
            {filteredContent()?.map((section) => (
              <div key={section?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-foreground">{section?.title}</h5>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRelevanceColor(section?.relevance)}`}>
                    {section?.relevance} relevance
                  </span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section?.content}
                  </p>
                  
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <h6 className="font-medium text-primary mb-1">Applicability to Current Claim</h6>
                    <p className="text-sm text-primary/80">{section?.applicability}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'precedents' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Precedent Cases</h4>
              <span className="text-sm text-muted-foreground">{filteredContent()?.length} cases</span>
            </div>
            
            {filteredContent()?.map((case_) => (
              <div key={case_?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-foreground">{case_?.title}</h5>
                    <p className="text-sm text-muted-foreground">{case_?.court} • {case_?.year}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRelevanceColor(case_?.relevance)}`}>
                    {case_?.relevance} relevance
                  </span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{case_?.summary}</p>
                  
                  <div>
                    <h6 className="font-medium text-foreground mb-2">Key Points</h6>
                    <ul className="space-y-1">
                      {case_?.keyPoints?.map((point, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="ChevronRight" size={12} className="mt-0.5 text-primary flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'guidelines' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Implementation Guidelines</h4>
              <span className="text-sm text-muted-foreground">{filteredContent()?.length} guidelines</span>
            </div>
            
            {filteredContent()?.map((guideline) => (
              <div key={guideline?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-foreground">{guideline?.title}</h5>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                    {guideline?.category}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {guideline?.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'rules' && (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">FRA Rules 2008</h4>
            <p className="text-sm text-muted-foreground">
              Detailed rules and procedures for implementation of the Forest Rights Act
            </p>
          </div>
        )}

        {activeSection === 'circulars' && (
          <div className="text-center py-8">
            <Icon name="Mail" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="font-medium text-foreground mb-2">Government Circulars</h4>
            <p className="text-sm text-muted-foreground">
              Official circulars and notifications related to forest rights implementation
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Legal references for informed decision making</span>
          <Button variant="ghost" size="sm">
            <Icon name="ExternalLink" size={14} className="mr-1" />
            View Full Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LegalFrameworkPanel;