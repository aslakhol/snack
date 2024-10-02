import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {sanityComputedField} from 'sanity-plugin-computed-field'

export default defineConfig({
  name: 'default',
  title: 'snack',

  projectId: 'mzejrfn3',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), sanityComputedField()],

  schema: {
    types: schemaTypes,
  },
})
