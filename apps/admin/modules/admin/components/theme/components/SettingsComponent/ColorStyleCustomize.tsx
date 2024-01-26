import React, { useContext, useState } from 'react';
import Image from 'next/image';
import ThemeContext from '@apps/admin/context/themeContext';
import {
  Avatar,
  ColorHex,
  HeaderText,
  ListContainer,
  Wrapper,
} from './index.styled';
import ThemeColorPicker from '@apps/admin/modules/shared/components/colorPicker';

interface ColorStyleCustomizeProps {
  selectedKey: string;
}

const ColorStyleCustomize = ({ selectedKey }: ColorStyleCustomizeProps) => {
  const SettingsData = useContext<any>(ThemeContext);
  const selectedKeysData = SettingsData?.themeData?.setting[selectedKey];

  const [changedColor, setChangedColor] = useState<{ [key: string]: any }>({
    isChange: false,
    itemToUpdate: '',
    color: '',
  });

  const onchangeColor = async (value: string) => {
    changedColor.color = value;
    setChangedColor({ ...changedColor });
    SettingsData?.setThemeData(themeData => ({
      ...themeData,
      setting: {
        ...themeData.setting,
        [selectedKey]: {
          ...themeData.setting[selectedKey],
          [changedColor.itemToUpdate]: value,
        }
      }
    }));
    await closeColorPicker();
  };

  const handleOpenColorPicker = (key: string, hex: any) => {
    changedColor.isChange = true;
    changedColor.itemToUpdate = key;
    changedColor.color = hex;
    setChangedColor({ ...changedColor });
  }

  const closeColorPicker = async () => {
    changedColor.isChange = false;
    changedColor.itemToUpdate = '';
    setChangedColor({ ...changedColor });
  }

  return (
    <>
      {SettingsData?.themeData?.setting &&
        Object?.entries(selectedKeysData).map(([key, value]) => {
          return (
            <ListContainer key={key}>
              <Wrapper>
                <Avatar bgColor={key === changedColor.itemToUpdate && changedColor.color ? changedColor.color : value} />
                <Wrapper flexWrap="wrap">
                  <HeaderText>{key}</HeaderText>
                  {/* Remove this after confirmation */}
                  {/* <ColorHex>{selectedKeysData[key]}</ColorHex> */}
                </Wrapper>
              </Wrapper>
              <Wrapper cursor='pointer'>
                <Image
                  src={'/svgs/icons/color-picker.svg'}
                  width={13}
                  height={13}
                  alt={'color-picker'}
                  onClick={() => handleOpenColorPicker(key, value)}
                />
                {changedColor.isChange && key === changedColor.itemToUpdate ? (
                  <ThemeColorPicker
                    setIsVisible={closeColorPicker}
                    visible={changedColor.isChange}
                    color={changedColor.color}
                    colorChange={onchangeColor}
                  />
                ) : null}
              </Wrapper>
            </ListContainer>
          );
        })}
    </>
  );
};

export default ColorStyleCustomize;
