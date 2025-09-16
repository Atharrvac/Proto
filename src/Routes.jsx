import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveWebGISMap from './pages/interactive-web-gis-map';
import MultiRoleDashboard from './pages/multi-role-dashboard';
import PublicMapViewer from './pages/public-map-viewer';
import ClaimVerification from './pages/claim-verification';
import ClaimUploadInterface from './pages/claim-upload-interface';
import CommitteeReview from './pages/committee-review';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ClaimUploadInterface />} />
        <Route path="/interactive-web-gis-map" element={<InteractiveWebGISMap />} />
        <Route path="/multi-role-dashboard" element={<MultiRoleDashboard />} />
        <Route path="/public-map-viewer" element={<PublicMapViewer />} />
        <Route path="/claim-verification" element={<ClaimVerification />} />
        <Route path="/claim-upload-interface" element={<ClaimUploadInterface />} />
        <Route path="/committee-review" element={<CommitteeReview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
