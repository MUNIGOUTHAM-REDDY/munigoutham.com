import { useEffect, useId, type ReactNode } from 'react'

const STYLE_ID = 'cool-theme-switch-styles'

function injectStyles(shadow: boolean) {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const styleEl = document.createElement('style')
  styleEl.id = STYLE_ID
  styleEl.textContent = `
    .cts-root { display: inline-block; line-height: 0; }
    .cts-root, .cts-root *, .cts-root *::before, .cts-root *::after {
      box-sizing: border-box;
      margin: 0; padding: 0;
      font-size: var(--toggle-size);
    }
    .cts-checkbox { display: none; }
    .cts-container {
      width: var(--container-width);
      height: var(--container-height);
      background-color: var(--container-light-bg);
      border-radius: var(--container-radius);
      overflow: hidden;
      cursor: pointer;
      box-shadow: ${shadow ? '0em -0.062em 0.062em rgba(0,0,0,0.25), 0em 0.062em 0.125em rgba(255,255,255,0.94)' : 'none'};
      transition: var(--transition);
      position: relative;
    }
    .cts-container::before {
      content: "";
      position: absolute;
      z-index: 1;
      inset: 0;
      box-shadow:
        0em 0.05em 0.187em rgba(0,0,0,0.25) inset,
        0em 0.05em 0.187em rgba(0,0,0,0.25) inset;
      border-radius: var(--container-radius);
      pointer-events: none;
    }
    .cts-circle {
      width: var(--circle-container-diameter);
      height: var(--circle-container-diameter);
      background-color: rgba(255,255,255,0.1);
      position: absolute;
      left: var(--circle-container-offset);
      top: var(--circle-container-offset);
      border-radius: var(--container-radius);
      box-shadow:
        inset 0 0 0 3.375em rgba(255,255,255,0.1),
        0 0 0 0.625em rgba(255,255,255,0.1),
        0 0 0 1.25em rgba(255,255,255,0.1);
      display: flex;
      transition: var(--circle-transition);
      pointer-events: none;
    }
    .cts-sunmoon {
      pointer-events: auto;
      position: relative;
      z-index: 2;
      width: var(--sun-moon-diameter);
      height: var(--sun-moon-diameter);
      margin: auto;
      border-radius: var(--container-radius);
      background-color: var(--sun-bg);
      box-shadow:
        0.062em 0.062em 0.062em 0em rgba(254,255,239,0.61) inset,
        0em -0.062em 0.062em 0em #a1872a inset;
      filter:
        drop-shadow(0.062em 0.125em 0.125em rgba(0,0,0,0.25))
        drop-shadow(0em 0.062em 0.125em rgba(0,0,0,0.25));
      overflow: hidden;
      transition: var(--transition);
    }
    .cts-moon {
      transform: translateX(100%);
      width: 100%;
      height: 100%;
      background-color: var(--moon-bg);
      border-radius: inherit;
      box-shadow:
        0.062em 0.062em 0.062em 0em rgba(254,255,239,0.61) inset,
        0em -0.062em 0.062em 0em #969696 inset;
      transition: var(--transition);
      position: relative;
    }
    .cts-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .cts-icon svg {
      width: 1.25em;
      height: 1.25em;
    }
    .cts-clouds {
      width: 1.25em;
      height: 1.25em;
      background: var(--clouds-color);
      border-radius: var(--container-radius);
      position: absolute;
      bottom: -0.625em;
      left: 0.312em;
      box-shadow:
        0.937em 0.312em var(--clouds-color),
        -0.312em -0.312em var(--back-clouds-color),
        1.437em 0.375em var(--clouds-color),
        0.5em -0.125em var(--back-clouds-color),
        2.187em 0 var(--clouds-color),
        1.25em -0.062em var(--back-clouds-color),
        2.937em 0.312em var(--clouds-color),
        2em -0.312em var(--back-clouds-color),
        3.625em -0.062em var(--clouds-color),
        2.625em 0em var(--back-clouds-color),
        4.5em -0.312em var(--clouds-color),
        3.375em -0.437em var(--back-clouds-color),
        4.625em -1.75em 0 0.437em var(--clouds-color),
        4em -0.625em var(--back-clouds-color),
        4.125em -2.125em 0 0.437em var(--back-clouds-color);
      transition: 0.5s cubic-bezier(0,-0.02,0.4,1.25);
    }
    .cts-stars {
      position: absolute;
      color: var(--stars-color);
      top: -100%;
      left: 0.312em;
      width: 2.75em;
      height: auto;
      transition: var(--transition);
    }
    .cts-checkbox:checked + .cts-container { background: var(--container-night-bg); }
    .cts-checkbox:checked + .cts-container .cts-circle {
      left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
    }
    .cts-checkbox:checked + .cts-container .cts-moon { transform: translate(0); }
    .cts-checkbox:checked + .cts-container .cts-clouds { bottom: -4.062em; }
    .cts-checkbox:checked + .cts-container .cts-stars { top: 50%; transform: translateY(-50%); }
    .cts-circle:hover { left: calc(var(--circle-container-offset) + 0.187em); }
    .cts-checkbox:checked + .cts-container .cts-circle:hover {
      left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em);
    }
  `
  document.head.appendChild(styleEl)
}

export interface CoolThemeSwitchProps {
  checked: boolean
  onChange: (next: boolean) => void
  toggleSize?: number
  scale?: number
  offDiscColor?: string
  onDiscColor?: string
  containerOff?: string
  containerOn?: string
  shadow?: boolean
  ariaLabel?: string
  className?: string
  offIcon?: ReactNode
  onIcon?: ReactNode
}

const DefaultOffIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A1F2A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
)

const DefaultOnIcon = (
  <svg viewBox="0 0 24 24" fill="#0E1726" stroke="#0E1726" strokeWidth="0.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 L13.6 9 L20 10.5 L13.6 12 L12 18.5 L10.4 12 L4 10.5 L10.4 9 Z" />
    <path d="M18.5 14 L19.2 16.4 L21.5 17 L19.2 17.6 L18.5 20 L17.8 17.6 L15.5 17 L17.8 16.4 Z" />
    <path d="M5 15 L5.5 16.6 L7 17 L5.5 17.4 L5 19 L4.5 17.4 L3 17 L4.5 16.6 Z" />
  </svg>
)

export default function CoolThemeSwitch({
  checked,
  onChange,
  toggleSize = 16,
  scale = 1,
  offDiscColor = '#E8E4D9',
  onDiscColor = '#87C23B',
  containerOff = '#3D7EAE',
  containerOn = '#1D1F2C',
  shadow = true,
  ariaLabel = 'Toggle',
  className = '',
  offIcon = DefaultOffIcon,
  onIcon = DefaultOnIcon,
}: CoolThemeSwitchProps) {
  const id = useId()

  useEffect(() => {
    injectStyles(shadow)
  }, [shadow])

  const cssVars = {
    '--toggle-size': `${toggleSize}px`,
    '--container-width': '5.625em',
    '--container-height': '2.5em',
    '--container-radius': '6.25em',
    '--container-light-bg': containerOff,
    '--container-night-bg': containerOn,
    '--circle-container-diameter': '3.375em',
    '--sun-moon-diameter': '2.125em',
    '--sun-bg': offDiscColor,
    '--moon-bg': onDiscColor,
    '--circle-container-offset': 'calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1)',
    '--stars-color': '#fff',
    '--clouds-color': '#F3FDFF',
    '--back-clouds-color': '#AACADF',
    '--transition': '.5s cubic-bezier(0, -0.02, 0.4, 1.25)',
    '--circle-transition': '.3s cubic-bezier(0, -0.02, 0.35, 1.17)',
    fontSize: `${toggleSize}px`,
    transform: `scale(${scale})`,
  } as React.CSSProperties

  return (
    <label className={`cts-root ${className}`} htmlFor={id} aria-label={ariaLabel}>
      <input
        id={id}
        type="checkbox"
        className="cts-checkbox"
        role="switch"
        aria-checked={checked}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <div className="cts-container" style={cssVars}>
        <div className="cts-circle">
          <div className="cts-sunmoon">
            <div className="cts-icon">{offIcon}</div>
            <div className="cts-moon">
              <div className="cts-icon">{onIcon}</div>
            </div>
          </div>
        </div>
        <span className="cts-clouds" />
        <span className="cts-stars">
          <svg width="44" height="9" viewBox="0 0 44 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="6.5" r="1.5" fill="#fff" />
            <circle cx="8.5" cy="1.5" r="0.5" fill="#fff" />
            <circle cx="16" cy="3" r="1" fill="#fff" />
            <circle cx="22.5" cy="7.5" r="1.5" fill="#fff" />
            <circle cx="29.5" cy="3.5" r="1" fill="#fff" />
            <circle cx="36" cy="1" r="0.5" fill="#fff" />
            <circle cx="41.5" cy="6.5" r="1" fill="#fff" />
          </svg>
        </span>
      </div>
    </label>
  )
}
