import Banner from '@apps/customer/components/bannerHeaderBackground/Banner'
import Newsletter from '@apps/customer/components/newletterSection/newsLetter'
import { Container } from '@apps/customer/styles/CommonStyles'
import React from 'react'
import styled from 'styled-components'
const PrivacyWrapper = styled.div`
  width: 100%;
  h2 {
    font-size: 3.2rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: normal;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }
  .p-tag {
    color: ${({ theme }) => theme.colors.fontGray};
    margin: 0 0 4rem 0;
    font-weight: 400;
    font-size: 1.8rem;
    line-height: 142.5%;
    letter-spacing: -0.015rem;
    max-width: 122.8rem;
  }
  @media screen and (max-width: 767px) {
    h2 {
      font-size: 2.75rem;
    }
    .p-tag{
      font-size: 1.75rem;
    }
  }
`
const InnerWrapper = styled.div`
  padding: 5% 15%;
  @media screen and (max-width: 767px) {
    padding: 25% 5%;
  }
`
const privacyPolicy = () => {
  return (
    <PrivacyWrapper>
      <Banner heading={'Privacy Policy'} description={'Please read these privacy policy carefully before using our service.'} height={'484px'}/>
      <InnerWrapper>
        <Container>
          <h2>Interpretation and Definitions</h2>
          <p className="p-tag">
            Interpretation <br />
            The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in the plural
          </p>
          <h2>Definitions</h2>
          <p className="p-tag">
            For the purposes of these terms and conditions :
            <br /> Affiliate means an entity that controls, is controlled by or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest or other Securities entitled to vote for election of
            directors or other managing authority. Account means a unique account created for you to access our service or parts of our service. Company (referred to as either “the company”, “we”, “us” or “our” in this agreement) refers to Ldn utd
            ltd, aston house, cornwall avenue,london n3 1lf.
          </p>
          <p className="p-tag">
            Country refers to: united kingdom <br />
            Device means any device that can access the service such as a computer, a cellphone or a digital tablet. Feedback means feedback, innovations or suggestions sent by you regarding the attributes, performance or features of our service.
            Promotions refer to contests, sweepstakes or other promotions offered through the service. Service refers to the website. Terms and conditions (also referred as “terms”) mean these terms and conditions that form the entire agreement
            between you and the company regarding the use of the service. Third-party social media service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or
            made Available by the service. Website refers to ldn utd, accessible from https://www.Ldnutd.Gg/you means the individual accessing or using the service, or the company, or other legal entity on behalf of which such individual is accessing
            or using the service, as applicable.
          </p>
          <h2>Acknowledgement</h2>
          <p className="p-tag">
            These are the terms and conditions governing the use of this service and the agreement that operates between you and the company. These terms and conditions set out the rights and Obligations of all users regarding the use of the service.
            Your access to and use of the service is conditioned on your acceptance of and compliance with these terms and conditions. These terms and conditions apply to all visitors, users and Others who access or use the service. By accessing or
            using the service you agree to be bound by these terms and conditions. If you disagree with any part of these terms and conditions then you may not access the service. You represent that you are over the age of 18. The company does not
            permit those under 18 to use the service. Your access to and use of the service is also conditioned on your acceptance of and compliance with the privacy policy of the company. Our privacy policy describes our policies and procedures on
            the collection, use and disclosure of your personal information when you use the application or the website and tells you about your privacy rights and how the law Protects you. Please read our privacy policy carefully before using our
            service.
          </p>
          <h2>Promotions</h2>
          <p className="p-tag">
            Any promotions made available through the service may be governed by rules that are separate from these terms. If you participate in any promotions, please review the applicable rules as well as our privacy policy. If the rules for a
            promotion conflict with these terms, the promotion rules will apply.
          </p>
          <h2>User accounts</h2>
          <p className="p-tag">
            When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the terms, which may Result in immediate termination of your account on our
            service. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password, whether your password is with our service
          </p>
          <h2>Third-party social media service</h2>
          <p className="p-tag">
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. You may not use as a username the name of another person or
            entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity Other than you without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
          </p>
          <h2>Intellectual property</h2>
          <p className="p-tag">
            The service and its original content (excluding content provided by you or other users), features and functionality are and will remain the exclusive property of the company and its Licensors. The service is protected by copyright,
            trademark, and other laws of both the country and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service Without the prior written consent of the company.
          </p>
          <h2>Your feedback to us</h2>
          <p className="p-tag">
            You assign all rights, title and interest in any feedback you provide the company. If for any reason such assignment is ineffective, you agree to grant the company a non-exclusive, Perpetual, irrevocable, royalty free, worldwide right and
            licence to use, reproduce, disclose, sub-licence, distribute, modify and exploit such feedback without restriction.
          </p>
          <h2>Links to other websites</h2>
          <p className="p-tag">
            Our service may contain links to third-party web sites or services that are not owned or controlled by the company. <br />The company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any
            third party web sites or services. You further acknowledge and Agree that the company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or
            reliance on any Such content, goods or services available on or through any such web sites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party Web sites or services that you visit.
          </p>
          <h2>Termination</h2>
          <p className="p-tag">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these terms and conditions. Upon termination, your right to use the service
            will cease immediately. If you wish to terminate your account, you may simply discontinue using the service.
          </p>

          <h2>“As is” and “as available” disclaimer</h2>
          <p className="p-tag">
            Notwithstanding any damages that you might incur, the entire liability of the company and any of its suppliers under any provision of this terms and your exclusive remedy for all of the Foregoing shall be limited to the amount actually
            paid by you through the service or 100 gbp if you haven’t purchased anything through the service. To the maximum extent permitted by applicable law, in no event shall the company or its suppliers be liable for any special, incidental,
            indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way
            related to The use of or inability to use the service, third-party software and/or third-party hardware used with the service, or otherwise in connection with any provision of this terms), even if the Company or any supplier has been
            advised of the possibility of such damages and even if the remedy fails of its essential purpose.Some states do not allow the exclusion of implied warranties or limitation of liability for incidental Or consequential damages, which means
            that some of the above limitations may not apply. In these states, each party’s liability will be limited to the greatest extent permitted by law.
          </p>
          <h2>Limitation of liability</h2>
          <p className="p-tag">
            The service is provided to you “as is” and “as available” and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its affiliates
            and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or Otherwise, with respect to the service, including all implied warranties of merchantability, fitness
            for a particular purpose, title and non-infringement, and warranties that may arise out of course Of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the company provides no warranty or
            undertaking, and makes no representation of any kind That the service will meet your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without
            interruption, Meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
          </p>
          <p className="p-tag">
            Without limiting the foregoing, neither the company nor any of the company’s provider makes any representation or warranty of any kind, express or implied: (I) as to the operation or Availability of the service, or the information,
            content, and materials or products included thereon; (ii) that the service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, Or currency of any information or content provided through the service; or (iv) that
            the service, its servers, the content, or e-mails sent from or on behalf of the company are free of viruses, Scripts, trojan horses, worms, malware, timebombs or other harmful components. Some jurisdictions do not allow the exclusion of
            certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations May not apply to you. But in such a case the exclusions and limitations set forth in this
            section shall be applied to the greatest extent enforceable under applicable law.
          </p>
          <h2>Governing law</h2>
          <p className="p-tag">
            The laws of the country, excluding its conflicts of law rules, shall govern this terms and your use of the service. Your use of the application may also be subject to other local, state, National, or international laws.
          </p>
          <h2>Disputes resolution</h2>
          <p className="p-tag">
            If you have any concern or dispute about the service, you agree to first try to resolve the dispute informally by contacting the company.For european union (eu) users If you are a uk or European union consumer, you will benefit from any
            mandatory provisions of the law of the country in which you are resident in. United states legal compliance You represent and warrant that (I) you are not located in a country that is subject to the united states government embargo, or
            that has been designated by the united states government asa “terrorist supporting” country, and (ii) you are not listed on any united states government list Of prohibited or restricted parties.
          </p>
          <h2>Severability and waiver</h2>
          <p className="p-tag">
            Severability <br />
            If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent Possible under applicable law and
            the remaining provisions will continue in full force and effect.
          </p>
          <h2>Waiver</h2>
          <p className="p-tag">
            Except as provided herein, the failure to exercise a right or to require performance of an obligation under this terms shall not effect a party’s ability to exercise such right or require such Performance at any time thereafter nor shall
            be the waiver of a breach constitute a waiver of any subsequent breach.
          </p>
          <h2>Translation interpretation</h2>
          <p className="p-tag">These terms and conditions may have been translated if we have made them available to you on our service. You agree that the original english text shall prevail in the case of a dispute.</p>
          <h2>Changes to these terms and conditions</h2>
          <p className="p-tag">
            We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days’ notice prior to Any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms,
            in whole or in part, please Stop using the website and the service.
          </p>
        </Container>
      </InnerWrapper>
      <Newsletter />
    </PrivacyWrapper>
  )
}

export default privacyPolicy
