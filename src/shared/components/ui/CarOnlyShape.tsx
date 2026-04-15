import type { CSSProperties } from 'react';

interface CarOnlyShapeProps {
  className?: string;
  svgClassName?: string;
  maxWidth?: number;
  strokeColor?: string;
  animateTopWave?: boolean;
  waveDurationSeconds?: number;
  waveDelaySeconds?: number;
  showFrame?: boolean;
  frameClassName?: string;
  frameBackground?: string;
}

export function CarOnlyShape({
  className,
  svgClassName,
  maxWidth = 1100,
  strokeColor = 'var(--color-primary-400)',
  animateTopWave = false,
  waveDurationSeconds = 6,
  waveDelaySeconds = 0,
  showFrame = false,
  frameClassName,
  frameBackground = 'var(--gradient-hero-premium)',
}: CarOnlyShapeProps) {
  const strokeGlowStyle: CSSProperties = {
    filter: `drop-shadow(0 0 2.4px ${strokeColor})`,
  };

  // Keep command structure identical across variants so SVG can morph smoothly.
  const topProfileVariants = [
    `
      M194 150
      C248 146, 300 128, 340 94
      C370 58, 435 34, 525 32
      C615 31, 705 58, 807 102
      C865 126, 915 139, 961 143
      C986 145, 1008 150, 1028 158
    `,
    `
      M194 150
      C264 152, 328 140, 380 110
      C424 78, 500 56, 594 58
      C690 60, 778 92, 864 128
      C916 150, 956 154, 990 154
      C1008 154, 1018 156, 1028 158
    `,
    `
      M194 150
      C236 146, 278 122, 314 82
      C344 44, 414 20, 510 22
      C610 24, 704 58, 806 118
      C870 152, 920 160, 966 160
      C990 160, 1010 160, 1028 158
    `,
    `
      M194 150
      C252 150, 310 136, 356 98
      C392 66, 452 44, 534 44
      C622 44, 690 74, 748 112
      C804 146, 850 162, 904 162
      C950 162, 990 160, 1028 158
    `,
  ] as const;

  const holdSeconds = Math.min(3, Math.max(2, waveDurationSeconds / 2));
  const morphTransitionSeconds = 0.4;
  const segmentSeconds = holdSeconds + morphTransitionSeconds;
  const morphCycleSeconds = topProfileVariants.length * segmentSeconds;

  const topProfileSequence = [
    topProfileVariants[0],
    topProfileVariants[0],
    topProfileVariants[1],
    topProfileVariants[1],
    topProfileVariants[2],
    topProfileVariants[2],
    topProfileVariants[3],
    topProfileVariants[3],
    topProfileVariants[0],
  ] as const;

  const topProfileValues = topProfileSequence.join(';');
  const topProfileDuration = `${morphCycleSeconds.toFixed(2)}s`;
  const topProfileBegin = `${Math.max(0, waveDelaySeconds)}s`;
  const morphKeyTimes = [
    0,
    holdSeconds / morphCycleSeconds,
    segmentSeconds / morphCycleSeconds,
    (segmentSeconds + holdSeconds) / morphCycleSeconds,
    (segmentSeconds * 2) / morphCycleSeconds,
    (segmentSeconds * 2 + holdSeconds) / morphCycleSeconds,
    (segmentSeconds * 3) / morphCycleSeconds,
    (segmentSeconds * 3 + holdSeconds) / morphCycleSeconds,
    1,
  ]
    .map((value) => value.toFixed(4).replace(/0+$/, '').replace(/\.$/, ''))
    .join(';');

  // Bottom profile animates only at the edges (front/rear), while the wheel gap stays rigid.
  const bottomEdgeVariants = [
    `
      M198 216
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
      L1008 216
    `,
    `
      M186 212
      L286 212
      C302 216, 314 205, 322 189
      C332 169, 349 158, 373 158
      C398 158, 416 169, 427 189
      C435 205, 447 216, 463 216
      L738 216
      C754 216, 766 205, 774 189
      C784 169, 802 158, 827 158
      C852 158, 870 169, 881 189
      C889 205, 901 216, 917 216
      L996 212
    `,
    `
      M214 220
      L286 220
      C302 216, 314 205, 322 189
      C332 169, 349 158, 373 158
      C398 158, 416 169, 427 189
      C435 205, 447 216, 463 216
      L738 216
      C754 216, 766 205, 774 189
      C784 169, 802 158, 827 158
      C852 158, 870 169, 881 189
      C889 205, 901 216, 917 216
      L1026 220
    `,
    `
      M194 214
      L286 214
      C302 216, 314 205, 322 189
      C332 169, 349 158, 373 158
      C398 158, 416 169, 427 189
      C435 205, 447 216, 463 216
      L738 216
      C754 216, 766 205, 774 189
      C784 169, 802 158, 827 158
      C852 158, 870 169, 881 189
      C889 205, 901 216, 917 216
      L1000 214
    `,
  ] as const;
  const bottomEdgeSequence = [
    bottomEdgeVariants[0],
    bottomEdgeVariants[0],
    bottomEdgeVariants[1],
    bottomEdgeVariants[1],
    bottomEdgeVariants[2],
    bottomEdgeVariants[2],
    bottomEdgeVariants[3],
    bottomEdgeVariants[3],
    bottomEdgeVariants[0],
  ] as const;
  const bottomEdgeValues = bottomEdgeSequence.join(';');
  const wheelCenters = [373, 827] as const;
  const wheelCenterY = 216;
  const wheelOuterRadius = 36;
  const wheelInnerRadius = 11;
  const wheelSpokeLength = 23;
  const wheelSpokeDiagonal = 17;
  const wheelRotationDuration = '16s';

  const svg = (
    <svg
      viewBox="0 0 1200 260"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Minimal modern car outline"
      className={svgClassName}
      style={{ maxWidth, height: 'auto', display: 'block' }}
    >
      <g
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={strokeGlowStyle}
      >
        <path
          d={topProfileVariants[0]}
          strokeWidth="8"
        >
          {animateTopWave && (
            <animate
              attributeName="d"
              values={topProfileValues}
              dur={topProfileDuration}
              begin={topProfileBegin}
              calcMode="linear"
              keyTimes={morphKeyTimes}
              repeatCount="indefinite"
            />
          )}
        </path>

        <path
          d={bottomEdgeVariants[0]}
          strokeWidth="8"
        >
          {animateTopWave && (
            <animate
              attributeName="d"
              values={bottomEdgeValues}
              dur={topProfileDuration}
              begin={topProfileBegin}
              calcMode="linear"
              keyTimes={morphKeyTimes}
              repeatCount="indefinite"
            />
          )}
        </path>

        {wheelCenters.map((wheelCenterX) => (
          <g key={wheelCenterX}>
            <circle
              cx={wheelCenterX}
              cy={wheelCenterY}
              r={wheelOuterRadius}
              strokeWidth="7"
            />
            <circle
              cx={wheelCenterX}
              cy={wheelCenterY}
              r={wheelInnerRadius}
              strokeWidth="5"
            />

            <line
              x1={wheelCenterX}
              y1={wheelCenterY - wheelSpokeLength}
              x2={wheelCenterX}
              y2={wheelCenterY + wheelSpokeLength}
              strokeWidth="3"
            />
            <line
              x1={wheelCenterX - wheelSpokeLength}
              y1={wheelCenterY}
              x2={wheelCenterX + wheelSpokeLength}
              y2={wheelCenterY}
              strokeWidth="3"
            />
            <line
              x1={wheelCenterX - wheelSpokeDiagonal}
              y1={wheelCenterY - wheelSpokeDiagonal}
              x2={wheelCenterX + wheelSpokeDiagonal}
              y2={wheelCenterY + wheelSpokeDiagonal}
              strokeWidth="3"
            />
            <line
              x1={wheelCenterX - wheelSpokeDiagonal}
              y1={wheelCenterY + wheelSpokeDiagonal}
              x2={wheelCenterX + wheelSpokeDiagonal}
              y2={wheelCenterY - wheelSpokeDiagonal}
              strokeWidth="3"
            />

            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${wheelCenterX} ${wheelCenterY}`}
              to={`360 ${wheelCenterX} ${wheelCenterY}`}
              dur={wheelRotationDuration}
              repeatCount="indefinite"
            />
          </g>
        ))}
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
