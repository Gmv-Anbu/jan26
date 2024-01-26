
interface IUserRole{
    CREATOR: string
    USER: string
}
interface IProfileTab{
    COLLECTED: string
    CREATED: string
    FAVORITE: string
    ON_SALES: string
    ACTIVITY: string
}
interface IServiceType {
    VALUATION_SERVICES:string,
    INSURANCE:string, 
    CUSTODIAN_SERVICES:string, 
    DIGITIZATION:string,
    DISPLAY_EVENTS: string,
    AUCTION_SERVICES: string,
    FRACTION_SERVICES:string, 
    BONDED_WAREHOUSE:string,
    ADVISORY:string,
    NO_DECLARATION:string,
    OVERSEAS:string,
    MALCA:string,
    VIP_PVT:string,
    GET_A_QUOTE:string,
    BUY: string,
    SELL: string,
    PRIVATE_SALES: string,
    MODEL: string,
    FIXED: string,
    FRACTION: string,
    TAX_FREE: string,
    VAULT: string
}

export const USER_ROLE: IUserRole ={
    CREATOR: "creator",
    USER: "user"
}
export const PROFILE_TAB: IProfileTab ={
    COLLECTED: "collected",
    CREATED: "created",
    FAVORITE: "favorite",
    ON_SALES: "onSales",
    ACTIVITY: "activity"
}
export const SERVICE: IServiceType = {
    VALUATION_SERVICES: "Our deposit valuation services provide precise, current assessments. Our expert appraisals account for factors like brand, model, condition, rarity, age, provenance, and comparable records. Trust us to protect your assets for generations.",
    INSURANCE: "FutureGrail provides watch insurance services featuring global coverage for Singapore residents. Our policies include free valuations and coverage for loss or accidental damage. Ensure peace of mind by insuring your watches with FutureGrail, knowing they are fully protected.",
    CUSTODIAN_SERVICES: "Watch valuation is crucial for asset-backed financing. Maximize your alternative assets' value with our reliable appraisals. Our assessments empower you to confidently leverage your watch collection for loans and financing opportunities.",
    DIGITIZATION: "Efficient valuation is vital for managing watch collections successfully. Our services include inventory tracking, annual appraisals, and expert advice, guaranteeing precise and current values.",
    DISPLAY_EVENTS: "Our authentication services provide peace of mind for modern, vintage, and historical watches. With our team of experts, including historians and in-house watchmakers, we possess extensive knowledge dating back to pieces from the early 1600s onwards.",
    AUCTION_SERVICES: "Our authentication services offer a comprehensive study, condition and grading report for your watches. Our detailed pictures of the dial, case, movement, and key components ensure a thorough understanding of authenticity, condition, and value.",
    FRACTION_SERVICES: "Succession planning and asset allocation to heirs can be tedious especially with regards to deposited goods in vaults all over the world. This is why Future Grail provides will executing services embedded with fractionalisation in the event the rights of the watch need to be distributed amongst multiple heirs.",
    BONDED_WAREHOUSE:"Tax advantages.",
    ADVISORY:"Digitize your collection with us to receive physical and digital proof of ownership. Display your watches in your digital wallet and trade globally using our proprietary platform and process.",
    NO_DECLARATION:"Transform your watch collection into fractionalized assets with our digitization services. By removing entry barriers and promoting market equality, we enable everyone to own a share of the finest and rarest timepieces. Plus, enjoy the option to sell and create liquidity for high-value watches.",
    OVERSEAS:"Digitization simplifies succession planning, allowing for fair distribution of watches among heirs, preventing disputes, and ensuring smooth wealth transfer. Unlock your collection's full potential. We collaborate with trusts, family offices, and financial institutions to optimize your watch assets' value.",
    MALCA:"Experience our cutting-edge digitization service, turning your collection into a dynamic asset. Our collector-focused platform offers easy website-to-wallet access. For advanced asset management, benefit from our 3D scanning and NFT services.",
    VIP_PVT:"At FutureGrail, we offer personalized curation and investment advice for luxury timepieces. Our team of experts assists in sourcing, managing, and expanding collections, serving as trusted advisors to guide you on your watch collecting journey. Our goal is to help you build a resilient collection, make informed decisions, and mitigate risks.",
    GET_A_QUOTE:"In partnership with Malca Amit, we provide secure deposit boxes controlled by a dual-key system, ensuring only authorized personnel access your valuable assets. Our proprietary blockchain technology offers provable ownership and long-lasting service. With a commitment to excellence and exceptional customer service, we are the go-to choice for reliable and trustworthy watch custody.",
    BUY:"FutureGrail offers a variety of methods for purchasing watches, including Fixed Price Items, Traditional Auctions, Fractional Auctions, Private Sales, and sourcing upon special request. These transactions can be conducted through our online platform or in person at our Singapore facility. Each watch we provide adheres to our strict criteria for quality, authenticity, rarity, and collectability. At FutureGrail, we are dedicated to ensuring a hassle-free and trustworthy experience for clients looking to buy and trade their valuable timepieces.",
    SELL:"FutureGrail provides a consignment service for clients looking to sell their watches. We ensure each timepiece meets our standards for quality, authenticity, rarity, collectability, and market demand. As trusted advisors, we guide clients in choosing the optimal time to sell, maximizing value. Our expertise and extensive network of collectors guarantee a smooth, hassle-free process for selling watches on consignment.",
    PRIVATE_SALES:"FutureGrail's private sales cater to discerning collectors seeking confidential arrangements for selling high-end watches. Held quarterly, these exclusive events are accessible only to select VIP clients. Our tailored approach to each sale prioritizes the buyer's and seller's needs while maintaining confidentiality and discretion. By utilizing our expertise and vast collector network, we enable seamless, secure transactions and optimal outcomes for clients' valuable timepieces.",
    MODEL:"FutureGrail Auctions sets itself apart from other auction platforms through its unique fee structure. We charge a modest 5% fee for first-time sellers and a 5% buyer premium, making our platform more cost-effective for both buyers and sellers. Additionally, we offer an exclusive benefit to sellers by waiving their premium fee if the same watch is resold on our platform or through private sales facilitated by our company. This incentive encourages sellers to maintain a long-term relationship with FutureGrail, as they can enjoy fee-free reselling, aligning with our core value of equality.",
    FIXED:"FutureGrail's Standard Auctions, conducted quarterly, offer a meticulously curated catalog of the finest timepieces for discerning collectors and enthusiasts. Our Buyers and Sellers Premium is capped at 5%, with the seller's 5% premium waived if the same watch is auctioned off again on our platform. To participate, users must have a registered account with FutureGrail, ensuring a seamless and secure auction experience.",
    FRACTION:"FutureGrail introduces fractionalized bidding for high-value timepieces, allowing buyers to invest in a portion of an item, making it a more accessible and flexible option. We ensure transparency and security by using blockchain and NFTs for digital proof of ownership and provenance tracking. Fractionalized bidding expands market reach, lowers entry barriers, and provides greater liquidity for buyers. We accept various payment forms, including cryptocurrency, for added convenience. This innovation highlights our dedication to providing cutting-edge solutions in the alternative asset investment market.",
    TAX_FREE:"FutureGrail's facility is uniquely positioned in the heart of Singapore, offering accessibility and a beautiful VIP lounge where clients can view their assets and share the experience with friends and family. The facility is bonded and tax-free, ensuring that clients' assets are held in a secure and safe environment. Being bonded and tax-free means that the assets stored in the facility are exempt from import duties and other taxes, providing additional cost savings for clients. FutureGrail's facility is an ideal location for storing high-value items, such as watches, and provides a comprehensive solution for those seeking a secure storage option in a convenient location. With its top-notch security, accessibility, and luxurious amenities, FutureGrail's facility sets the standard for high-end storage options.",
    VAULT:"FutureGrail offers a secure vault service that provides safety deposit boxes in small, medium, and large sizes under 24-hour surveillance. This service is optimal for storing high-value items such as watches, giving owners peace of mind that their assets are protected in a highly secure facility. Additionally, FutureGrail' vault services offer the freedom to access and showcase your assets in their facility, even featuring them in their gallery. With a focus on top-notch security and convenience, FutureGrail' vault services provide a comprehensive solution for those seeking a reliable and safe storage option for their valuable possessions.",
}

