export const rgba = (color: string, opacity: number) => {
    return `rgba(${hex2rgb(color).join()}, ${opacity})`
}

const hex2rgb = (hex: string) => {
    const r = parseInt(hex?.slice(1, 3), 16)
    const g = parseInt(hex?.slice(3, 5), 16)
    const b = parseInt(hex?.slice(5, 7), 16)
    // return {r, g, b} // return an object
    return [ r, g, b ]
}