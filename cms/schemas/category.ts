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
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description:
        'Number decides the order of categories both in category bar and in the product list.',
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'sortOrder'},
  },
}
