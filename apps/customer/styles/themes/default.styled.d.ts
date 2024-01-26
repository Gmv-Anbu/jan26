// import original module declarations
import { StringifyOptions } from 'querystring';
import 'styled-components';

interface fontFamilyProps {
    primary: string;
    secondary: string;
}

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            offWhiteFont?:string,
            primaryFontGrey?: string;
            secondaryFontGrey?: string;
            mainBG: string;
            secondary: string;
            fontcolor: string;
            fontprimary: string;
            fontdark: string;
            fonttitle: string;
            textInput: string;
            buttoncolor: string;
            borderprimary: string;
            gradientBtnBG: string;
            bordersecondary: string;
            danger: string;
            headingInfo: string;
            white: string;
            black: string;
            pink: string;
            primaryButton: string;
            secondaryButton: string;
            selectBg: string;
            coolGrey: string;
            borderColor: string;
            optionActive: string;
            footerLinks: string;
            whiteSand: string;
            color999: string;
            color781: string;
            color6C6: string;
            colorD2: string;
            uploadArtworkBg: string;
            artWorkText: string;
            tabBorderBot: string;
            tabInfo: string;
            shareBtnBg: string;
            shareBtnBorder: string;
            cardShadow: string;
            walletTypeImg: string;
            copyFromClipboardbg: string;
            clipboardSpan: string;
            addFundLinkColor: string;
            colorB0B: string;
            colorRed: string;
            inputCheckboxbg: string;
            currentBidsColor: string;
            depositFlexColor: string;
            infoContainerColor: string;
            endingColor: string;
            timeFlexSpanBold: string;
            profilehrefColor: string;
            tabcontentActivitybg: string;
            flexBodyRowFlexbg: string;
            filterTabHoverActive: string;
            transparent: string;
            linearGradient1: string;
            linearGradient2: string;
            profileOptionsbg: string;
            auctionBoxbg: string;
            supporterbg: string;
            produtDetailbg1: string;
            produtDetailbg2: string;
            imageWrapperbg: string;
            web3Modalbg: string;
            transition: string;
            cardBorderColor: string;
            singleOptionbg: string;
            buttonBidbg: string;
            checkboxbg: string;
            tabLinksAfter: string;
            bidsBg: string;
            flexContainerBg: string;
            rowFlexShadow: string;
            countFlexColor: string;
            typeRadioColor: string;
            iconContainerColor: string;
            iconShadowColor: string;
            cardContainerColor: string;
            bidsColor: string;
            bidsShadowColor: string;
            web3ModalColor: string;
            modalProviderName: string;
            web3Color: string;
            navHeaderColor: string;
            navBorderBottom: string;
            footerBoderBottom: string;
            providerColor: string;
            ccwrappercolor: string;
            modelContentColor: string;
            tabLinksColor: string;
            activeBeforeColor: string;
            transferColor: string;
            copyTextToColor: string;
            infoColor: string;
            dismissBtnColor: string;
            uploadArtColor: string;
            datePickerColor: string;
            dayNameColor: string;
            filterColor: string;
            filterCardShadow: string;
            avatarBg: string;
            nftDetailsImgCover: string;
            gradientLayer: string;
            radioButtonBorderColor: string;
            boxLeftBorderColor: string;
            boxRightBorderColor: string;
            // admin
            headerAnchor: string;
            loginHeader: string;
            loginSubHeader: string;
            langSelectBg: string;
            langSelectColor: string;
            inputBorder: string;
            btnPrimary: string;
            linkAnchor: string;
            verifyInputBorder: string;
            navLinkHover: string,
            linkHover: string,
            primary?: string,
            fontGray?: string
            fontDarkGray?: string
        };

        fontsFamily: fontFamilyProps
        fontSizes: {
            xsm: string;
            sm: string;
            md: string;
            lg: string;
        },
        buttonSizes: {
            [sm: string]: string;
            [md: string]: string;
            [lg: string]: string;
        }
    }
}