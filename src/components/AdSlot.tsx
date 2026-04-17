interface AdSlotProps {
  slot: 'header' | 'content' | 'footer'
}

export default function AdSlot({ slot }: AdSlotProps) {
  const dimensions = {
    header: { width: '100%', height: 90, label: 'Advertisement (728×90)' },
    content: { width: 336, height: 280, label: 'Advertisement (336×280)' },
    footer: { width: '100%', height: 90, label: 'Advertisement (728×90)' },
  }[slot]

  return (
    <div
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: '#f3f4f6',
        border: '1px dashed #d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#9ca3af',
        fontSize: 12,
        margin: '16px auto',
      }}
    >
      {dimensions.label}
    </div>
  )
}
