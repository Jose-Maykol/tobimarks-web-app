import { useState } from 'react'
import { Label, Radio, RadioGroup } from '@heroui/react'

import { COLORS_MAP } from '../../features/tags/constants/tagColors'

type ColorKey = keyof typeof COLORS_MAP

const DEFAULT_COLOR: ColorKey = 'red'

interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  label?: string
}

const ColorPicker = ({ value, defaultValue, onChange, label = 'Color' }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(value || defaultValue || DEFAULT_COLOR)

  const handleChange = (color: string) => {
    const colorKey = color as ColorKey
    setSelectedColor(colorKey)
    onChange?.(colorKey)
  }

  return (
    <RadioGroup
      orientation='horizontal'
      className='text-small flex gap-4'
      name='color'
      defaultValue='blue'
      value={selectedColor}
      onChange={handleChange}
    >
      <Label>{label}</Label>
      <div className='flex gap-2 items-center flex-wrap'>
        {Object.entries(COLORS_MAP).map(([color, value]) => (
          <Radio key={color} value={color} className='m-0 p-0 cursor-pointer'>
            <Radio.Control className='hidden'>
              <Radio.Indicator />
            </Radio.Control>
            <Radio.Content>
              <div
                className={`${value.background} size-6 p-1 rounded-sm ${selectedColor === color ? 'ring-2 ring-neutral-100' : ''}`}
              ></div>
            </Radio.Content>
          </Radio>
        ))}
      </div>
    </RadioGroup>
  )
}

export default ColorPicker
