import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingPanel = ({ claim, onVote, onClose }) => {
  const [userVote, setUserVote] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const committeeMembers = [
    {
      id: 1,
      name: 'Dr. Anita Sharma',
      role: 'Chairperson',
      avatar: 'AS',
      vote: 'approve',
      timestamp: '2025-01-13 16:30',
      weight: 2
    },
    {
      id: 2,
      name: 'Prof. Vikram Singh',
      role: 'Technical Expert',
      avatar: 'VS',
      vote: 'approve',
      timestamp: '2025-01-13 16:45',
      weight: 1
    },
    {
      id: 3,
      name: 'Smt. Meera Patel',
      role: 'Community Representative',
      avatar: 'MP',
      vote: 'approve',
      timestamp: '2025-01-13 17:00',
      weight: 1
    },
    {
      id: 4,
      name: 'Shri Ramesh Gupta',
      role: 'Forest Officer',
      avatar: 'RG',
      vote: 'conditional',
      timestamp: '2025-01-13 17:15',
      weight: 1
    },
    {
      id: 5,
      name: 'Dr. Sunita Rao',
      role: 'Legal Advisor',
      avatar: 'SR',
      vote: null,
      timestamp: null,
      weight: 1
    },
    {
      id: 6,
      name: 'Current User',
      role: 'Committee Member',
      avatar: 'CU',
      vote: userVote,
      timestamp: userVote ? new Date()?.toLocaleString() : null,
      weight: 1,
      isCurrentUser: true
    }
  ];

  const voteOptions = [
    { value: 'approve', label: 'Approve', icon: 'CheckCircle', color: 'text-success' },
    { value: 'conditional', label: 'Approve with Conditions', icon: 'AlertCircle', color: 'text-warning' },
    { value: 'reject', label: 'Reject', icon: 'XCircle', color: 'text-error' },
    { value: 'abstain', label: 'Abstain', icon: 'Minus', color: 'text-muted-foreground' }
  ];

  const getVoteStats = () => {
    const votes = committeeMembers?.filter(m => m?.vote);
    const totalWeight = committeeMembers?.reduce((sum, m) => sum + m?.weight, 0);
    const votedWeight = votes?.reduce((sum, m) => sum + m?.weight, 0);
    
    const voteBreakdown = voteOptions?.reduce((acc, option) => {
      const memberVotes = votes?.filter(m => m?.vote === option?.value);
      acc[option.value] = {
        count: memberVotes?.length,
        weight: memberVotes?.reduce((sum, m) => sum + m?.weight, 0)
      };
      return acc;
    }, {});

    return {
      totalMembers: committeeMembers?.length,
      votedMembers: votes?.length,
      totalWeight,
      votedWeight,
      voteBreakdown,
      quorumMet: votedWeight >= Math.ceil(totalWeight * 0.6),
      consensusReached: voteBreakdown?.approve?.weight > totalWeight * 0.5
    };
  };

  const handleVote = async (vote) => {
    setIsSubmitting(true);
    try {
      setUserVote(vote);
      await onVote({
        claimId: claim?.id,
        vote,
        timestamp: new Date()?.toISOString(),
        memberId: 'current-user'
      });
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = getVoteStats();

  const getVoteColor = (vote) => {
    const option = voteOptions?.find(opt => opt?.value === vote);
    return option ? option?.color : 'text-muted-foreground';
  };

  const getVoteIcon = (vote) => {
    const option = voteOptions?.find(opt => opt?.value === vote);
    return option ? option?.icon : 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-lg elevation-2 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Vote" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Committee Voting</h3>
            <p className="text-sm text-muted-foreground">Claim #{claim?.id}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Voting Stats */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{stats?.votedMembers}/{stats?.totalMembers}</p>
            <p className="text-sm text-muted-foreground">Members Voted</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{stats?.votedWeight}/{stats?.totalWeight}</p>
            <p className="text-sm text-muted-foreground">Vote Weight</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${stats?.quorumMet ? 'text-success' : 'text-error'}`}>
              {stats?.quorumMet ? 'Met' : 'Pending'}
            </p>
            <p className="text-sm text-muted-foreground">Quorum Status</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${stats?.consensusReached ? 'text-success' : 'text-warning'}`}>
              {stats?.consensusReached ? 'Yes' : 'No'}
            </p>
            <p className="text-sm text-muted-foreground">Consensus</p>
          </div>
        </div>

        {/* Vote Breakdown */}
        <div className="space-y-2">
          {voteOptions?.map((option) => {
            const voteData = stats?.voteBreakdown?.[option?.value];
            const percentage = stats?.totalWeight > 0 ? (voteData?.weight / stats?.totalWeight) * 100 : 0;
            
            return (
              <div key={option?.value} className="flex items-center space-x-3">
                <Icon name={option?.icon} size={16} className={option?.color} />
                <span className="text-sm font-medium min-w-0 flex-1">{option?.label}</span>
                <span className="text-sm text-muted-foreground">{voteData?.count} ({voteData?.weight})</span>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      option?.value === 'approve' ? 'bg-success' :
                      option?.value === 'conditional' ? 'bg-warning' :
                      option?.value === 'reject'? 'bg-error' : 'bg-muted-foreground'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium min-w-0">{percentage?.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Member Votes */}
      <div className="flex-1 overflow-y-auto p-4">
        <h4 className="font-medium text-foreground mb-4">Committee Members</h4>
        
        <div className="space-y-3">
          {committeeMembers?.map((member) => (
            <div key={member?.id} className={`p-3 border border-border rounded-lg ${
              member?.isCurrentUser ? 'bg-primary/5 border-primary/20' : ''
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {member?.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {member?.name}
                      {member?.isCurrentUser && <span className="text-primary ml-1">(You)</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">{member?.role}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  {member?.vote ? (
                    <div className="flex items-center space-x-2">
                      <Icon name={getVoteIcon(member?.vote)} size={16} className={getVoteColor(member?.vote)} />
                      <span className={`text-sm font-medium ${getVoteColor(member?.vote)}`}>
                        {voteOptions?.find(opt => opt?.value === member?.vote)?.label}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Pending</span>
                  )}
                  {member?.timestamp && (
                    <p className="text-xs text-muted-foreground mt-1">{member?.timestamp}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Voting Actions */}
      {!userVote && (
        <div className="p-4 border-t border-border">
          <h4 className="font-medium text-foreground mb-3">Cast Your Vote</h4>
          <div className="grid grid-cols-2 gap-3">
            {voteOptions?.map((option) => (
              <Button
                key={option?.value}
                variant="outline"
                className="flex items-center justify-center space-x-2 h-12"
                onClick={() => handleVote(option?.value)}
                disabled={isSubmitting}
              >
                <Icon name={option?.icon} size={16} className={option?.color} />
                <span>{option?.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Icon name="Info" size={14} className="inline mr-1" />
              Your vote will be recorded and cannot be changed after submission.
            </p>
          </div>
        </div>
      )}
      {userVote && (
        <div className="p-4 border-t border-border bg-success/5">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="font-medium text-foreground">Vote Submitted</p>
              <p className="text-sm text-muted-foreground">
                You voted: {voteOptions?.find(opt => opt?.value === userVote)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPanel;