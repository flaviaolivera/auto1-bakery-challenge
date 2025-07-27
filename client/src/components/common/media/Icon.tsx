import React from 'react';
import * as Icons from 'react-icons/fi';

export interface IconProps {
  name: keyof typeof Icons;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
}) => {
  const IconComponent = Icons[name] as React.ComponentType<{
    size?: number | string;
  }>;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} />;
};