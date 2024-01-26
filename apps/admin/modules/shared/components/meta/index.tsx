import Head from "next/head";
import { useSelector } from 'react-redux'
import { RootState } from '@apps/admin/redux/store'

const Meta = (props: any) => {
    const themeData = useSelector<RootState, any>((state) => state?.app?.themeDataFromStore)
    const preferanceData = useSelector<RootState, any>((state) => state?.app?.preferanceData)
    return (
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

            {preferanceData?.meta_title && <title key="title">{preferanceData?.meta_title} | Admin</title>}
            {preferanceData?.meta_description && <meta key="description" name="description" content={preferanceData.meta_description} />}

            <meta property="og:type" content="website" />
            {preferanceData?.meta_title && <meta name="og:title" property="og:title" content={preferanceData?.meta_title} />}
            {preferanceData?.meta_description && <meta name="og:description" property="og:description" content={preferanceData.meta_description} />}

            {preferanceData?.meta_title && <meta itemProp="name" content={preferanceData?.meta_title} />}
            {preferanceData?.meta_description && <meta itemProp="description" content={preferanceData.meta_description} />}

            {/* Title */}
            <title>FUTUREGRAIL</title>
            {/* site favIcon */}
            <link rel="icon" href={'/images/admin/logo.png'} />
        </Head>
    );
};

export default Meta;