import React from 'react'
import { Container } from '@apps/customer/styles/CommonStyles'
import styled from 'styled-components'
import Image from 'next/image'
import { ButtonPrimaryOutline } from '@apps/customer/modules/shared/components/button/button'
import { useRouter } from 'next/router'

const MembershipWrap = styled.div`
  background: #0e1818;
  padding: 10.8rem 0 12.6rem;
  position: relative;
  .container-wrap {
    position: relative;
    z-index: 3;
  }
  &:before {
    content: '';
    position: absolute;
    background: url(/images/customer/shared/bg-member-gradient.webp) no-repeat left center;
    bottom: 0;
    left: 0;
    width: 372px;
    height: 706px;
    z-index: 5;
    @media screen and (max-width: 470px) {
      left: 0;
      z-index: 2;
      position: absolute;
      background-image: linear-gradient(127.11deg, rgba(60, 198, 254, 0.9) 41.76%, rgba(58, 216, 159, 0.9) 62.26%, rgba(41, 193, 255, 0.9) 81.52%);
      filter: blur(99.2378px);
      left: -19rem;
      bottom: 31rem;
      z-index: 4;
      width: 200px;
      height: 200px;
    }
  }
  &:after {
    content: '';
    position: absolute;
    background: url(/images/customer/shared/bg-ellipse-gradient.png) no-repeat top center;
    top: 0;
    right: 0;
    width: 314px;
    height: 981px;
    z-index: 5;
    @media screen and (max-width: 470px) {
      display: none;
    }
  }
  p,
  h1 {
    color: #fff;
    text-align: center;
  }
  h1 {
    margin-bottom: 1.6rem;
  }
  p {
    color: #bdc0c0;
    max-width: 563px;
    margin: auto;
  }
  .btn-border {
    /* View All Features */

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 114%;
    text-transform: uppercase;
    color: #bdc0c0;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    // margin: 4.2rem auto 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // padding: 0 3.2rem;
    // height: 5.2rem;
    /* Frame 48097490 */
    box-sizing: border-box;
    /* Auto layout */
    margin: 4.2rem auto 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 17px 0px;
    gap: 10px;
    width: 213px;
    height: 52px;
    left: 865px;
    top: 902px;
    /* Gray 2 */
    border: 1.5px solid #bdc0c0;
  }
  @media screen and (max-width: 768px) {
    .btn-border {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 114%;
      text-transform: uppercase;
      width: 195px;
      height: 48px;
    }
  }
  @media screen and (max-width: 468px) {
    padding: 60px 0 60px;
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
`
const MembershipTable = styled.div`
  position: relative;
  z-index: 3;
  overflow: auto;
  color: #bdc0c0;
  margin: 3.7rem 0 0;
  table,
  th,
  td {
    border: 1.5px solid #202a2a;
    border-collapse: collapse;
    min-width: 156px;
    i {
      font-style: italic;
    }
  }
  table {
    th:first-child,
    td:first-child {
      @media screen and (max-width: 430px) {
        position: sticky;
        left: -1px;
        background: rgb(14, 24, 24);
        z-index: 1;
        font-size: 12px;
      }
    }
    th {
      text-align: left;
      padding: 3.2rem;
      font-weight: normal;

      span {
        display: block;
        &:nth-child(1) {
          text-transform: uppercase;
          font-size: 2.2rem;
          color: #ffffff;
        }
        &:nth-child(2) {
          color: #848a8b;
          font-size: 1.6rem;
          margin-bottom: 15px;
        }
      }
      &:nth-child(1) {
        width: 30%;
      }
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        width: 23%;
      }
      strong {
        color: #2a7575;
        font-size: 3.2rem;
      }
      em {
        font-style: normal;
        color: #848a8b;
        font-size: 1.4rem;
        padding-left: 5px;
      }
      @media screen and (max-width: 468px) {
        span {
          &:nth-child(1) {
            text-transform: uppercase;
            font-size: 18px;
          }
          &:nth-child(2) {
            font-size: 10.6px;
          }
        }
        strong {
          font-size: 26.6px;
        }
        em {
          font-size: 10px;
        }
      }
    }
    tr td {
      text-align: center;
      padding: 2.4rem 3.2rem;
      font-size: 18px;
      line-height: 142.5%;
      letter-spacing: -0.015em;
      &:first-child {
        text-align: left;
      }
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
`
const NoiseWrapper = styled.div`
  &::before {
    content: '';
    position: absolute;
    background: url(/images/customer/home/TextureM.svg);
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    z-index: 1;
  }
`

const Membership = () => {
  const router = useRouter()
  return (
    <MembershipWrap>
      <NoiseWrapper></NoiseWrapper>
      <Container className="container-wrap">
        <h1>Vault Services</h1>
        <p>Launched in Singapore at FutureGrail, Secured by Malca-Amit</p>
        <MembershipTable>
          {/* <table>
            <tbody>
              <tr>
                <th>
                  <span>Features</span>
                </th>
                <th>
                  <span>Silver</span>
                  <span>Standard Plan</span>
                  <strong>
                    SGD $5800<em>/Year</em>
                  </strong>
                </th>
                <th>
                  <span>Gold</span>
                  <span>Custom Plan</span>
                  <strong>
                    SGD $6800<em>/Year</em>
                  </strong>
                </th>
                <th>
                  <span>Platinum</span>
                  <span>Advanced Plan</span>
                  <strong>
                    SGD $8800<em>/Year</em>
                  </strong>
                </th>
              </tr>
              <tr>
                <td>1x Safety Deposit Box (Annually)</td>
                <td>Small</td>
                <td>Medium</td>
                <td>Large</td>
              </tr>
              <tr>
                <td>Year Round Access to FutureGrail Museum, Gallery and VIP Lounge</td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
              </tr>
              <tr>
                <td>How many guests per visit?</td>
                <td>up to 6 per visit </td>
                <td>up to 6 per visit </td>
                <td>up to 6 per visit </td>
              </tr>
              <tr>
                <td>Preferential Invites to VIP events hosted at FutureGrail</td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
              </tr>
              <tr>
                <td>Educational Workshop on Watch Making with Arnaud Tellier and Ali Nael at FutureGrail's Museum</td>
                <td></td>
                <td></td>
                <td>
                  <Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} />
                </td>
              </tr>
              <tr>
                <td>{"Complimentary watch 3D scan's on sign-up"}</td>
                <td></td>
                <td>2</td>
                <td>
                  5
                </td>
              </tr>
            </tbody>
          </table> */}
          <table>
            <tbody>
              <tr>
                <th>
                  <span>Features</span>
                </th>
                <th>
                  <span>MEDIUM</span>
                  <span>25cm x25cm x60cm (30KG)</span>
                  <strong>
                    SGD $1400<em>/Year</em>
                  </strong>
                </th>
                <th>
                  <span>LARGE</span>
                  <span>40cm x40cm x60cm (80KG)</span>
                  <strong>
                    SGD $2800<em>/Year</em>
                  </strong>
                </th>
                <th>
                  <span>CUSTOM</span>
                  <span>Irregular sized and large items</span>
                  <strong>
                    Pricing upon request 
                  </strong>
                </th>
              </tr>
              <tr>
                <td>Peace of mind - <i>Dual key security and tamper-proof seals</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
              <tr>
                <td>Duty Free - <i>Enjoy tax exemptions within our secured facility</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
              <tr>
                <td>Liability - <i>Expect full coverage for your assets</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
              <tr>
                <td>Personalize - <i>Customizing your account to your needs and preferences</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
              <tr>
                <td>Valuation - <i>Complimentary fair market valuation and option to consign</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
              <tr>
                <td>Enjoy your assets - <i>View your assets any time and enjoy the comforts of our VIP lounge</i></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
                <td><Image src="/images/customer/home/icon-tick.svg" alt="ICO" width={21} height={12} /></td>
              </tr>
            </tbody>
          </table>
        </MembershipTable>
      </Container>
    </MembershipWrap>
  )
}

export default Membership
