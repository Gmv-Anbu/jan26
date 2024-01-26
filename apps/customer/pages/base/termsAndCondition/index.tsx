import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { Container } from '@apps/customer/styles/CommonStyles'
import React from 'react'
import styled from 'styled-components'
const TermsWrapper = styled.div`
  width: 100%;
  h2 {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: normal;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }
  .p-tag,
  h3 {
    color: ${({ theme }) => theme.colors.fontGray};
    margin: 0 0 4rem 0;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015rem;
  }
  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 2.75rem;
    }
    .p-tag {
      font-size: 1.75rem;
    }
  }
  @media screen and (max-width: 468px) {
    h2 {
      margin: 0;
      padding: 0 0 0.85rem 0;
    }
    .p-tag {
      padding: 0 0 0rem 0;
    }
  }
  ul {
    padding: 0 2.5rem;
    li {
      list-style: disc;
      color: ${({ theme }) => theme.colors.fontGray};
      font-size: 1.8rem;
      padding-bottom: 4.8rem;
      &:last-child {
        padding-bottom: 3.9rem;
      }
      .mr-disc {
        display: none;
      }
    }
    li::marker {
      color: #000000;
      font-size: 3rem;
    }
    @media screen and (max-width: 768px) {
      li {
        list-style: none;
        position: relative;
        .mr-disc {
          display: block;
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50px;
          left: -18px;
          top: 4px;
          background-color: #2a7575;
        }
      }
    }
    @media screen and (max-width: 468px) {
      padding: 0 2.3rem;
      li {
        padding: 0 0 2rem 0;
      }
    }
  }
`
const InnerWrapper = styled.div`
  padding: 5% 15%;
  @media screen and (max-width: 767px) {
    padding: 25% 5% 72px;
  }
  @media screen and (max-width: 424px) {
    padding: 40px 5% 68px;
  }
`

const TermsAndCondition = () => {
  return (
    <TermsWrapper>
      <Banner heading={'Terms and conditions'} description={'Last updated on June 05 2022'} height={'484px'} />
      <InnerWrapper>
        <Container>
          <h2>General</h2>
          <p className="p-tag">1. Your use of our web site is conditional upon your full compliance with the terms and conditions shown below.</p>
          <p className="p-tag">2. In all cases, terms and conditions printed in relevant sale catalogues and in written contracts for sale shall take precedence over these terms and conditions.</p>
          <p className="p-tag">
            3. This web page (together with the documents, if any referred to on it) describes the terms and conditions on which you may use our site. It is our responsibility to read these terms carefully. By accessing and using our web site you
            expressly agree to be bound by these terms. We may at our sole discretion amend, revise or vary these terms at any time by updating this page. It is your responsibility to check this page regularly for such amendments, revisions or
            variations by which you shall be bound.
          </p>
          <h2>About us</h2>
          <p className="p-tag">
            4. This site is operated by Future Grail Pte. Ltd for and on behalf of itself, its parent company ASN Pte. Ltd and its other subsidiaries in Singapore. Future Grail Pte. Ltd is registered in Singapore under a Unique Entity Number
            202237565H and with its registered office at 428 River Valley Road, #02-01 Singapore 248327 ,
          </p>
          <h2>Accessing our site</h2>
          <p className="p-tag">5. We permit access to our site is on a discretionary basis and, for the avoidance of doubt, we reserve the right to withdraw or alter the service without any notice.</p>
          <p className="p-tag">
            6. You shall be responsible for making necessary arrangements including satisfying requirements we impose to have access to our site. You shall also be responsible for ensuring that all person(s) accessing the site through your Internet
            connection are aware of these terms and that they fully comply with them.
          </p>
          <p className="p-tag">
            7. If you are provided with a user ID, password or any other piece of information as part of our security procedures, you shall treat such information as strictly confidential and you shall not disclose it to any third party. You shall be
            responsible for any transactions undertaken by any third party where you have disclosed such information.
          </p>
          <h2>Your eligibility</h2>
          <p className="p-tag">
            8. Our website is not intended to be used by minors. By bidding for or buying articles through our web site you warrant that:
            <br /> (a) you are legally capable of entering into binding contracts; and
            <br />
            (b) you are at least 18 years old.
          </p>
          <h2>Intellectual Property</h2>
          <p className="p-tag">
            9. We fully own or licence the copyright in this site and in material(s) published on it (including descriptions and photographs of articles). Those works are protected by copyright laws, treaties and/or accords around the world. All our
            rights are reserved.
          </p>
          <p className="p-tag">
            10. You may print (1) one copy of any page(s) from our site strictly for your personal use or reference and may draw the attention of others within your establishment or organisation to material(s) posted. However, you are not at liberty
            to reproduce or permit anyone else to reproduce such material(s) without our prior written consent. Our status (or that of any identified contributors) as the authors of material(s) on this site should always be acknowledged.
          </p>
          <h2>{'Liability and reliance on site’s information'}</h2>
          <p className="p-tag">
            11. Information and other material(s) posted on our site are not intended to and do not constitute advice on which any reliance should be placed. We therefore disclaim all liability and responsibility arising from or in connection with
            any reliance placed by any visitor to the site or anyone who may be informed of any of its contents.
          </p>
          <p className="p-tag">
            {
              "12.	Our web site may contain inaccuracies, typographical or other errors. We are neither responsible nor liable for any such inaccuracies or errors. We do not make any express or implied warranties or representations in relation to the site and the same are hereby excluded. You acknowledge and accept that it is technically impossible or infeasible to provide use of the web site free of faults, bugs and errors and that access to the web site is provided on an 'as is' and 'as available' basis. We do not accept any liability for faults which may lead to unavailability, temporary or otherwise of the web site, irrespective of whether this is in our reasonable control."
            }
          </p>
          <p className="p-tag">13. Our liability in relation to any sale advertised on the site shall be in accordance with the relevant Conditions of Sale.</p>
          <p className="p-tag">14. We expect to regularly make changes to our site. We update our web site regularly and may change the content at any time. If necessary, we have the option to either suspend the site or to close it indefinitely.</p>
          <h2> Your information and use details </h2>
          <p className="p-tag">15. We shall process information about you in accordance with our privacy policy. You consent to such processing and you warrant that all data provided by you is accurate.</p>
          <h2>Transactions at our site</h2>
          <p className="p-tag">
            16. Contracts in relation to the sale of any Lots advertised on our web site are governed by the Conditions of Sale relating to such sale. These will be displayed during the electronic bidding process. Alternatively, they are available on
            request by contacting us at info@futuregrail.com .
          </p>
          <h2> Material(s) uploaded to our site</h2>
          <p className="p-tag">
            17. Whenever you utilise a feature that allows you to upload material(s) to our site or to establish contact with other user(s) of the site you shall comply with our content standard(s). You shall warrant that any such contribution
            complies with those standard(s) and you shall indemnify and hold harmless us for any breach of that warranty.
          </p>
          <h2>Links to our site</h2>
          <p className="p-tag">
            18. You may link to our site, provided you do so in a way that is fair and legal and, in a manner which does not damage or taint our reputation or take undue advantage of it. Specifically, you undertake not to establish a link in such a
            way as to suggest any form of association, approval or endorsement on our part where none exists. Our site must not be framed on any other site. We reserve the right to withdraw or revoke linking permission without notice.
          </p>
          <p className="p-tag">19. If you wish to make any use of material on our site other than that set out above, please address your request to info@futuregrail.com.</p>
          <h2>Links from our site</h2>
          <p className="p-tag">
            20. Our site contains links to various other sites and resources provided by third parties. These links are provided for your information only. We have no control over the contents of those sites or resources and do not under any
            circumstances accept responsibility for them or for any loss or damage that may be suffered resulting from your use of them.
          </p>
          <h2>Applicable law and dispute resolution</h2>
          <p className="p-tag">
            21. The laws of Singapore will apply to these terms and conditions. The courts of Singapore will have non-exclusive jurisdiction over any claim arising from or related to a visit to this web site although we reserve the right to bring
            claim(s) against you in your local jurisdiction or place of domicile. Notwithstanding that submission, and having regard to the best interests of the parties and of a speedy, economical and equitable resolution of the relevant dispute, we
            at our sole election may reasonably choose to refer any dispute relating to or in connection with these terms and conditions to be resolved by appropriate means of alternative dispute resolution (including arbitration in such a manner and
            place, mediation or referral to an expert). You shall accept our election of any means of alternative dispute resolution.
          </p>
          <p className="p-tag">22. Any dispute relating to any bid made by you or any contract resulting from acceptance of your bid in respect of any lot shall be governed by the Conditions of Sale applicable to the relevant sale.</p>
          <p className="p-tag">
            23. We make no representations that the content of our web site is suitable for any particular purpose or user or that the viewing and downloading of any part of our web site is legal or lawful in any country outside Singapore. If you
            have accessed the site from outside Singapore, then you are responsible for compliance with the laws of your jurisdiction.
          </p>
          <h2>Trade Marks</h2>
          <p className="p-tag">{"24.	'Future Grail' is our registered trademark. The Future Grail logo is also our registered trademark."}</p>
          <h2>Miscellaneous</h2>
          <p className="p-tag">
            25. In the event that any of these Conditions of Web Site Use are determined by any competent authority to be invalid, unlawful or unenforceable to any extent such term, condition or provision will to that extent be severed from the
            remaining terms, conditions and provisions which will continue to be valid to the fullest extent permitted by law.
          </p>
          <h2>Site security</h2>
          <p className="p-tag">26. You shall not use any mechanism, software or other device to affect or otherwise influence the functioning or operation of the web site or any sale advertised on the web site.</p>
          <p className="p-tag">27. You agree that you will not infect or cause to infect the web site with any virus, worms or other contaminants (including logic bombs, timebombs, cancelbots or trojan horses or by any other means).</p>
          <h2>Your queries</h2>
          <p className="p-tag">28. If you have any queries about material(s) which appears on our site please contact info@futuregrail.com</p>
          <h3>Thank you for visiting and/or using our site.</h3>
        </Container>
      </InnerWrapper>
      <Newsletter />
    </TermsWrapper>
  )
}

export default TermsAndCondition
