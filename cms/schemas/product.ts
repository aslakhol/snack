export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  initialValue: {available: true, category: {_ref: 'b823d00d-52e4-4835-8ea0-603d98e0aece'}},
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hotspot: true,
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Is this product currently available for purchase?',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'price'},
  },
}
