export interface CarouselItem {
  id: number;
  name: string;
  description: string;
  image: string;
}


const homeList: CarouselItem[] = [
    {
    id: 1,
    name: "Honey Garlic",
    description: "Brushed with a sweet, soy-based sauce, these are light on heat and heavy on flavor.",
    image: "./HoneyGarlic.png",

    },
    {
    id: 2,
    name: "Soy Garlic",
    description: "Served in a savory sauce with a mild tang of garlic.",
    image: "./SoyGarlic.png",

    },
    {
    id: 3,
    name: "Hot Mala",
    description: "Inspired by Chinese mala seasoning, this flavor is very sweet and very hot.",
    image: "./HotMala.png",

    },
    {
    id: 4,
    name: "Golden Original",
    description: "Korean fried chicken at its best. Juicy and tender inside, light and crispy outside.",
    image: "./Golden-Original-1.png",

    }
]

export default homeList;