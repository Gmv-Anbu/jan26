import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import MarketService from '../api/customer/MarketService'

interface Props {
  data: {
    meta_title?: string
    meta_description?: string
    google_analytics?: string
  }
}

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    const getFieldValue = (data, key) => {
      const field = data.find((item: { preferanceKey: string }) => item.preferanceKey == key)
      if (field) {
        return field.preferanceValue
      }
      return ''
    }

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        data: ctx?.store?.getState()?.app?.preferenceData,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { data } = this.props
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${data?.google_analytics}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${data?.google_analytics}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* Meta Pixel Code  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '2011425052531826');
                fbq('track', 'PageView');
          `,
            }}
          />
          <noscript><img height="1" width="1" style={{ display: "none" }} 
            src="https://www.facebook.com/tr?id=2011425052531826&ev=PageView&noscript=1"/>
          </noscript>
          {/* End Meta Pixel Code */}
          <meta name={data?.meta_title} content={data?.meta_description} />
          {/* Rapyd Code */}
          {/* <script src="https://checkouttoolkit.rapyd.net"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              setTimeout(() => {
                window.onload = function () {
                  let checkout = new RapydCheckoutToolkit({
                      pay_button_text: "Click to pay",
                      pay_button_color: "blue",
                      id: "checkout_9ebe58dcb9d75e8f972a35350f96c2fa"
                  });
                  checkout.displayCheckout();
                  }
                  window.addEventListener('onCheckoutPaymentSuccess', function (event) {
                      console.log(event.detail)
                  });
                  window.addEventListener('onCheckoutPaymentFailure', function (event) {
                      console.log(event.detail.error)
                  });
              }, 5000)
          `,
            }}
          /> */}
        </Head>
        <body>
          <div id="overlay"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
