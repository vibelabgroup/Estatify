import React, { memo } from 'react';
import { Reference } from '../../data/references';
import * as Layouts from './layouts';

interface ReferenceLayoutProps {
  reference: Reference;
}

const ReferenceLayoutComponent: React.FC<ReferenceLayoutProps> = ({ reference }) => {
  const layoutComponents = {
    1: Layouts.Layout1,
    2: Layouts.Layout2,
    3: Layouts.Layout3,
    4: Layouts.Layout4,
    5: Layouts.Layout5,
    6: Layouts.Layout6,
    7: Layouts.Layout7,
    8: Layouts.Layout8,
  };

  const LayoutComponent = layoutComponents[reference.layout as keyof typeof layoutComponents];
  
  if (!LayoutComponent) {
    console.warn(`Unknown layout: ${reference.layout}, falling back to Layout1`);
    return <Layouts.Layout1 reference={reference} />;
  }

  return <LayoutComponent reference={reference} />;
};

export const ReferenceLayout = memo(ReferenceLayoutComponent);
