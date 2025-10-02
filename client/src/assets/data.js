import logoImg from "./logo.svg";
import search from "./search.svg";
import user from "./user.svg";
import menu from "./menu.svg";
import menuClose from "./menu-close.svg";
import cartAdd from "./cart-add.svg";
import cartRemove from "./cart-remove.svg";
import cartAdded from "./cart-added.svg";
import forward from "./forward.svg";
import badge from "./badge.svg";
import heartAdd from "./heart-add.svg";
import returnRequest from "./return-request.svg";
import delivery from "./delivery.svg";
import secure from "./secure.svg";
import right from "./right.svg";
import pin from "./pin.svg";
import star from "./star.svg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import twitter from "./twitter.svg";
import linkedin from "./linkedin.svg";
import rocket from "./rocket.svg";
import mail from "./mail.svg";
import phone from "./phone.svg";
import house from "./house.svg";
import graph from "./graph.svg";
import dollar from "./dollar.svg";
import map from "./map.svg";
import list from "./list.svg";
import dashboard from "./dashboard.svg";
import plus from "./plus.svg";
import squarePlus from "./square-plus.svg";
import minus from "./minus.svg";
import trash from "./trash.svg";
import hero from "./hero.png";
import features1 from "../assets/features1.png";
import features2 from "../assets/features2.png";
import userImg from "./user.png";
import user1 from "./user1.png";
import user2 from "./user2.png";
import user3 from "./user3.png";
import user4 from "./user4.png";
import uploadIcon from "../assets/upload_icon.png";
// Products
import product_1 from "./product_1.png";
import product_2_1 from "./product_2.png";
import product_2_2 from "./product_3.png";
import product_2_3 from "./product_4.png";
import product_2_4 from "./product_5.png";
import product_3 from "./product_3.png";
import product_4 from "./product_4.png";
import product_5 from "./product_5.png";
import product_6 from "./product_6.png";
import product_7 from "./product_7.png";
import product_8 from "./product_8.png";
import product_9 from "./product_9.png";
import product_10 from "./product_10.png";
import product_11 from "./product_11.png";
import product_12 from "./product_12.png";
import product_13 from "./product_13.png";
import product_14 from "./product_14.png";
import product_15 from "./product_15.png";
import product_16 from "./product_16.png";
import product_17 from "./product_17.png";
import product_18 from "./product_18.png";
import product_19 from "./product_19.png";
import product_20 from "./product_20.png";
import product_21 from "./product_21.png";
import product_22 from "./product_22.png";
import product_23 from "./product_23.png";
import product_24 from "./product_24.png";
import product_25 from "./product_25.png";
import product_26 from "./product_26.png";
import product_27 from "./product_27.png";
import product_28 from "./product_28.png";
import product_29 from "./product_29.png";
import product_30 from "./product_30.png";
import product_31 from "./product_31.png";
import product_32 from "./product_32.png";
import product_33 from "./product_33.png";
import product_34 from "./product_34.png";
import product_35 from "./product_35.png";
import product_36 from "./product_36.png";
import product_37 from "./product_37.png";
import product_38 from "./product_38.png";
import product_39 from "./product_39.png";
import product_40 from "./product_40.png";
import product_41 from "./product_41.png";
import product_42 from "./product_42.png";
import product_43 from "./product_43.png";
import product_44 from "./product_44.png";
import product_45 from "./product_45.png";
import product_46 from "./product_46.png";
import product_47 from "./product_47.png";
import product_48 from "./product_48.png";
import product_49 from "./product_49.png";
import product_50 from "./product_50.png";
import product_51 from "./product_51.png";
import product_52 from "./product_52.png";
import product_53 from "./product_53.png";
import product_54 from "./product_54.png";
// Blogs
import blog1 from "./blogs/blog1.jpg";
import blog2 from "./blogs/blog2.jpg";
import blog3 from "./blogs/blog3.jpg";
import blog4 from "./blogs/blog4.jpg";
import blog5 from "./blogs/blog5.jpg";
import blog6 from "./blogs/blog6.jpg";
import blog7 from "./blogs/blog7.jpg";
import blog8 from "./blogs/blog8.jpg";

export const assets = {
  logoImg,
  search,
  user,
  menu,
  menuClose,
  cartAdd,
  cartRemove,
  cartAdded,
  forward,
  badge,
  heartAdd,
  returnRequest,
  delivery,
  secure,
  right,
  pin,
  star,
  facebook,
  instagram,
  twitter,
  linkedin,
  rocket,
  mail,
  phone,
  dollar,
  house,
  graph,
  map,
  dashboard,
  plus,
  minus,
  squarePlus,
  trash,
  list,
  userImg,
  user1,
  user2,
  user3,
  user4,
  hero,
  features1,
  features2,
  uploadIcon,
};


export const dummyProducts = [
  {
    _id: "1",
    title: "Argan Hair Oil",
    images: [product_1],
    price: { "50ml": 15, "100ml": 25, "200ml": 40 },
    description:
      "Nourish your hair with our Argan Hair Oil, rich in vitamins for shiny and healthy locks. This lightweight formula absorbs quickly without leaving a greasy residue.",
    category: "Hair Care",
    type: "Oil",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "2",
    title: "Coconut Body Oil",
    images: [product_2_1, product_2_2, product_2_3, product_2_4],
    price: { "100ml": 20, "200ml": 35, "400ml": 50 },
    description:
      "Hydrate your skin with our Coconut Body Oil, providing deep moisture and a tropical scent. It helps improve skin elasticity and leaves you feeling soft all day.",
    category: "Body Care",
    type: "Oil",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "3",
    title: "Jojoba Face Oil",
    images: [product_3],
    price: { "30ml": 25, "50ml": 40, "100ml": 60 },
    description:
      "Balance your skin with our Jojoba Face Oil, ideal for all skin types with natural mimicking properties. It regulates sebum production while providing essential hydration.",
    category: "Face Care",
    type: "Oil",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "4",
    title: "Tea Tree Hair Oil",
    images: [product_4],
    price: { "50ml": 18, "100ml": 30, "200ml": 45 },
    description:
      "Purify your scalp with our Tea Tree Hair Oil, helping to reduce dandruff and promote growth. Its antimicrobial properties keep your scalp healthy and clean.",
    category: "Hair Care",
    type: "Oil",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "5",
    title: "Almond Body Oil",
    images: [product_5],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Soften your skin with our Almond Body Oil, enriched with vitamin E for nourishment. This gentle formula is perfect for sensitive skin and improves skin texture.",
    category: "Body Care",
    type: "Oil",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "6",
    title: "Rosehip Face Oil",
    images: [product_6],
    price: { "30ml": 28, "50ml": 45, "100ml": 65 },
    description:
      "Rejuvenate your complexion with our Rosehip Face Oil, packed with antioxidants for glowing skin. It helps reduce the appearance of fine lines and scars.",
    category: "Face Care",
    type: "Oil",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "7",
    title: "Castor Hair Oil",
    images: [product_7],
    price: { "50ml": 12, "100ml": 20, "200ml": 35 },
    description:
      "Strengthen your hair with our Castor Hair Oil, known for promoting thickness and shine. This rich formula helps prevent split ends and breakage.",
    category: "Hair Care",
    type: "Oil",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "8",
    title: "Lavender Body Oil",
    images: [product_8],
    price: { "100ml": 25, "200ml": 40, "400ml": 60 },
    description:
      "Relax your body with our Lavender Body Oil, offering calming aromatherapy benefits. Perfect for evening use to promote restful sleep and relaxation.",
    category: "Body Care",
    type: "Oil",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "9",
    title: "Vitamin C Face Oil",
    images: [product_9],
    price: { "30ml": 30, "50ml": 50, "100ml": 75 },
    description:
      "Brighten your skin with our Vitamin C Face Oil, helping to reduce dark spots and even tone. This antioxidant-rich formula protects against environmental damage.",
    category: "Face Care",
    type: "Oil",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "10",
    title: "Citrus Burst Perfume",
    images: [product_10],
    price: { "50ml": 40, "100ml": 60, "200ml": 85 },
    description:
      "Invigorate your senses with our Citrus Burst Perfume, featuring fresh lemon and orange notes. This energizing fragrance lasts throughout the day.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "11",
    title: "Floral Dream Perfume",
    images: [product_11],
    price: { "50ml": 45, "100ml": 65, "200ml": 90 },
    description:
      "Embrace elegance with our Floral Dream Perfume, blending rose and jasmine essences. A timeless fragrance that's perfect for special occasions.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "12",
    title: "Woody Spice Perfume",
    images: [product_12],
    price: { "50ml": 35, "100ml": 55, "200ml": 80 },
    description:
      "Discover depth with our Woody Spice Perfume, combining sandalwood and cinnamon. This warm, earthy scent is perfect for evening wear.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "13",
    title: "Ocean Breeze Perfume",
    images: [product_13],
    price: { "50ml": 42, "100ml": 62, "200ml": 88 },
    description:
      "Feel refreshed with our Ocean Breeze Perfume, evoking sea salt and aquatic notes. This crisp, clean fragrance is ideal for everyday wear.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "14",
    title: "Vanilla Musk Perfume",
    images: [product_14],
    price: { "50ml": 38, "100ml": 58, "200ml": 82 },
    description:
      "Indulge in sweetness with our Vanilla Musk Perfume, a warm and inviting fragrance. This comforting scent is perfect for cozy evenings.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "15",
    title: "Spicy Amber Perfume",
    images: [product_15],
    price: { "50ml": 44, "100ml": 64, "200ml": 89 },
    description:
      "Ignite passion with our Spicy Amber Perfume, featuring rich amber and spicy notes for a captivating scent. This bold fragrance makes a statement.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "16",
    title: "Fresh Mint Perfume",
    images: [product_16],
    price: { "50ml": 36, "100ml": 56, "200ml": 81 },
    description:
      "Awaken your day with our Fresh Mint Perfume, blending mint and green tea. This revitalizing scent provides an energizing start to your morning.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "17",
    title: "Exotic Oud Perfume",
    images: [product_17],
    price: { "50ml": 48, "100ml": 70, "200ml": 95 },
    description:
      "Experience luxury with our Exotic Oud Perfume, rich in oud wood and incense. This opulent fragrance is perfect for making a lasting impression.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "18",
    title: "Berry Bliss Perfume",
    images: [product_18],
    price: { "50ml": 39, "100ml": 59, "200ml": 84 },
    description:
      "Delight in fruitiness with our Berry Bliss Perfume, mixing berries and floral hints. This playful fragrance is perfect for daytime adventures.",
    category: "Body Care",
    type: "Perfume",
    sizes: ["50ml", "100ml", "200ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "19",
    title: "Hyaluronic Acid Serum",
    images: [product_19],
    price: { "30ml": 25, "50ml": 40, "100ml": 60 },
    description:
      "Hydrate deeply with our Hyaluronic Acid Serum, locking in moisture for plump skin. This lightweight formula works for all skin types.",
    category: "Face Care",
    type: "Serum",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "20",
    title: "Vitamin C Brightening Serum",
    images: [product_20],
    price: { "30ml": 28, "50ml": 45, "100ml": 65 },
    description:
      "Illuminate your complexion with our Vitamin C Brightening Serum, reducing dark spots. This powerful antioxidant helps revive dull skin.",
    category: "Face Care",
    type: "Serum",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "21",
    title: "Retinol Anti-Aging Serum",
    images: [product_21],
    price: { "30ml": 30, "50ml": 50, "100ml": 70 },
    description:
      "Smooth wrinkles with our Retinol Anti-Aging Serum, promoting youthful skin. This advanced formula boosts collagen production overnight.",
    category: "Face Care",
    type: "Serum",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "22",
    title: "Niacinamide Balancing Serum",
    images: [product_22],
    price: { "30ml": 22, "50ml": 35, "100ml": 55 },
    description:
      "Control oil with our Niacinamide Balancing Serum, refining pores and texture. This multitasking serum helps calm inflammation and redness.",
    category: "Face Care",
    type: "Serum",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "23",
    title: "Peptide Firming Serum",
    images: [product_23],
    price: { "30ml": 32, "50ml": 52, "100ml": 75 },
    description:
      "Firm and lift with our Peptide Firming Serum, boosting collagen production. This targeted treatment helps restore skin's elasticity.",
    category: "Face Care",
    type: "Serum",
    sizes: ["30ml", "50ml", "100ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "24",
    title: "Volumizing Shampoo",
    images: [product_24],
    price: { "200ml": 15, "400ml": 25, "750ml": 40 },
    description:
      "Boost volume with our Volumizing Shampoo, adding body to fine hair. This formula gently cleanses while providing lift at the roots.",
    category: "Hair Care",
    type: "Shampoo",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "25",
    title: "Moisturizing Shampoo",
    images: [product_25],
    price: { "200ml": 18, "400ml": 30, "750ml": 45 },
    description:
      "Hydrate dry hair with our Moisturizing Shampoo, infused with natural oils. This nourishing formula helps restore moisture to parched strands.",
    category: "Hair Care",
    type: "Shampoo",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "26",
    title: "Clarifying Shampoo",
    images: [product_26],
    price: { "200ml": 20, "400ml": 35, "750ml": 50 },
    description:
      "Deep clean with our Clarifying Shampoo, removing buildup for fresh hair. This weekly treatment revitalizes your scalp and hair.",
    category: "Hair Care",
    type: "Shampoo",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "27",
    title: "Anti-Dandruff Shampoo",
    images: [product_27],
    price: { "200ml": 16, "400ml": 28, "750ml": 42 },
    description:
      "Combat flakes with our Anti-Dandruff Shampoo, soothing the scalp. This medicated formula helps control itching and flaking.",
    category: "Hair Care",
    type: "Shampoo",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "28",
    title: "Color-Protect Shampoo",
    images: [product_28],
    price: { "200ml": 19, "400ml": 32, "750ml": 48 },
    description:
      "Preserve color with our Color-Protect Shampoo, for vibrant dyed hair. This sulfate-free formula helps extend the life of your color treatment.",
    category: "Hair Care",
    type: "Shampoo",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "29",
    title: "Fresh Citrus Body Spray",
    images: [product_29],
    price: { "150ml": 12, "250ml": 20, "500ml": 35 },
    description:
      "Refresh instantly with our Fresh Citrus Body Spray, light and zesty. This invigorating mist is perfect for a quick pick-me-up throughout the day.",
    category: "Body Care",
    type: "Body-Spray",
    sizes: ["150ml", "250ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "30",
    title: "Cool Mint Body Spray",
    images: [product_30],
    price: { "150ml": 14, "250ml": 22, "500ml": 38 },
    description:
      "Energize with our Cool Mint Body Spray, providing a cooling sensation. This refreshing formula awakens your senses and revitalizes your skin.",
    category: "Body Care",
    type: "Body-Spray",
    sizes: ["150ml", "250ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "31",
    title: "Vanilla Dream Body Spray",
    images: [product_31],
    price: { "150ml": 13, "250ml": 21, "500ml": 36 },
    description:
      "Sweeten your day with our Vanilla Dream Body Spray, warm and comforting. This cozy fragrance wraps you in a soothing vanilla embrace.",
    category: "Body Care",
    type: "Body-Spray",
    sizes: ["150ml", "250ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "32",
    title: "Ocean Wave Body Spray",
    images: [product_32],
    price: { "150ml": 15, "250ml": 25, "500ml": 40 },
    description:
      "Evoke the sea with our Ocean Wave Body Spray, fresh and aquatic. This breezy scent transports you to a coastal paradise with every spritz.",
    category: "Body Care",
    type: "Body-Spray",
    sizes: ["150ml", "250ml", "500ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "33",
    title: "Berry Fresh Body Spray",
    images: [product_33],
    price: { "150ml": 11, "250ml": 18, "500ml": 32 },
    description:
      "Burst with fruitiness using our Berry Fresh Body Spray, lively and sweet. This playful fragrance combines mixed berries for a delightful experience.",
    category: "Body Care",
    type: "Body-Spray",
    sizes: ["150ml", "250ml", "500ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "34",
    title: "Gentle Foaming Cleanser",
    images: [product_34],
    price: { "100ml": 15, "200ml": 25, "400ml": 40 },
    description:
      "Cleanse softly with our Gentle Foaming Cleanser, suitable for sensitive skin. This pH-balanced formula removes impurities without stripping natural oils.",
    category: "Face Care",
    type: "Cleanser",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "35",
    title: "Oil-Control Cleanser",
    images: [product_35],
    price: { "100ml": 18, "200ml": 30, "400ml": 45 },
    description:
      "Mattify with our Oil-Control Cleanser, reducing excess sebum. This deep-cleansing formula helps minimize shine throughout the day.",
    category: "Face Care",
    type: "Cleanser",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "36",
    title: "Hydrating Milk Cleanser",
    images: [product_36],
    price: { "100ml": 20, "200ml": 35, "400ml": 50 },
    description:
      "Moisturize while cleaning with our Hydrating Milk Cleanser, creamy and nourishing. This gentle formula is perfect for dry or dehydrated skin types.",
    category: "Face Care",
    type: "Cleanser",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "37",
    title: "Exfoliating Gel Cleanser",
    images: [product_37],
    price: { "100ml": 22, "200ml": 38, "400ml": 55 },
    description:
      "Renew skin with our Exfoliating Gel Cleanser, gently removing dead cells. This daily formula reveals brighter, smoother skin without irritation.",
    category: "Face Care",
    type: "Cleanser",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "38",
    title: "Micellar Water Cleanser",
    images: [product_38],
    price: { "100ml": 16, "200ml": 28, "400ml": 42 },
    description:
      "Remove makeup easily with our Micellar Water Cleanser, no-rinse formula. This multitasking water cleanses, tones, and refreshes in one step.",
    category: "Face Care",
    type: "Cleanser",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "39",
    title: "Antibacterial Hand Wash",
    images: [product_39],
    price: { "250ml": 10, "500ml": 18, "1000ml": 30 },
    description:
      "Protect with our Antibacterial Hand Wash, killing germs while being gentle. This effective formula eliminates 99.9% of bacteria without drying hands.",
    category: "Body Care",
    type: "Hand-Wash",
    sizes: ["250ml", "500ml", "1000ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "40",
    title: "Moisturizing Hand Wash",
    images: [product_40],
    price: { "250ml": 12, "500ml": 20, "1000ml": 35 },
    description:
      "Hydrate hands with our Moisturizing Hand Wash, infused with aloe vera. This nourishing formula cleanses while maintaining your skin's natural moisture barrier.",
    category: "Body Care",
    type: "Hand-Wash",
    sizes: ["250ml", "500ml", "1000ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "41",
    title: "Citrus Scented Hand Wash",
    images: [product_41],
    price: { "250ml": 11, "500ml": 19, "1000ml": 32 },
    description:
      "Refresh with our Citrus Scented Hand Wash, zesty and invigorating. This uplifting formula leaves hands clean and smelling like fresh citrus fruits.",
    category: "Body Care",
    type: "Hand-Wash",
    sizes: ["250ml", "500ml", "1000ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "42",
    title: "Lavender Calming Hand Wash",
    images: [product_42],
    price: { "250ml": 13, "500ml": 22, "1000ml": 38 },
    description:
      "Soothe with our Lavender Calming Hand Wash, relaxing and mild. This gentle formula features lavender essential oil for a calming handwashing experience.",
    category: "Body Care",
    type: "Hand-Wash",
    sizes: ["250ml", "500ml", "1000ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "43",
    title: "Tea Tree Purifying Hand Wash",
    images: [product_43],
    price: { "250ml": 14, "500ml": 24, "1000ml": 40 },
    description:
      "Purify with our Tea Tree Purifying Hand Wash, natural and effective. This formula uses tea tree oil's natural antiseptic properties for thorough cleansing.",
    category: "Body Care",
    type: "Hand-Wash",
    sizes: ["250ml", "500ml", "1000ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "44",
    title: "Matte Red Lipstick",
    images: [product_44],
    price: { "3g": 15, "5g": 25 },
    description:
      "Achieve bold lips with our Matte Red Lipstick, long-lasting and velvety. This highly pigmented formula provides full coverage with a comfortable wear.",
    category: "Face Care",
    type: "Lip-Product",
    sizes: ["3g", "5g"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "45",
    title: "Hydrating Lip Balm",
    images: [product_45],
    price: { "4g": 10, "8g": 18 },
    description:
      "Moisturize with our Hydrating Lip Balm, enriched with shea butter for soft lips. This nourishing formula provides instant relief for dry, chapped lips.",
    category: "Face Care",
    type: "Lip-Product",
    sizes: ["4g", "8g"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "46",
    title: "Glossy Pink Lip Gloss",
    images: [product_46],
    price: { "5ml": 12, "10ml": 20 },
    description:
      "Shine bright with our Glossy Pink Lip Gloss, non-sticky and plumping. This formula gives you a high-shine finish with a subtle hint of color.",
    category: "Face Care",
    type: "Lip-Product",
    sizes: ["5ml", "10ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "47",
    title: "Vitamin E Lip Serum",
    images: [product_47],
    price: { "10ml": 18, "20ml": 30 },
    description:
      "Repair and nourish with our Vitamin E Lip Serum, for smoother lips. This intensive treatment helps restore softness and suppleness to your lips.",
    category: "Face Care",
    type: "Lip-Product",
    sizes: ["10ml", "20ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "48",
    title: "Nude Matte Lipstick",
    images: [product_48],
    price: { "3g": 14, "5g": 24 },
    description:
      "Go natural with our Nude Matte Lipstick, perfect for everyday wear. This versatile shade complements all skin tones with a sophisticated matte finish.",
    category: "Face Care",
    type: "Lip-Product",
    sizes: ["3g", "5g"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "49",
    title: "Aloe Vera Body Lotion",
    images: [product_49],
    price: { "200ml": 15, "400ml": 25, "750ml": 40 },
    description:
      "Soothe skin with our Aloe Vera Body Lotion, cooling and hydrating. This lightweight formula absorbs quickly to provide instant relief for dry skin.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: true,
    inStock: true,
  },
  {
    _id: "50",
    title: "Shea Butter Hand Lotion",
    images: [product_50],
    price: { "100ml": 12, "200ml": 20, "400ml": 35 },
    description:
      "Nourish hands with our Shea Butter Hand Lotion, rich and creamy. This intensive formula provides long-lasting moisture for overworked hands.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "51",
    title: "Coconut Moisturizing Lotion",
    images: [product_51],
    price: { "200ml": 18, "400ml": 30, "750ml": 45 },
    description:
      "Hydrate deeply with our Coconut Moisturizing Lotion, tropical and light. Hydrate deeply with our Coconut Moisturizing Lotion, tropical and light.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "52",
    title: "Lavender Relaxing Lotion",
    images: [product_52],
    price: { "100ml": 14, "200ml": 22, "400ml": 38 },
    description:
      "Calm your skin with our Lavender Relaxing Lotion, aromatic and soothing. Calm your skin with our Lavender Relaxing Lotion, aromatic and soothing.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "53",
    title: "Vitamin E Enriched Lotion",
    images: [product_53],
    price: { "200ml": 20, "400ml": 35, "750ml": 50 },
    description:
      "Protect and repair with our Vitamin E Enriched Lotion, antioxidant-rich. Protect and repair with our Vitamin E Enriched Lotion, antioxidant-rich.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["200ml", "400ml", "750ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
  {
    _id: "54",
    title: "Unscented Sensitive Lotion",
    images: [product_54],
    price: { "100ml": 16, "200ml": 28, "400ml": 42 },
    description:
      "Gentle care with our Unscented Sensitive Lotion, for delicate skin. Gentle care with our Unscented Sensitive Lotion, for delicate skin.",
    category: "Body Care",
    type: "Lotion",
    sizes: ["100ml", "200ml", "400ml"],
    date: 1716634345448,
    popular: false,
    inStock: true,
  },
];


// Blogs Dummy Data 
export const blogs = [
  {
    title: "Top 10 Skincare Must-Haves for 2025",
    category: "Skincare Tips",
    image: blog1,
    description:
      "Discover the essential skincare products you need in your routine for glowing, healthy skin in 2025.",
  },
  {
    title: "How to Choose the Perfect Foundation Shade",
    category: "Makeup Guide",
    image: blog2,
    description:
      "A step-by-step guide to finding your exact foundation match for a flawless and natural look.",
  },
  {
    title: "Hair Care Trends Every Woman Should Try",
    category: "Hair Care",
    image: blog3,
    description:
      "Explore the latest hair care tips and product trends that help strengthen, style, and shine.",
  },
  {
    title: "Beginner’s Guide to Building a Makeup Kit",
    category: "Beauty Basics",
    image: blog4,
    description:
      "A complete checklist of makeup essentials every beginner should own for daily and special looks.",
  },
  {
    title: "Maximizing Results with Your Night Skincare Routine",
    category: "Skincare Routine",
    image: blog5,
    description:
      "Learn how to create the perfect nighttime skincare routine for better hydration and anti-aging benefits.",
  },
  {
    title: "The Benefits of Organic and Natural Cosmetics",
    category: "Lifestyle",
    image: blog6,
    description:
      "Understand why more people are switching to natural cosmetics and the long-term skin benefits.",
  },
  {
    title: "Tips to Make Your Lipstick Last All Day",
    category: "Makeup Tips",
    image: blog7,
    description:
      "Simple but effective hacks to keep your lipstick fresh and vibrant from morning to evening.",
  },
  {
    title: "2025 Beauty Forecast: Makeup and Skincare Trends",
    category: "Beauty Trends",
    image: blog8,
    description:
      "An expert look at the upcoming beauty and skincare trends that will define style in 2025.",
  },
];


export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "user",
    lastName: "one",
    email: "userone@gmail.com",
    street: "789 Elm Street",
    city: "Springfield",
    state: "California",
    zipcode: 90210,
    country: "US",
    phone: "+1-555-123-4567",
  },
  {
     _id: "67b5b9e54ea97fdfgdbcsd5",
    userId: "68591d36daf423db94fa8f4f",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@gmail.com",
    street: "456 Elm Street",
    city: "Metropolis",
    state: "CA",
    zipcode: "998877",
    country: "United States",
    phone: "9876543210",
  },

];


export const dummyOrdersData = [
  {
    _id: "685a5bbfaff57babcdfcc171",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: dummyProducts[0], // Argan Hair Oil
        quantity: 1,
        size: "50ml",
        _id: "685a5bbfaff57babcdfcc172",
      },
      {
        product: dummyProducts[3], // Tea Tree Hair Oil
        quantity: 2,
        size: "100ml",
        _id: "685a5bbfaff57babcdfcc173",
      },
    ],
    amount: 40.6,
    address: dummyAddress[0],
    status: "Out for delivery",
    paymentMethod: "COD",
    isPaid: false,
    createdAt: "2025-06-24T08:03:11.197+00:00",
    updatedAt: "2025-06-24T11:02:04.631+00:00",
    __v: 0,
  },
  {
    _id: "685a5bbfaff57babcdfcc174",
    userId: "68591d36daf423db94fa8f4f",
    items: [
      {
        product: dummyProducts[8], // Vitamin C Face Oil
        quantity: 1,
        size: "30ml",
        _id: "685a5bbfaff57babcdfcc175",
      },
      {
        product: dummyProducts[24], // Volumizing Shampoo
        quantity: 3,
        size: "400ml",
        _id: "685a5bbfaff57babcdfcc176",
      },
    ],
    amount: 85.0,
    address: dummyAddress[0],
    status: "Delivered",
    paymentMethod: "Online",
    isPaid: true,
    createdAt: "2025-07-01T09:15:45.197+00:00",
    updatedAt: "2025-07-01T11:30:04.631+00:00",
    __v: 0,
  },
];


// Dashboard Dummy Data
export const dummyDashboardData = {
    "totalOrders": 2,
    "totalRevenue": 897,
    "orders": dummyOrdersData
}