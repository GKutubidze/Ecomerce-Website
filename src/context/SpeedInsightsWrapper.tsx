// components/SpeedInsightsProvider.tsx

import React, { ReactNode, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface SpeedInsightsProviderProps {
  children: ReactNode;
}

const SpeedInsightsProvider: React.FC<SpeedInsightsProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    // Initialize or configure SpeedInsights here if needed
  }, []);

  return (
    <>
      <SpeedInsights />
      {children}
    </>
  );
};

export default SpeedInsightsProvider;
