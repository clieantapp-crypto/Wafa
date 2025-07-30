export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "مياه طبيعية" | "مياه فوارة"
  size: string
}

export const products: Product[] = [
  {
    id: "prod_01",
    name: "مياه الواحة النقية",
    description: "نقاء مطلق من ينابيع محمية.",
    price: 2.5,
    image: "/product-1.png",
    category: "مياه طبيعية",
    size: "500 مل",
  },
  {
    id: "prod_02",
    name: "نجمة الصحراء الفوارة",
    description: "فقاعات منعشة تروي عطشك.",
    price: 3.75,
    image: "/product-2.png",
    category: "مياه فوارة",
    size: "750 مل",
  },
  {
    id: "prod_03",
    name: "كنز العائلة",
    description: "حجم كبير مثالي للمشاركة.",
    price: 7.0,
    image: "/product-3.png",
    category: "مياه طبيعية",
    size: "5 لتر",
  },
  {
    id: "prod_04",
    name: "نقاء الحياة",
    description: "عبوة زجاجية فاخرة.",
    price: 4.0,
    image: "/product-4.png",
    category: "مياه طبيعية",
    size: "1 لتر",
  },
  {
    id: "prod_05",
    name: "همس الينابيع الفوار",
    description: "مياه فوارة مع لمسة من الحمضيات.",
    price: 4.25,
    image: "/product-5.png",
    category: "مياه فوارة",
    size: "750 مل",
  },
  {
    id: "prod_06",
    name: "عبوة رياضية",
    description: "سهلة الحمل أثناء التنقل.",
    price: 2.0,
    image: "/product-6.png",
    category: "مياه طبيعية",
    size: "600 مل",
  },
]
