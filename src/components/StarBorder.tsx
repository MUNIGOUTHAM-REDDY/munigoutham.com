import type { ElementType, ComponentPropsWithoutRef } from 'react'
import './StarBorder.css'

type StarBorderProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  color?: string
  speed?: string
  thickness?: number
  children?: React.ReactNode
} & ComponentPropsWithoutRef<T>

const StarBorder = <T extends ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button'
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as Record<string, unknown>).style,
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  )
}

export default StarBorder
