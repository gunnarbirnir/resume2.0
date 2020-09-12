import React from 'react';

interface IProps {
  flex?: number;
  direction?: 'column' | 'row';
  alignItems?: string;
  justifyContent?: string;
  wrap?: 'wrap' | 'nowrap';
  style?: React.CSSProperties;
  className?: string;
}

const FlexContainer: React.FC<IProps> = ({
  children,
  flex,
  direction,
  alignItems,
  justifyContent,
  wrap,
  style,
  className,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex,
        flexDirection: direction,
        alignItems,
        justifyContent,
        flexWrap: wrap,
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
