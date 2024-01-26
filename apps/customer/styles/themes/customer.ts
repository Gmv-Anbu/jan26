import { rgba } from "../utils/mixins";

const themeRoot = {
    white: '#FFFFFF', // 150 +

    mainBG: "#050D1C", // 18     main - background
    greyBG:"#F9F9F9", // light grey background
    fontdark: '#72809C', // 48      font - dark
    fontprimary: '#FFFFFF', // 34          light - font
    
    // secondary: "#101624", // 16         card - background
    descFont: '#B4B6BA', // 22      desc  - font (medium)
    bordersecondary: '#242A3C', // 9   primary - btn
    buttoncolor: '#6868f4', // 17
    modelContentColor: '#0b162a',
    cardShadow: '#0f7ca2',
    activeBeforeColor: '#2B3952',

    black: '#000000', // 3
    danger: '#FF0000', // 2,
    borderColor: '#242A3C',

    //ASN
    primary: "#0E1818",
    secondary: "#2A7575",
    fontGray: "#848A8B",
    fontDarkGray: "#4E4E4E",
    primaryFontGrey:`#7C7C7C`,
    secondaryFontGrey:`#8B8B8B`,
    offWhiteFont:"DADDDD",
    fonts: {
        primary: `'proxima_novaregular', sans-serif`
    }
}

export const getDefaultTheme = (root, fontStyle) => {
    root = themeRoot
    return {
        colors: {
            // solid colors
            white: root.fontprimary, // 100 +
            fontdark: root.fontdark, // 48
            fontprimary: root.fontprimary, // 34
            mainBG: root.mainBG, // 18
            // secondary: root.secondary, // 16
            buttoncolor: rgba(root.buttoncolor, 0.6), // 17
            fontcolor: rgba(root.fontprimary, 0.99),   // 7   
            borderprimary: rgba(root.bordersecondary, 0.7), // 5
            primaryButton: rgba(root.bordersecondary, 0.95), // 5
            bordersecondary: root.bordersecondary, // 4
            fonttitle: rgba(root.fontdark, 0.85), // 2
            danger: root.danger, // 2
            textInput: rgba(root.descFont, 0.55), // 2
            headingInfo: root.fontdark, // 3
            black: root.black, // 3
            pink: root.fontdark, // 4
            secondaryButton: root.bordersecondary, // 1
            selectBg: rgba(root.buttoncolor, 0.2), // 3
            coolGrey: rgba(root.descFont, 0.55), // 7
            borderColor: rgba(root.bordersecondary, 0.85), // 19
            optionActive: root.buttoncolor, // 2
            footerLinks: root.fontdark, // 4
            whiteSand: rgba(root.fontprimary, 0.99), // 4
            color999: rgba(root.descFont, 0.7), // 1
            color781: rgba(root.fontdark, 0.75), // 1
            color6C6: rgba(root.descFont, 0.8), // 1
            colorD2: root.descFont, // 3
            artWorkText: root.fontprimary, // 10
            tabBorderBot: root.modelContentColor, // 6
            tabInfo: root.fontdark, // 1
            cardShadow: root.cardShadow, // 6
            clipboardSpan: rgba(root.fontdark, 0.92), // 1
            addFundLinkColor: rgba(root.cardShadow, 0.75), // niu 
            colorB0B: root.descFont, // niu 
            colorRed: root.danger, // niu 
            inputCheckboxbg: root.fontprimary, // niu 
            currentBidsColor: root.descFont, // 15
            depositFlexColor: root.danger, // 3
            infoContainerColor: rgba(root.fontprimary, 0.8), // 4
            endingColor: root.descFont, // 3
            timeFlexSpanBold: rgba(root.fontdark, 0.87), // 1
            profilehrefColor: rgba(root.fontprimary, 0.65), // niu
            tabcontentActivitybg: root.secondary, // 1
            flexBodyRowFlexbg: root.mainBG, // 1
            transparent: 'transparent',
            profileOptionsbg: root.modelContentColor, // 2
            bidsBg: root.secondary, // 3
            flexContainerBg: root.secondary, // 1
            countFlexColor: rgba(root.cardShadow, 0.37), // 2
            typeRadioColor: rgba(root.cardShadow, 0.55), // 2
            iconContainerColor: root.fontprimary, // 1
            bidsColor: root.activeBeforeColor, // 1
            bidsShadowColor: rgba(root.buttoncolor, 0.7), // 1
            web3Color: root.fontprimary, // niu
            navBorderBottom: root.mainBG, // 2
            ccwrappercolor: rgba(root.fontdark, 0.47), // 1
            modelContentColor: root.modelContentColor, // 6
            tabLinksColor: rgba(root.cardShadow, 0.3), // 1
            activeBeforeColor: root.activeBeforeColor, // 1
            transferColor: root.fontprimary, // 1
            copyTextToColor: rgba(root.activeBeforeColor, 0.79), // 1
            infoColor: root.fontprimary, // 1
            dismissBtnColor: rgba(root.activeBeforeColor, 0.95), // 2
            datePickerColor: root.modelContentColor, // 1
            dayNameColor: root.fontprimary, // 2
            filterTabHoverActive: 'FilterTabLink', // niu
            radioButtonBorderColor: rgba(root.bordersecondary, 0.85),

            //ASN colors
            primary: root.primary,
            secondary: root.secondary,
            fontGray: root.fontGray,
            fontDarkGray: root.fontDarkGray,
            secondaryFontGrey:root.secondaryFontGrey,
            primaryFontGrey:root.primaryFontGrey,
            offWhiteFont:root.offWhiteFont,
            // rgba colors
            uploadArtColor: rgba(root.fontdark, 0.4), // 2
            navHeaderColor: rgba(root.black, 0.25), // 1
            iconShadowColor: rgba(root.black, 0.11), // 1
            uploadArtworkBg: rgba(root.fontdark, 0.6), // 2 
            shareBtnBg: rgba(root.fontprimary, 0.1), // 1
            shareBtnBorder: rgba(root.fontdark, 0.48), // 7
            walletTypeImg: rgba(root.fontprimary, 0.03), // niu
            copyFromClipboardbg: rgba(root.fontprimary, 0.04), // 3
            web3ModalColor: root.fontdark, // 1
            footerBoderBottom: rgba(root.bordersecondary, 0.57), // 1
            providerColor: rgba(root.black, 0.75), // box shadow - 1
            filterCardShadow: rgba(root.buttoncolor, 0.1), // 1
            supporterbg: rgba(root.bordersecondary, 0.68), // 1
            imageWrapperbg: rgba(root.fontprimary, 0.32), // 1
            transition: root.fontprimary, // niu
            cardBorderColor: rgba(root.fontprimary, 0.18), // 1
            singleOptionbg: rgba(root.bordersecondary, 0.57), // 4
            rowFlexShadow: root.mainBG, // box shadow - 1
            cardContainerColor: rgba(root.fontprimary, 0.18), // 4
            buttonBidbg: rgba(root.fontdark, 0.29), // 1
            modalProviderName: 'rgb(12, 12, 13)', // niu - 1
            filterColor: 'rgba( 9, 18, 35, 0.25 )', // niu - 1

            // linear gradient & radial gradient
            tabLinksAfter: 'linear-gradient(to right, #0aadeb , #bb20c1)', // 1
            auctionBoxbg: 'linear-gradient(232.46deg, rgba(101, 108, 132, 0.35) 19.1%, rgba(71, 77, 97, 0) 119.27%)', // 4
            linearGradient1: 'linear-gradient(-90deg, #272d3f 60%, #0f1525 100%)', // 1/2
            linearGradient2: 'linear-gradient(-20deg, #0f7ca2 0, #2d364c 20%, #2d364c 70%, #c71dc3 100%)', // 1/2
            avatarBg: 'linear-gradient(232.46deg, rgba(168, 169, 175, 0.35) 19.1%, rgba(141, 144, 152, 0) 119.27%)', // 5
            nftDetailsImgCover: 'linear-gradient(232.46deg, rgba(101, 108, 132, 0.15) 19.1%, rgba(71, 77, 97, 0) 119.27%)', // 1
            checkboxbg: ' radial-gradient( circle,rgb(5 206 247) 27%,#17637a 93% )', // niu - 0
            produtDetailbg1: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))', // niu - 0
            produtDetailbg2: 'linear-gradient(0deg, rgba(120, 108, 133, 0.37), rgba(120, 108, 133, 0.37))', // niu - 0
            gradientLayer: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
            gradientBtnBG: root?.gradientBtnBG || `linear-gradient(90.12deg, #00b7e9 0.1%, #c91cc3 99.88%, #c81cc5 99.89%, #da3794 99.89%)`,
            boxLeftBorderColor: root?.boxLeftBorderColor || 'rgba(0, 183, 233, 1)',
            boxRightBorderColor: root?.boxRightBorderColor || 'rgba(218, 55, 148, 1)',

            // admin
            headerAnchor: '#aeb1b6',
            loginHeader: '#323b4b',
            loginSubHeader: '#8a94a6',
            langSelectBg: 'rgba(246, 248, 250, 0.3)',
            langSelectColor: 'rgba(119, 136, 153, 0.4)',
            inputBorder: 'rgb(135, 206, 250)',
            btnPrimary: 'rgba(30, 144, 255, 0.8)',
            linkAnchor: 'rgba(119, 136, 153, 0.8)',
            verifyInputBorder: '#808080',
            navLinkHover: '#eef1f5',
            linkHover: '#4d46d0',
            web3Modalbg: "#233048"
        },
        fontsFamily: {
            // primary: fontStyle?.primary,
            primary: root.fonts?.primary,
            secondary: fontStyle?.secondary,
        },
        fontSizes: {
            xsm: "1rem",
            sm: "1.4rem",
            md: "1.6rem",
            lg: "2.4rem"
        },
        buttonSizes: {
            sm: '10rem',
            md: '14rem',
            lg: '20rem'
        }
    }
}

// niu - not in use