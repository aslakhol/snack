export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of Category.',
    },
  ],
  preview: {
    select: {title: 'name'},
  },
}
