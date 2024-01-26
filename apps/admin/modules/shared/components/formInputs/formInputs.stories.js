import ArtworkInputFile from './artworkInputFile'
import ImageUploader from './ImageUploader'
import InputSelect from './inputSelect'

export default {
    title: 'Form Inputs',
}

var imgSrc = 'https://images.unsplash.com/photo-1651654325764-205a848bbea0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'

export const FormInputSelect = () => <InputSelect label={`Set price`} />

export const FormImageUploader = () => <ImageUploader label="Upload your profile picture" />

// export const FormArtworkInputFile = () => <ArtworkInputFile label={`Upload your Art work`} />

const Template = args => <ArtworkInputFile {...args} />

export const FormArtworkInputFile = Template.bind({})
FormArtworkInputFile.args = {
    label: `Upload your Art work`,
    value: imgSrc,
    onChange: (e) => {
        const { files } = e?.target
        const [file] = files
        imgSrc = URL.createObjectURL(file)
    }
}