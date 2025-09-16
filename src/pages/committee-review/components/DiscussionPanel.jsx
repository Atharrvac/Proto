import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DiscussionPanel = ({ claim, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const discussions = [
    {
      id: 1,
      author: 'Dr. Anita Sharma',
      role: 'Committee Chairperson',
      avatar: 'AS',
      timestamp: '2025-01-13 14:30',
      content: `I've reviewed the field verification report and supporting documents. The claim appears to be legitimate with strong evidence of continuous occupation. However, I have concerns about the boundary demarcation in the northern section.`,
      type: 'comment',
      replies: [
        {
          id: 11,
          author: 'Rajesh Kumar',role: 'Field Officer',avatar: 'RK',timestamp: '2025-01-13 15:15',content: 'The northern boundary was verified using GPS coordinates and matches with the survey settlement records. I can provide additional satellite imagery if needed.',type: 'reply'
        }
      ]
    },
    {
      id: 2,
      author: 'Prof. Vikram Singh',role: 'Technical Expert',avatar: 'VS',timestamp: '2025-01-13 15:45',content: `The technical assessment shows no overlapping claims in the database. The area calculation is accurate at 4.2 hectares. I recommend approval with standard conservation conditions.`,type: 'comment',
      replies: []
    },
    {
      id: 3,
      author: 'Smt. Meera Patel',role: 'Community Representative',avatar: 'MP',timestamp: '2025-01-13 16:20',
      content: `From the community perspective, this family has been dependent on this forest land for over 20 years. They have been practicing sustainable harvesting and have community support. I strongly support this claim.`,
      type: 'comment',
      replies: [
        {
          id: 31,
          author: 'Dr. Anita Sharma',role: 'Committee Chairperson',avatar: 'AS',timestamp: '2025-01-13 16:35',content: 'Thank you for the community input. This strengthens the case for approval.',type: 'reply'
        }
      ]
    },
    {
      id: 4,
      author: 'System',role: 'Automated',avatar: 'SY',timestamp: '2025-01-13 17:00',content: 'Reminder: Committee decision deadline is 2025-01-15. Please ensure all discussions are concluded before the deadline.',type: 'system',
      replies: []
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All', count: discussions?.length + discussions?.reduce((acc, d) => acc + d?.replies?.length, 0) },
    { value: 'comments', label: 'Comments', count: discussions?.filter(d => d?.type === 'comment')?.length },
    { value: 'concerns', label: 'Concerns', count: 1 },
    { value: 'system', label: 'System', count: discussions?.filter(d => d?.type === 'system')?.length }
  ];

  const handleSubmitComment = () => {
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: 'Current User',
      role: 'Committee Member',
      avatar: 'CU',
      timestamp: new Date()?.toLocaleString(),
      content: newComment,
      type: replyTo ? 'reply' : 'comment',
      replies: []
    };

    console.log('New comment:', comment);
    setNewComment('');
    setReplyTo(null);
  };

  const handleReply = (discussionId) => {
    setReplyTo(discussionId);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'comment': return 'text-foreground';
      case 'reply': return 'text-muted-foreground';
      case 'system': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'comment': return 'MessageSquare';
      case 'reply': return 'CornerDownRight';
      case 'system': return 'Bot';
      default: return 'MessageSquare';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Committee Discussion</h3>
            <p className="text-sm text-muted-foreground">Claim #{claim?.id}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 p-2 border-b border-border overflow-x-auto">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-smooth whitespace-nowrap ${
              activeFilter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setActiveFilter(option?.value)}
          >
            {option?.label}
            <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
              activeFilter === option?.value
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {option?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Discussion Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {discussions?.map((discussion) => (
          <div key={discussion?.id} className="space-y-3">
            {/* Main Discussion */}
            <div className={`flex items-start space-x-3 ${discussion?.type === 'system' ? 'opacity-75' : ''}`}>
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                {discussion?.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-foreground">{discussion?.author}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{discussion?.role}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{discussion?.timestamp}</span>
                  <Icon name={getTypeIcon(discussion?.type)} size={12} className={getTypeColor(discussion?.type)} />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{discussion?.content}</p>
                
                {discussion?.type !== 'system' && (
                  <div className="flex items-center space-x-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-auto p-1"
                      onClick={() => handleReply(discussion?.id)}
                    >
                      <Icon name="Reply" size={12} className="mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                      <Icon name="ThumbsUp" size={12} className="mr-1" />
                      Helpful
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Replies */}
            {discussion?.replies?.length > 0 && (
              <div className="ml-11 space-y-3 border-l-2 border-border pl-4">
                {discussion?.replies?.map((reply) => (
                  <div key={reply?.id} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {reply?.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-medium text-foreground text-sm">{reply?.author}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{reply?.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reply?.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Comment Input */}
      <div className="p-4 border-t border-border">
        {replyTo && (
          <div className="flex items-center justify-between mb-3 p-2 bg-muted/30 rounded-md">
            <span className="text-sm text-muted-foreground">
              Replying to discussion #{replyTo}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setReplyTo(null)}>
              <Icon name="X" size={14} />
            </Button>
          </div>
        )}
        
        <div className="flex space-x-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
            CU
          </div>
          <div className="flex-1 space-y-2">
            <textarea
              className="w-full h-20 p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={replyTo ? "Write your reply..." : "Add your comment to the discussion..."}
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Info" size={12} />
                <span>Comments are visible to all committee members</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setNewComment('')}>
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleSubmitComment}
                  disabled={!newComment?.trim()}
                >
                  <Icon name="Send" size={14} className="mr-1" />
                  {replyTo ? 'Reply' : 'Comment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPanel;