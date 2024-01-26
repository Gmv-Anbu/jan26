import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

const Nav = styled.nav``;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavListItem = styled.li`
  font-size: 1.6rem;
  padding: 0 3.3rem;
`;

interface ILink {
  isActive: boolean;
}

const LinkItem = styled.a<ILink>`
  transition: all 0.2s;
  cursor: pointer;
  font-family: ${({theme}) => theme.fontsFamily.primary};
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 2.4rem;
  color: ${({ theme, isActive }) => isActive ? theme.colors.fontprimary : theme.colors.fontdark};

  &:hover {
    color: ${({ theme }) => theme.colors.fontprimary};
  }
`;

const Menu = () => {
  const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData)
  const header = ThemeConfiguration?.sections?.home?.header;
  const router = useRouter();

  return (
    <Nav>
      <NavList>
        {header?.menus?.map((menu) => {
          return (
            <NavListItem key={menu?.menu?.title}>
              <Link href={menu?.menu?.link} passHref>
                <LinkItem isActive={router.pathname == menu?.menu?.link} href={menu?.menu?.link}>{menu?.menu?.title}</LinkItem>
              </Link>
            </NavListItem>
          );
        })}
      </NavList>
    </Nav>
  );
};

export default Menu;
