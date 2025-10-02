import { useState } from 'react'
import { Radio, RadioGroup } from '@heroui/react'

import { COLORS_MAP } from '../../features/tags/constants/tagColors'

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
