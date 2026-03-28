import { useState } from 'react'
import { Label, Radio, RadioGroup } from '@heroui/react'
import { Check } from 'lucide-react'

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
                className={`flex items-center justify-center size-8 rounded-md p-[2px] transition-colors ${
                  selectedColor === color
                    ? `border-2 ${value.border}`
                    : 'border-2 border-transparent'
                }`}
              >
                <div
                  className={`${value.background} w-full h-full rounded-[2px] flex items-center justify-center transition-transform ${selectedColor === color ? 'scale-90' : ''}`}
                >
                  {selectedColor === color && (
                    <Check className='size-3.5 text-white' strokeWidth={3} />
                  )}
                </div>
              </div>
            </Radio.Content>
          </Radio>
        ))}
      </div>
    </RadioGroup>
  )
}

export default ColorPicker
