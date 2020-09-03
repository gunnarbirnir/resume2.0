import React from 'react';
import Img, { FluidObject, FixedObject } from 'gatsby-image';

interface IProps {
  fluid?: FluidObject | FluidObject[];
  fixed?: FixedObject | FixedObject[];
  className?: string;
}

const Image: React.FC<IProps> = ({ fluid, fixed, className }) => {
  if (fluid) {
    return <Img fluid={fluid} className={className} />;
  }
  if (fixed) {
    return <Img fixed={fixed} className={className} />;
  }
  return null;
};

export default Image;
