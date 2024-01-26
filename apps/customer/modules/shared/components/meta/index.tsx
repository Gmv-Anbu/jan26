import Head from "next/head";
import { useSelector } from 'react-redux';
import { RootState } from '@apps/customer/redux/store';
import { useRouter } from 'next/router'

const Meta = () => {

    const ThemeConfiguration = useSelector<RootState, any>((state) => state?.app?.themeData);
    const preferenceData = useSelector<RootState, any>((state) => state?.app?.preferenceData)
    const favIcon = ThemeConfiguration?.setting?.favIcon
    const fontUrls = ThemeConfiguration?.setting?.typography || null
    const router = useRouter()

    const getTitle = () => {
        const title = router.asPath === '/' ? 'home' : router.asPath.replace(`/base/`, '').split('?')[0].split('/')[0]
        const camelCaseTitle = title.charAt(0).toUpperCase() + title.slice(1);
        return camelCaseTitle
    }

    return (
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

            {preferenceData?.meta_title && <title key="title">{preferenceData?.meta_title} | {getTitle()}</title>}
            {preferenceData?.meta_description && <meta key="description" name="description" content={preferenceData.meta_description} />}

            <meta property="og:type" content="website" />
            {preferenceData?.meta_title && <meta name="og:title" property="og:title" content={preferenceData?.meta_title} />}
            {preferenceData?.meta_description && <meta name="og:description" property="og:description" content={preferenceData.meta_description} />}

            {preferenceData?.meta_title && <meta itemProp="name" content={preferenceData?.meta_title} />}
            {preferenceData?.meta_description && <meta itemProp="description" content={preferenceData.meta_description} />}
            {/* Title */}
            <title>FUTUREGRAIL</title>
            {/* site favIcon */}
            <link rel="icon" href={'/images/customer/favicon/logo.png'} />

            {/* google fonts */}
            {fontUrls?.primaryUrl && <link rel="stylesheet" href={fontUrls?.primaryUrl}></link>}
            {fontUrls?.secondaryUrl && <link rel="stylesheet" href={fontUrls?.secondaryUrl}></link>}
        </Head>
    );
};

export default Meta;