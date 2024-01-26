import styled from 'styled-components';
import { ButtonPrimary } from '../../shared/components/button/button';
export const SettingSection = styled.section`
  display:flex;
  justify-content:center;
  align-items:center;
  flex-flow:column;
  gap:10px;
  padding: 6rem 0;
`;
export const Header = styled.header`
    display:flex;
    justify-content:space-between;
    flex-flow:row;
    align-items:center;
    width:100%;
    gap:10px;
`;
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.fontprimary};
`;
export const FormWrapper = styled.div`
display:grid;
grid-template-columns: 1fr;
width:100%;
gap:50px;
@media screen and (min-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
.right{
  // justify-self:end;
  // display:flex;
  // flex-flow:column;
  // gap:10px
}
`;
export const FormItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
`;
export const FormLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.fontprimary};
`;
export const FormInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  display: inline-block;
  border-radius: 10px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;
export const FormButton = styled(ButtonPrimary)`
    padding: 14px 20px;
    margin: 8px 0;
    width: 100%;
`;