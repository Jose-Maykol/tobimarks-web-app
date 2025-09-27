import { useState } from 'react'
import { Radio, RadioGroup } from '@heroui/react'

const COLORS_MAP = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
  yellow: 'bg-yellow-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
  sky: 'bg-sky-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  violet: 'bg-violet-500',
  purple: 'bg-purple-500',
  fuchsia: 'bg-fuchsia-500',
  pink: 'bg-pink-500',
  rose: 'bg-rose-500',
  stone: 'bg-stone-500',
} as const

type ColorKey = keyof typeof COLORS_MAP

const DEFAULT_COLOR: ColorKey = 'red'

interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  label?: string
}

const ColorPicker = ({ value, onChange, label = 'Color' }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(value || DEFAULT_COLOR)

  const handleChange = (color: string) => {
    const colorKey = color as ColorKey
    setSelectedColor(colorKey)
    onChange?.(colorKey)
  }

  return (
    <RadioGroup
      orientation='horizontal'
      className='text-small'
      name='color'
      defaultValue='blue'
      label={label}
      value={selectedColor}
      onValueChange={handleChange}
    >
      {(Object.entries(COLORS_MAP) as Array<[ColorKey, string]>).map(([color, bgClassName]) => (
        <Radio
          key={color}
          value={color}
          classNames={{
            base: 'm-0 p-0',
            wrapper: 'hidden',
            control: 'hidden',
          }}
        >
          <div
            className={`${bgClassName} size-6 p-1 rounded-sm ${selectedColor === color ? 'ring-2 ring-neutral-100' : ''}`}
          ></div>
        </Radio>
      ))}
    </RadioGroup>
  )
}

export default ColorPicker
