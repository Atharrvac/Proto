import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchLocationPanel = ({ onLocationSelect, onSearchResults, isVisible, onToggleVisibility }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const searchInputRef = useRef(null);

  // Mock search data
  const mockLocations = [
    {
      id: 1,
      name: 'Khandwa District',
      type: 'district',
      state: 'Madhya Pradesh',
      coordinates: [76.3500, 21.8333],
      bounds: [[76.0000, 21.5000], [76.7000, 22.1667]],
      claims: 145,
      area: '8030 sq km'
    },
    {
      id: 2,
      name: 'Barwani District',
      type: 'district',
      state: 'Madhya Pradesh',
      coordinates: [74.9000, 22.0333],
      bounds: [[74.5000, 21.7000], [75.3000, 22.3667]],
      claims: 89,
      area: '5422 sq km'
    },
    {
      id: 3,
      name: 'Satpura National Park',
      type: 'protected_area',
      state: 'Madhya Pradesh',
      coordinates: [78.4333, 22.5000],
      bounds: [[78.0000, 22.2000], [78.8667, 22.8000]],
      claims: 0,
      area: '524 sq km'
    },
    {
      id: 4,
      name: 'Village Khandwa',
      type: 'village',
      district: 'Khandwa',
      state: 'Madhya Pradesh',
      coordinates: [76.3500, 21.8333],
      bounds: [[76.3400, 21.8233], [76.3600, 21.8433]],
      claims: 12,
      population: 2500
    },
    {
      id: 5,
      name: 'Claim FR2025001',
      type: 'claim',
      claimant: 'Ramesh Kumar',
      village: 'Khandwa',
      coordinates: [76.3520, 21.8350],
      status: 'pending',
      area: '2.5 hectares'
    }
  ];

  const recentSearches = [
    'Khandwa District',
    'Satpura National Park',
    'Village Barwani',
    'FR2025001'
  ];

  const quickLocations = [
    { name: 'Madhya Pradesh', type: 'state', coordinates: [78.6569, 22.9734] },
    { name: 'Chhattisgarh', type: 'state', coordinates: [81.8661, 21.2787] },
    { name: 'Odisha', type: 'state', coordinates: [85.0985, 20.9517] },
    { name: 'Jharkhand', type: 'state', coordinates: [85.2799, 23.6102] }
  ];

  useEffect(() => {
    if (isVisible && searchInputRef?.current) {
      searchInputRef?.current?.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (searchQuery?.length > 2) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filtered = mockLocations?.filter(location =>
      location?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
      (location?.state && location?.state?.toLowerCase()?.includes(query?.toLowerCase())) ||
      (location?.district && location?.district?.toLowerCase()?.includes(query?.toLowerCase())) ||
      (location?.claimant && location?.claimant?.toLowerCase()?.includes(query?.toLowerCase()))
    );
    
    setSearchResults(filtered);
    setIsSearching(false);
    
    if (onSearchResults) {
      onSearchResults(filtered);
    }
  };

  const handleLocationSelect = (location) => {
    // Add to search history
    const newHistory = [location?.name, ...searchHistory?.filter(item => item !== location?.name)]?.slice(0, 5);
    setSearchHistory(newHistory);
    
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleQuickLocationSelect = (location) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getLocationIcon = (type) => {
    switch (type) {
      case 'state': return 'MapPin';
      case 'district': return 'Map';
      case 'village': return 'Home';
      case 'protected_area': return 'TreePine';
      case 'claim': return 'FileText';
      default: return 'MapPin';
    }
  };

  const getLocationTypeLabel = (type) => {
    switch (type) {
      case 'state': return 'State';
      case 'district': return 'District';
      case 'village': return 'Village';
      case 'protected_area': return 'Protected Area';
      case 'claim': return 'FRA Claim';
      default: return 'Location';
    }
  };

  if (!isVisible) {
    return (
      <div className="absolute top-20 right-4 z-10">
        <Button
          variant="secondary"
          size="icon"
          onClick={onToggleVisibility}
          className="shadow-lg"
          title="Open Search"
        >
          <Icon name="Search" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute top-20 right-4 w-96 bg-card border border-border rounded-lg shadow-lg z-10 max-h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Location Search</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleVisibility}
          title="Close Search"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Search Input */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search locations, claims, or coordinates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {isSearching && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            )}
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={clearSearch}
              >
                <Icon name="X" size={12} />
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'search' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('search')}
        >
          Search Results
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'quick' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('quick')}
        >
          Quick Access
        </button>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'search' && (
          <div className="p-4">
            {searchQuery?.length <= 2 && searchHistory?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
                <div className="space-y-1">
                  {searchHistory?.map((item, index) => (
                    <button
                      key={index}
                      className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setSearchQuery(item)}
                    >
                      <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults?.length > 0 && (
              <div className="space-y-2">
                {searchResults?.map((location) => (
                  <button
                    key={location?.id}
                    className="flex items-start w-full p-3 text-left hover:bg-muted rounded-md transition-colors border border-transparent hover:border-border"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <Icon 
                      name={getLocationIcon(location?.type)} 
                      size={16} 
                      className="mr-3 mt-0.5 text-primary flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground truncate">{location?.name}</h4>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
                          {getLocationTypeLabel(location?.type)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {location?.state && <span>{location?.state}</span>}
                        {location?.district && <span> • {location?.district}</span>}
                        {location?.claimant && <span>Claimant: {location?.claimant}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>
                          {location?.coordinates?.[1]?.toFixed(4)}°N, {location?.coordinates?.[0]?.toFixed(4)}°E
                        </span>
                        {location?.claims !== undefined && (
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {location?.claims} claims
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery?.length > 2 && searchResults?.length === 0 && !isSearching && (
              <div className="text-center py-8">
                <Icon name="Search" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-xs text-muted-foreground mt-1">Try searching for districts, villages, or claim IDs</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'quick' && (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Quick Locations</h4>
              <div className="space-y-1">
                {quickLocations?.map((location, index) => (
                  <button
                    key={index}
                    className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => handleQuickLocationSelect(location)}
                  >
                    <Icon name={getLocationIcon(location?.type)} size={14} className="mr-2 text-primary" />
                    {location?.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Coordinate Search</h4>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Latitude (e.g., 22.9734)"
                  className="text-sm"
                />
                <Input
                  type="text"
                  placeholder="Longitude (e.g., 78.6569)"
                  className="text-sm"
                />
                <Button size="sm" className="w-full">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  Go to Coordinates
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Import Locations</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="Upload" size={14} className="mr-1" />
                  Upload KML/KMZ
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Icon name="FileText" size={14} className="mr-1" />
                  Import CSV
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchLocationPanel;