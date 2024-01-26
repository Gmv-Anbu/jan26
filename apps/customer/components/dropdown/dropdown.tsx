import Link from 'next/link'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
interface MenuProps {
  left?: string
  bottom?: string
  textTransform?: string
  isHeight?: string
  isWidth?: string
  isEdit?: boolean
}

const MenuItems = styled.div<MenuProps>`
  position: absolute;
  left: ${(props) => props.left || '-4rem'};
  padding-top: 1rem;
  top: 4rem;
  bottom: ${(props) => props.bottom || ''};
  z-index: 100;
  transition: all 0.2s;

  .iconClass {
    margin-right: 1rem;
    display: flex;
  }

  .not-active {
    opacity: 0;
    display: none;
  }
  .active {
    cursor: auto;
    width: ${(props) => (props.isWidth ? props.isWidth : '17.6rem')};
    z-index: 99;
    display: flex;
    flex-direction: column;
    padding: 1.2rem 0.8rem;
    gap: 0.8rem 0;
    border-radius: 0.2rem;
    transition: all 0.2s;
    background-color: #fff;
    box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.25), 2px 2px 4px 4px rgba(0, 0, 0, 0.06);
    &::before {
      /* z-index: -1; */
      content: '';
      position: absolute;
      top: calc(17.6rem - 17rem);
      left: calc(17.6rem - 10rem);
      width: 1.8rem;
      height: 1.8rem;
      transform: rotate(45deg);
      background-color: #fff;
    }
    p,
    a {
      z-index: 1;
      cursor: pointer;
      // display: block;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      font-weight: 600;
      color: #1e2132;
      padding: 0.4rem 0.5rem 0.4rem 0.5rem;
      transition: all 0.2s;
      line-height: normal;
      letter-spacing: -0.25px;
      // text-transform: capitalize;
      text-transform: ${(props) => props.textTransform || 'capitalize'};
      &:hover {
        a {
          color: #2a7575;
          font-size: 1.44rem;
        }
        font-size: 1.44rem;
        color: #2a7575;
        background-color: #f4f9f9;
      }
    }
    .arrow-icon {
      display: flex;
      justify-content: flex-end;
      flex-grow: 1;
    }
  }
  @media screen and (max-width: 1620px) {
    position: absolute;
    left: ${(props) => (props.isEdit ? '-12rem' : '-4rem')};
    .active {
      &::before {
        left: ${(props) => (props.isEdit ? '13rem' : '')};;
      }
    }
  }
  @media screen and (max-width: 991px) {
    position: relative;
    .not-active {
      position: absolute;
    }
    .active {
      position: absolute;
      width: 17.6rem;
      left: calc(17.6rem - 23rem);
      &::before {
        top: -6px;
        right: 7rem;
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    top: 5rem;
    .active {
      position: absolute;
      left: calc(17.6rem - 24rem);
      &::before {
        top: -8px;
        left: 6.5rem;
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
  @media screen and (max-width: 460px) {
    .active {
      position: absolute;
      left: calc(17.6rem - 25rem);
      &::before {
        top: -8px;
        left: 9rem;
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
  @media screen and (max-width: 400px) {
    .active {
      position: absolute;
      left: calc(17.6rem - 29rem);
      &::before {
        left: 11.8rem;
      }
    }
  }
`

const DropDown = ({ items, isActive, left, bottom, textTransform, onDeativate, isEdit }: { items: any; isActive: boolean; left?: string; bottom?: string; textTransform?: string; onDeativate?: any; isEdit?: boolean }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onDeativate()
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <MenuItems isWidth={'17.6rem'} left={left} bottom={bottom} textTransform={textTransform} ref={menuRef} isEdit={isEdit}>
      <div className={isActive ? 'active' : 'not-active'}>
        {items.length > 0 &&
          items.map((item, key) => (
            <Link key={key} href={item.link}>
              <p onClick={item.onClick}>
                <a>
                  <span className="iconClass">{item.imgSrc && <Image src={item.imgSrc} alt="menu item" className="image" width={20} height={20} />}</span>
                  {item.name}
                </a>

                {item?.arrowIcon && (
                  <span className="arrow-icon">
                    <Image src={item?.arrowIcon} alt="ICO" width={4.5} height={10} />
                  </span>
                )}
              </p>
            </Link>
          ))}
      </div>
    </MenuItems>
  )
}

export default DropDown
