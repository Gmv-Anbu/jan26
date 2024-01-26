import React, { useState } from 'react';

import {
  InputWrapper,
  InputLabel,
  SingleOption,
} from '../../styled-components/formInputs';

const SingleSelect = (props: any) => {
  const { label, arr, selected, setSelected } = props;

  return (
    <InputWrapper>
      {label ? <InputLabel required={false}>{label}</InputLabel> : ''}
      {arr.map((name: any) => {
        return (
          <SingleOption
            key={name}
            onClick={() => setSelected(name)}
            className={selected === name ? 'active' : ''}
          >
            {name}
          </SingleOption>
        );
      })}
    </InputWrapper>
  );
};

export default SingleSelect;
