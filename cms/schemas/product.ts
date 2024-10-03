import {defineField} from 'sanity'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  initialValue: {available: true},
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 10,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\b[a-z]{1,2}\b/g, '')
            .replace(/\d+/g, '')
            .replace(',', '')
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 20),
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'number',
      description: 'Cost per unit, excluding pant',
    },
    {
      name: 'pant',
      title: 'Pant',
      type: 'number',
    },
    defineField({
      name: 'profit',
      title: 'Profit',
      type: 'computedString',
      description: 'Profit per unit = price - cost - pant, % = profit / (cost + pant)',
      readOnly: true,
      options: {
        buttonText: 'Calculate',
        documentQuerySelection: `
        "product": *[_type == "product" && _id == ^._id] {
          cost, pant, price
      }[0]
        `,
        reduceQueryResult: (result: {
          draft?: {product: {cost: number | null; pant: number | null; price: number | null}}
          published: {product: {cost: number | null; pant: number | null; price: number | null}}
        }) => {
          const cost = result.draft?.product.cost ?? result.published.product.cost ?? 0
          const pant = result.draft?.product.pant ?? result.published.product.pant ?? 0
          const price = result.draft?.product.price ?? result.published.product.price ?? 0

          const profit = price - cost - pant
          const profitPercentage = (profit / (cost + pant)) * 100

          return `${profit.toFixed(2)} per unit - ${profitPercentage.toFixed(2)}%`
        },
      },
    }),
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
  orderings: [
    {
      title: 'Available, A-Z',
      name: 'availableName',
      by: [
        {field: 'available', direction: 'desc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {name: 'name', price: 'price', available: 'available', media: 'image'},
    prepare(selection: {name: string; price: number; available: boolean; media: unknown}) {
      const {name, price, available, media} = selection

      return {
        title: name,
        subtitle: `${price} kr - ${available ? '❎' : '🔴'}`,
        media,
      }
    },
  },
}
