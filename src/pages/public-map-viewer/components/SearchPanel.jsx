import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchPanel = ({ onSearch, onLocationSelect, isVisible, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('location');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchTypeOptions = [
    { value: 'location', label: 'Location' },
    { value: 'village', label: 'Village' },
    { value: 'district', label: 'District' },
    { value: 'block', label: 'Block' },
    { value: 'pincode', label: 'PIN Code' }
  ];

  const mockSearchResults = {
    location: [
      { id: 1, name: 'Khandwa Forest Area', type: 'Forest', state: 'Madhya Pradesh', coordinates: [76.3502, 21.8245] },
      { id: 2, name: 'Betul Wildlife Sanctuary', type: 'Sanctuary', state: 'Madhya Pradesh', coordinates: [77.9017, 21.9058] },
      { id: 3, name: 'Pench National Park', type: 'National Park', state: 'Madhya Pradesh', coordinates: [79.2961, 21.7679] }
    ],
    village: [
      { id: 4, name: 'Khargone Village', type: 'Village', district: 'Khargone', state: 'Madhya Pradesh', coordinates: [75.6112, 21.8245] },
      { id: 5, name: 'Burhanpur Village', type: 'Village', district: 'Burhanpur', state: 'Madhya Pradesh', coordinates: [76.2311, 21.3058] },
      { id: 6, name: 'Dewas Village', type: 'Village', district: 'Dewas', state: 'Madhya Pradesh', coordinates: [76.0534, 22.9676] }
    ],
    district: [
      { id: 7, name: 'Khandwa District', type: 'District', state: 'Madhya Pradesh', coordinates: [76.3502, 21.8245] },
      { id: 8, name: 'Betul District', type: 'District', state: 'Madhya Pradesh', coordinates: [77.9017, 21.9058] },
      { id: 9, name: 'Seoni District', type: 'District', state: 'Madhya Pradesh', coordinates: [79.5431, 22.0844] }
    ]
  };

  const handleSearch = async () => {
    if (!searchQuery?.trim()) return;

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = mockSearchResults?.[searchType] || [];
      const filteredResults = results?.filter(item => 
        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsSearching(false);
      
      if (onSearch) {
        onSearch(searchQuery, searchType, filteredResults);
      }
    }, 800);
  };

  const handleResultSelect = (result) => {
    if (onLocationSelect) {
      onLocationSelect(result);
    }
    setSearchQuery(result?.name);
    setSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  if (!isVisible) {
    return (
      <div className="absolute top-4 left-4 z-10">
        <Button
          variant="default"
          size="sm"
          onClick={onToggle}
          className="bg-card border border-border elevation-2"
        >
          <Icon name="Search" size={16} className="mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 w-96 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg elevation-3 z-10">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center">
          <Icon name="Search" size={18} className="mr-2" />
          Search Locations
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-6 h-6"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
      <div className="p-4 space-y-4">
        <Select
          label="Search Type"
          options={searchTypeOptions}
          value={searchType}
          onChange={setSearchType}
          className="mb-3"
        />

        <div className="relative">
          <Input
            type="text"
            placeholder={`Enter ${searchType} name...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="w-6 h-6"
              >
                <Icon name="X" size={12} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearch}
              loading={isSearching}
              className="w-6 h-6"
            >
              <Icon name="Search" size={12} />
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults?.length > 0 && (
          <div className="max-h-64 overflow-y-auto border border-border rounded-md">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                Search Results ({searchResults?.length})
              </div>
              {searchResults?.map((result) => (
                <button
                  key={result?.id}
                  className="w-full text-left p-3 hover:bg-muted rounded-md transition-smooth"
                  onClick={() => handleResultSelect(result)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon 
                      name={
                        result?.type === 'Forest' ? 'Trees' :
                        result?.type === 'Village' ? 'Home' :
                        result?.type === 'District'? 'MapPin' : 'Map'
                      } 
                      size={16} 
                      className="text-primary mt-0.5" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{result?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {result?.type}
                        {result?.district && ` • ${result?.district}`}
                        {result?.state && ` • ${result?.state}`}
                      </div>
                    </div>
                    <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Search Suggestions */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Quick Search</div>
          <div className="flex flex-wrap gap-2">
            {['Khandwa', 'Betul', 'Pench National Park', 'Madhya Pradesh']?.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setSearchQuery(suggestion);
                  handleSearch();
                }}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Tips */}
        <div className="pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center">
              <Icon name="Info" size={12} className="mr-1" />
              Search tips:
            </div>
            <ul className="ml-4 space-y-0.5">
              <li>• Use specific names for better results</li>
              <li>• Try different search types if no results found</li>
              <li>• PIN codes work for location-based searches</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;