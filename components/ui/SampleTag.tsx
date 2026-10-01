// Adapts to whatever text color it's dropped into (dark cards, light cards, testimonials) via currentColor.
export default function SampleTag({ style }: { style?: React.CSSProperties }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        padding: '2px 8px',
        borderRadius: 999,
        color: 'currentColor',
        background: 'color-mix(in srgb, currentColor 14%, transparent)',
        border: '1px solid color-mix(in srgb, currentColor 32%, transparent)',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      Sample
    </span>
  );
}
