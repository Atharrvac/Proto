import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MapLegend from './components/MapLegend';
import LayerControls from './components/LayerControls';
import SearchPanel from './components/SearchPanel';
import InfoPanel from './components/InfoPanel';
import MapControls from './components/MapControls';
import LanguageSelector from './components/LanguageSelector';
import AccessibilityControls from './components/AccessibilityControls';

const PublicMapViewer = () => {
  const [mapState, setMapState] = useState({
    center: [78.9629, 20.5937], // Center of India
    zoom: 6,
    layers: {
      'dense-forest': true,
      'moderate-forest': true,
      'approved-claims': true,
      'state-boundary': true,
      'district-boundary': true
    }
  });

  const [uiState, setUiState] = useState({
    legendVisible: false,
    layersVisible: false,
    searchVisible: false,
    infoVisible: false,
    languageVisible: false,
    accessibilityVisible: false
  });

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('fra-atlas-language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Simulate map loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const togglePanel = (panel) => {
    setUiState(prev => ({
      ...prev,
      [panel]: !prev?.[panel],
      // Close other panels when opening one
      ...(prev?.[panel] ? {} : Object.keys(prev)?.reduce((acc, key) => {
        if (key !== panel) acc[key] = false;
        return acc;
      }, {}))
    }));
  };

  const handleLayerToggle = (layerId, visible) => {
    setMapState(prev => ({
      ...prev,
      layers: {
        ...prev?.layers,
        [layerId]: visible
      }
    }));
  };

  const handleSearch = (query, type, results) => {
    console.log('Search:', { query, type, results });
  };

  const handleLocationSelect = (location) => {
    setMapState(prev => ({
      ...prev,
      center: location?.coordinates,
      zoom: 12
    }));
    setSelectedFeature(location);
    setUiState(prev => ({ ...prev, infoVisible: true }));
  };

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setUiState(prev => ({ ...prev, infoVisible: true }));
  };

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    // In a real app, this would trigger UI language updates
    console.log('Language changed to:', languageCode);
  };

  const handleMapControls = {
    zoomIn: () => setMapState(prev => ({ ...prev, zoom: Math.min(prev?.zoom + 1, 18) })),
    zoomOut: () => setMapState(prev => ({ ...prev, zoom: Math.max(prev?.zoom - 1, 1) })),
    resetView: () => setMapState(prev => ({ ...prev, center: [78.9629, 20.5937], zoom: 6 })),
    toggleFullscreen: (isFullscreen) => {
      if (isFullscreen) {
        document.documentElement?.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    },
    shareLocation: () => {
      console.log('Sharing current map view');
    }
  };

  const translations = {
    en: {
      title: 'FRA Atlas WebGIS - Public Map Viewer',
      subtitle: 'Explore Forest Rights Act Information',
      loading: 'Loading map data...',
      welcome: 'Welcome to the Public Map Viewer',
      description: 'Explore approved forest rights claims, forest boundaries, and educational resources about the Forest Rights Act.',
      getStarted: 'Get Started',
      learnMore: 'Learn More'
    },
    hi: {
      title: 'एफआरए एटलस वेबजीआईएस - सार्वजनिक मानचित्र दर्शक',
      subtitle: 'वन अधिकार अधिनियम की जानकारी देखें',
      loading: 'मानचित्र डेटा लोड हो रहा है...',
      welcome: 'सार्वजनिक मानचित्र दर्शक में आपका स्वागत है',
      description: 'अनुमोदित वन अधिकार दावों, वन सीमाओं और वन अधिकार अधिनियम के बारे में शैक्षिक संसाधनों का अन्वेषण करें।',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें'
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-lg font-medium text-foreground">{t?.loading}</div>
          <div className="text-sm text-muted-foreground">Initializing map components...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="TreePine" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t?.title}</h1>
              <p className="text-xs text-muted-foreground">{t?.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/multi-role-dashboard'}
              className="hidden sm:flex"
            >
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/interactive-web-gis-map'}
              className="hidden sm:flex"
            >
              <Icon name="Map" size={16} className="mr-2" />
              Full Map
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => {/* Mobile menu */}}
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </header>
      {/* Main Map Container */}
      <div className="absolute inset-0 pt-16">
        {/* Mock Map Interface */}
        <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 relative overflow-hidden">
          {/* Map Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Forest Rights Map"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapState?.center?.[1]},${mapState?.center?.[0]}&z=${mapState?.zoom}&output=embed`}
              className="border-0"
            />
          </div>

          {/* Map Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Forest Areas Overlay */}
            <div className="absolute top-1/4 left-1/4 w-32 h-24 bg-green-600/30 rounded-lg border-2 border-green-600 pointer-events-auto cursor-pointer"
                 onClick={() => handleFeatureClick({
                   type: 'forest',
                   name: 'Khandwa Forest Reserve',
                   area: '1,250 hectares'
                 })}>
              <div className="p-2 text-xs text-green-800 font-medium">
                Khandwa Forest
              </div>
            </div>

            {/* Approved Claims Overlay */}
            <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-primary rounded-full border-2 border-white pointer-events-auto cursor-pointer"
                 onClick={() => handleFeatureClick({
                   type: 'claim',
                   name: 'Approved Claim #FR001234',
                   status: 'Title Granted'
                 })}>
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="CheckCircle" size={16} color="white" />
              </div>
            </div>

            {/* Village Boundaries */}
            <div className="absolute bottom-1/3 left-1/2 w-20 h-16 border-2 border-dashed border-orange-500 pointer-events-auto cursor-pointer"
                 onClick={() => handleFeatureClick({
                   type: 'village',
                   name: 'Khandwa Village',
                   population: '2,450'
                 })}>
            </div>
          </div>
        </div>

        {/* Welcome Overlay for First-time Users */}
        {!localStorage.getItem('fra-atlas-visited') && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-card p-8 rounded-lg max-w-md mx-4 text-center space-y-4">
              <Icon name="Map" size={48} className="mx-auto text-primary" />
              <h2 className="text-xl font-semibold text-foreground">{t?.welcome}</h2>
              <p className="text-muted-foreground">{t?.description}</p>
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  onClick={() => {
                    localStorage.setItem('fra-atlas-visited', 'true');
                    setUiState(prev => ({ ...prev, searchVisible: true }));
                  }}
                  className="flex-1"
                >
                  {t?.getStarted}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('fra-atlas-visited', 'true');
                  }}
                  className="flex-1"
                >
                  {t?.learnMore}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Map Components */}
        <SearchPanel
          onSearch={handleSearch}
          onLocationSelect={handleLocationSelect}
          isVisible={uiState?.searchVisible}
          onToggle={() => togglePanel('searchVisible')}
        />

        <LayerControls
          layers={mapState?.layers}
          onLayerToggle={handleLayerToggle}
          isVisible={uiState?.layersVisible}
          onToggle={() => togglePanel('layersVisible')}
        />

        <MapLegend
          layers={mapState?.layers}
          onLayerToggle={handleLayerToggle}
          isVisible={uiState?.legendVisible}
          onToggle={() => togglePanel('legendVisible')}
        />

        <InfoPanel
          selectedFeature={selectedFeature}
          onClose={() => {
            setSelectedFeature(null);
            setUiState(prev => ({ ...prev, infoVisible: false }));
          }}
          isVisible={uiState?.infoVisible}
        />

        <MapControls
          onZoomIn={handleMapControls?.zoomIn}
          onZoomOut={handleMapControls?.zoomOut}
          onResetView={handleMapControls?.resetView}
          onToggleFullscreen={handleMapControls?.toggleFullscreen}
          onShareLocation={handleMapControls?.shareLocation}
        />

        <LanguageSelector
          onLanguageChange={handleLanguageChange}
          isVisible={uiState?.languageVisible}
          onToggle={() => togglePanel('languageVisible')}
        />

        <AccessibilityControls
          isVisible={uiState?.accessibilityVisible}
          onToggle={() => togglePanel('accessibilityVisible')}
        />
      </div>
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>© {new Date()?.getFullYear()} Forest Rights Act Atlas</span>
            <span>•</span>
            <span>Data updated: September 2025</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-foreground transition-smooth">Privacy Policy</button>
            <span>•</span>
            <button className="hover:text-foreground transition-smooth">Terms of Use</button>
            <span>•</span>
            <button className="hover:text-foreground transition-smooth">Help</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicMapViewer;