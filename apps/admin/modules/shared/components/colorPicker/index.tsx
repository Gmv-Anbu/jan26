import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from 'react-best-gradient-color-picker'

interface ColorPickerProps {
  color: any;
  colorChange: (value: string) => void;
  visible: string | boolean;
  setIsVisible: () => void;
}

const ColorPickerBackDrop = styled.div`
  position: fixed;
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 3;
  width: 350px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  margin: 10px 15px 0px 0px;
  padding: 0px 10px;
`

const ThemeColorPicker = ({
  color,
  colorChange,
  visible,
}: ColorPickerProps) => {
  const [pickerColor, setPickerColor] = useState<string>(color);

  const onColorChange = (value) => {
    setPickerColor(value);
  };

  return (
    <>
      {visible && (
        <PopOver>
          <ColorPickerBackDrop />
          <ColorPicker value={pickerColor} onChange={onColorChange} />
          <div>
            <Button onClick={() => colorChange(color)}>Cancel</Button>
            <Button onClick={() => colorChange(pickerColor)}>Save</Button>
          </div>
        </PopOver>
      )}
    </>
  );
};

export default ThemeColorPicker;
