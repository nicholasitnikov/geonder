
export default class Layer {

  static hierarchies = [
    ['states', 'provinces', 'settlements'],
    ['oceans', 'seas']
  ]

  static getLayerBySlug = (slug) => {
    return this.defaultTypes.filter((f) => f.slug === slug)[0]
  }

  static getLayerById = (id) => {
    return this.defaultTypes.filter((f) => id.indexOf(f.dbPrefix) > -1)[0]
  }

  static defaultTypes = [

    new Layer({
      name: 'Океаны',
      prefix: 'Океаны',
      types: ['oceans'],
      slug: 'oceans',
      single: 'Океан',
      dbPrefix: 'Океаны_',
      isDefault: true,
      children: ['seas']
    }),

    new Layer({
      name: 'Моря',
      prefix: 'Моря',
      types: ['seas'],
      slug: 'seas',
      single: 'Море',
      dbPrefix: 'Моря_',
      isDefault: true,
      children: []
    }),

    new Layer({
      name: 'Государства',
      prefix: 'State',
      types: ['states'],
      slug: 'states',
      single: 'Государство',
      dbPrefix: 'State_',
      isDefault: true,
      selected: true,
      children: ['provinces']
    }),

    new Layer({
      name: 'Провинции',
      prefix: 'Prov',
      types: ['provinces'],
      slug: 'provinces',
      single: 'Провинция',
      dbPrefix: 'Prov_',
      isDefault: true,
      children: ['settlements']
    }),

    new Layer({
      name: 'Населёные пункты',
      prefix: 'City',
      types: ['settlements'],
      slug: 'settlements',
      dbPrefix: 'City_',
      single: '',
      isDefault: true,
      children: []
    })

  ]

  static allLayersIsDefault = (layers) => {

    return layers.filter((i) => i.isDefault).length === layers.length

  }

  static firstUndefaultLayer = (layers) => {

    return layers.filter((i) => !i.isDefault)[0]

  }

  constructor(options, isItem) {

    this.name = options.name

    if(isItem) {
      this.id = options.uniqueId
      Layer.defaultTypes.map((item) => {
        if(this.id.indexOf(item.prefix) > -1) {
          this.types = item.types
          this.slug = item.slug
          this.single = item.single
          this.dbPrefix = item.dbPrefix
          this.children = item.children
          this.min_x = options.min_x
          this.min_y = options.min_y
          this.max_x = options.max_x
          this.max_y = options.max_y
          this.lat = options.lat
          this.lng = options.lng
        }
      })

    } else {

      this.types = options.types
      this.children = options.children
      this.prefix = options.prefix
      this.dbPrefix = options.dbPrefix
      this.slug = options.slug
      this.single = options.single
      this.isDefault = options.isDefault
      this.selected = options.selected

    }

  }

}
