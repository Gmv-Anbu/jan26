import { useEffect, useState } from 'react'
import styled from 'styled-components'

const RadioWrapper = styled.div`
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  .radio-header {
    min-width: 354px;
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 2.2rem;
    letter-spacing: 0.004em;
    color: #121212;
  }
  @media screen and (max-width: 768px) {
    gap: 2rem;
    .radio-header {
      min-width: 332px;
      font-size: 2.25rem;
    }
  }
`

const RadioBox = styled.div`
  display: flex;
  gap: 6rem;
  div {
    display: flex;
    gap: 0.4rem;
    & input {
      margin-right: 0.5rem;
    }
    input[type='radio'] {
      -webkit-appearance: none;
      background-color: #fff;
      margin: 0;
      appearance: none;
      font: inherit;
      color: #2a7575;
      width: 2rem;
      height: 2rem;
      border: 0.15rem solid #2a7575;
      border-radius: 50%;
      transform: translateY(0rem);
      display: grid;
      place-content: center;
      cursor: pointer;
    }
    input[type='radio']::before {
      content: '';
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1rem 1rem #fff;
    }
    /* input[type='radio'] {
      background-color: #2a7575;
    }
    input[type='radio']::before {
      transform: scale(1);
    } */
    .input-active[type='radio'] {
      background-color: #2a7575;
    }
    .input-active[type='radio']::before {
      transform: scale(1);
    }
    label {
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 2.2rem;
      letter-spacing: 0.004rem;
      color: #121212;
    }
  }
  @media screen and (max-width: 768px) {
    div {
      gap: 1rem;
      label {
        font-size: 1.75rem;
      }
    }
  }
`

function RadioButton({ label, onGetValue, name }) {
  const radioMenu = [
    {
      label: 'Yes',
      id: '1',
      value: true,
    },
    {
      label: 'No',
      id: '2',
      value: false,
    },
  ]
  const [selectedItem, setSelectedItem] = useState('0')
  const [isClass, setIsClass] = useState(true)

  return (
    <RadioWrapper>
      <label className="radio-header">{label}</label>
      <RadioBox>
        {radioMenu.map((item, key) => (
          <RadioInput
            key={key}
            id={item.id}
            label={item.label}
            isChecked={selectedItem == item.id ? true : false}
            isDefault={isClass}
            onSelect={(e) => {
              setIsClass(false)
              setSelectedItem(e.target.id)
              onGetValue(item, name)
            }}
            name={item.label}
          />
        ))}
      </RadioBox>
    </RadioWrapper>
  )
}

function RadioInput({ id, label, isChecked, onSelect, name, isDefault }) {
  return (
    <div>
      <input id={id} className={isChecked ? 'input-active' : id == '2' && isDefault ? 'input-active' : ''} type="radio" name={name ? name : 'inlineRadioOptions'} onChange={(e) => onSelect(e)} checked={isChecked} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default RadioButton
