import ArtworkInputFile from './artworkInputFile'
import ImageUploader from './ImageUploader'
import InputSelect from './inputSelect'

export default {
    title: 'Form Inputs',
}

var imgSrc = '/images/shared/user-placeholder.png?w=34'

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