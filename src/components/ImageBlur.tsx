import React from 'react';
import { browserName } from 'react-device-detect';

interface IProps {
  src: string;
  containerHeight: string;
  containerWidth: string;
  positions: IBlurPosition[];
}

interface IState {
  imgLoaded: boolean;
}

interface IBlurPosition {
  x?: string;
  y?: string;
  width?: string;
  height?: string;
}

class ImageBlur extends React.Component<IProps, IState> {
  readonly state = { imgLoaded: false };

  componentDidMount() {
    // onLoad didn't work on safari
    /* if (browserName === 'Safari') {
      this.setLoaded();
    } */
    this.setLoaded();
  }

  render() {
    const { src, containerHeight, containerWidth } = this.props;
    const { imgLoaded } = this.state;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          opacity: imgLoaded ? 1 : 0,
          transition: 'opacity 500ms',
        }}
      >
        <svg x="0" y="0" width={containerWidth} height={containerHeight}>
          {this.renderFilters()}
          <image
            x="0"
            y="0"
            id="svg-image"
            width="100%"
            height="100%"
            xlinkHref={src}
            preserveAspectRatio="xMidYMid slice"
            filter="url(#blur)"
            // onLoad={this.setLoaded}
          />
          {this.renderColorOverlay()}
        </svg>
      </div>
    );
  }

  renderFilters() {
    const { positions } = this.props;
    return (
      <defs>
        <filter
          id="blur"
          x="0"
          y="0"
          height="100%"
          width="100%"
          colorInterpolationFilters="sRGB"
        >
          {positions.map((pos, index) => (
            <React.Fragment key={index}>
              <feGaussianBlur
                x={pos.x || '0'}
                y={pos.y || '0'}
                width={pos.width || '100%'}
                height={pos.height || '100%'}
                stdDeviation="10"
                in="SourceGraphic"
                result="blurImg"
              />
              <feComponentTransfer
                in="blurImg"
                result={`opaqueBlur${index + 1}`}
              >
                <feFuncA type="linear" intercept="1" />
              </feComponentTransfer>
            </React.Fragment>
          ))}
          {positions.map((_, index) => (
            <feBlend
              mode="normal"
              in={`opaqueBlur${index + 1}`}
              width="100%"
              height="100%"
              key={index}
            />
          ))}
        </filter>
      </defs>
    );
  }

  renderColorOverlay() {
    const { positions } = this.props;
    return positions.map((pos, index) => (
      <rect
        x={pos.x || '0'}
        y={pos.y || '0'}
        height={pos.height || '100%'}
        width={pos.width || '100%'}
        fill="rgb(255,255,255)"
        fillOpacity="0.1"
        key={index}
      />
    ));
  }

  setLoaded = () => {
    this.setState({ imgLoaded: true });
  };
}
export default ImageBlur;
