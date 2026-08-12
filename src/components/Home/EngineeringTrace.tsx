import styles from './PortfolioHero.module.css';

interface EngineeringTraceProps {
  modeIndex: number;
  steps: readonly string[];
}

const nodes = [
  { x: 82, y: 108 },
  { x: 292, y: 164 },
  { x: 292, y: 386 },
  { x: 500, y: 275 },
  { x: 82, y: 442 },
  { x: 704, y: 132 },
  { x: 704, y: 426 },
] as const;

const edges = [
  {
    key: '0-1',
    d: 'M82 108 C166 108 210 164 292 164',
  },
  {
    key: '0-2',
    d: 'M82 108 C164 184 210 332 292 386',
  },
  {
    key: '4-1',
    d: 'M82 442 C164 370 210 222 292 164',
  },
  {
    key: '4-2',
    d: 'M82 442 C166 442 210 386 292 386',
  },
  {
    key: '1-3',
    d: 'M292 164 C384 164 410 275 500 275',
  },
  {
    key: '2-3',
    d: 'M292 386 C384 386 410 275 500 275',
  },
  {
    key: '3-5',
    d: 'M500 275 C590 275 614 132 704 132',
  },
  {
    key: '3-6',
    d: 'M500 275 C590 275 614 426 704 426',
  },
] as const;

const routes = [
  [0, 1, 3, 6],
  [0, 2, 3, 5],
  [4, 2, 3, 6],
  [4, 1, 3, 5],
] as const;

export default function EngineeringTrace({
  modeIndex,
  steps,
}: EngineeringTraceProps) {
  const route = routes[modeIndex] ?? routes[0];

  const activeEdges = new Set<string>(
    route.slice(0, -1).map(
      (nodeIndex, index) =>
        `${nodeIndex}-${route[index + 1]}`,
    ),
  );

  const nodeLabels = new Map<number, string>(
    route.map((nodeIndex, index) => [
      nodeIndex,
      steps[index] ?? 'STATE',
    ]),
  );

  const terminalNode = route[route.length - 1];

  return (
    <svg
      className={styles.traceSvg}
      viewBox="0 0 786 548"
      role="img"
      aria-label={`System path: ${steps.join(
        ' to ',
      )}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g aria-hidden="true">
        {edges.map((edge) => {
          const isActive =
            activeEdges.has(edge.key);

          return (
            <path
              key={edge.key}
              d={edge.d}
              className={[
                styles.tracePath,
                isActive
                  ? styles.tracePathActive
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            />
          );
        })}

        {nodes.map((node, index) => {
          const label = nodeLabels.get(index);
          const isActive =
            label !== undefined;
          const isTerminal =
            index === terminalNode;

          return (
            <g
              key={`${node.x}-${node.y}`}
              className={[
                styles.traceNode,
                isActive
                  ? styles.traceNodeActive
                  : '',
                isTerminal
                  ? styles.traceNodeTerminal
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              transform={`translate(${node.x} ${node.y})`}
            >
              <circle r="9" />

              {label ? (
                <text
                  className={
                    styles.traceLabel
                  }
                  textAnchor="middle"
                  y="34"
                >
                  {label}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
