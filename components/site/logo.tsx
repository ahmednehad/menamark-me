import Image from 'next/image'

export function Logo({
  className = '',
  inverted = false,
  showText = false,
  width = 110,
  height = 36,
}: {
  className?: string
  inverted?: boolean
  showText?: boolean
  width?: number
  height?: number
}) {
  if (showText) {
    return (
      <span
        className={`font-heading text-xl font-extrabold tracking-tight ${className}`}
      >
        <span className={inverted ? 'text-white' : 'text-foreground'}>MENA</span>
        <span className="text-brand">MARK</span>
      </span>
    )
  }

  return (
    <Image
      src="/images/logo1-default.png"
      alt="MENAMARK"
      width={width}
      height={height}
      // In dark mode, invert a dark-on-transparent logo so it stays readable
      className={`h-auto dark:brightness-0 dark:invert ${className}`}
      priority
    />
  )
}
