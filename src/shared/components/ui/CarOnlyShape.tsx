import { useId } from 'react';
import type { CSSProperties } from 'react';

interface CarOnlyShapeProps {
  className?: string;
  svgClassName?: string;
  maxWidth?: number;
  strokeColor?: string;
  showFrame?: boolean;
  frameClassName?: string;
  frameBackground?: string;
}

export function CarOnlyShape({
  className,
  svgClassName,
  maxWidth = 1100,
  strokeColor = 'var(--color-primary-400)',
  showFrame = false,
  frameClassName,
  frameBackground = 'var(--gradient-hero-premium)',
}: CarOnlyShapeProps) {
  const filterId = useId();

  const svg = (
    <svg
      viewBox="0 0 1200 260"
      width="100%"
      height="auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Minimal modern car outline"
      className={svgClassName}
      style={{ maxWidth, display: 'block' }}
    >
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${filterId})`}
      >
        <path
          d="
            M170 150
            C230 146, 286 128, 330 94
            C370 58, 435 34, 525 32
            C615 31, 705 58, 807 102
            C865 126, 919 139, 973 143
            C1002 145, 1030 150, 1052 158
          "
          strokeWidth="8"
        />

        <path
          d="
            M164 216
            L286 216
            C302 216, 314 205, 322 189
            C332 169, 349 158, 373 158
            C398 158, 416 169, 427 189
            C435 205, 447 216, 463 216
            L738 216
            C754 216, 766 205, 774 189
            C784 169, 802 158, 827 158
            C852 158, 870 169, 881 189
            C889 205, 901 216, 917 216
            L1050 216
          "
          strokeWidth="8"
        />
      </g>
    </svg>
  );

  if (!showFrame) {
    return (
      <div className={className}>
        {svg}
      </div>
    );
  }

  const frameStyle: CSSProperties = {
    background: frameBackground,
  };

  return (
    <div
      className={[
        'min-h-screen flex items-center justify-center p-8',
        frameClassName,
        className,
      ].filter(Boolean).join(' ')}
      style={frameStyle}
    >
      {svg}
    </div>
  );
}

export default CarOnlyShape;
