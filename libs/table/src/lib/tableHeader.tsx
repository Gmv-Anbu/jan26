import React from 'react';

import {
  ButtonContainer,
  Container,
  CreateButton,
  FilterButton,
  HeaderContainer,
  Icon,
  InputField,
  InputPath,
  Plus,
  SearchIcon,
  TableHeader,
} from './tableStyles';

export const THeader = () => {
  return (
    <TableHeader>
      <HeaderContainer>
        <h3>
          TotalUsers<span>(452)</span>
        </h3>
      </HeaderContainer>
      <Container>
        <InputField>
          <SearchIcon className="Search">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.75957 0C8.93886 0 11.5191 2.58029 11.5191 5.75957C11.5191 8.93886 8.93886 11.5191 5.75957 11.5191C2.58029 11.5191 0 8.93886 0 5.75957C0 2.58029 2.58029 0 5.75957 0ZM5.75957 10.2392C8.23427 10.2392 10.2392 8.23427 10.2392 5.75957C10.2392 3.28424 8.23427 1.27991 5.75957 1.27991C3.28424 1.27991 1.27991 3.28424 1.27991 5.75957C1.27991 8.23427 3.28424 10.2392 5.75957 10.2392ZM11.1896 10.2847L13 12.0945L12.0945 13L10.2847 11.1896L11.1896 10.2847Z"
                fill="#858181"
              />
            </svg>
          </SearchIcon>

          <InputPath placeholder="Search" type="text"></InputPath>
        </InputField>
        <div>
          <FilterButton>
            <Icon
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="-287.75 385.885 27.219 21.063"
            >
              <path d="M-262.542 389.734h-11.625c-.442-1.618-1.91-2.817-3.667-2.817-1.756 0-3.224 1.199-3.667 2.817h-4.234a1 1 0 100 2h4.234c.443 1.617 1.91 2.816 3.667 2.816s3.224-1.199 3.667-2.816h11.625a1 1 0 100-2zm-15.292 2.816a1.817 1.817 0 110-3.633 1.817 1.817 0 010 3.633zM-286.735 402.109a1 1 0 001 1h11.625c.443 1.617 1.91 2.816 3.667 2.816 1.756 0 3.224-1.199 3.667-2.816h4.234a1 1 0 100-2h-4.234c-.443-1.618-1.91-2.817-3.667-2.817-1.756 0-3.225 1.199-3.667 2.817h-11.625a1 1 0 00-1 1zm14.475 0a1.817 1.817 0 113.634 0 1.817 1.817 0 01-3.634 0z"></path>
            </Icon>
            Filter
          </FilterButton>
        </div>
        <ButtonContainer>
          <CreateButton>
            <Plus>+</Plus>Create Assests{' '}
          </CreateButton>
        </ButtonContainer>
      </Container>
    </TableHeader>
  );
};
