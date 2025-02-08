// /models/LectureEntity.ts

interface Video {
  url: string;
  thumbnail: string;
}

export interface LectureEntity {
  id: string;
  slug: string;
  status: boolean;
  title: string;
  name: string;
  description?: string;

  //imageUrl: string;
  //imageUrls?: string[];

  introThumbnail: string;
  introUrl: string;
  videoThumbnail: string;
  videoUrl: string;
  //intro?: Video;
  //video: Video;
  /* introUrl?: string;
  videoUrl: string; */

  price: number;
  priceText?: string;

  rating?: number;

  initTime?: Date;
  editTime?: Date;

  /* categoryName?: string;
  categorySlug?: string;
  categoryNames?: string;
  categorySlugs?: string; */

  //popularity?: number;

  //sellCount?: number;

  //url?: string;
  //asin?: string;
  /* product_details?: {
    packageDimensions?: string;
    dateFirstAvailable?: string;
    manufacturer?: string;
    asin?: string;
    itemModelNumber?: string;
    department?: string;
  };
  breadcrumbs?: string;
  relatedProducts?: LectureEntity[]; // Suggesting related products
  seoMeta?: Record<string, string>; // SEO meta tags */
}

// /models/Price.ts

export interface Price {
  value: number;
  text?: string;
  currency: string;
}

// /models/ProductSample.ts

export interface ProductSample {
  url: string;
  title: string;
  asin: string;
  price: string;
  brand: string;
  productDetails: {
    packageDimensions?: string;
    dateFirstAvailable?: string;
    manufacturer?: string;
    asin?: string;
    itemModelNumber?: string;
    department?: string;
  };
  breadcrumbs: string;
  imagesList: string[];
  features: Array<Record<string, string>>;
}

// /models/Product.ts

export interface Product extends LectureEntity {
  userUtils?: ProductUtils;
}

// /models/ProductUtils.ts

export interface ProductUtils {
  liked?: boolean;
  bookmarked?: boolean;
  notification?: boolean;
}

// /models/User.ts

export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  likes: string[];
  notifProducts: string[];
  bookmarkProducts: string[];
  orders: Order[];
  addresses: Address[];
  mainAddress?: Address;
  preferences?: UserPreferences; // User's personal preferences and settings
}

// /models/FullAddress.ts

export interface FullAddress {
  city: string;
  subregion?: string;
  district: string;
  street: string;
  zip?: string;
  building: string;
  block: string;
  streetNo: string;
  flatNo: string;
}

// /models/Address.ts

export interface Address extends FullAddress {
  title: string;
  lat?: number;
  lon?: number;
  isDefault?: boolean;
}

// /models/StructuredAddress.ts

export interface StructuredAddress {
  firstLine: string;
  secondLine: string;
}

// /models/CartItem.ts

export interface CartItem {
  id?: string;
  product: LectureEntity;
  quantity: number;
  selectedOptions?: Record<string, any>; // Options like size, color, etc.
}

// /models/Cart.ts

export interface Cart {
  id?: string;
  items: CartItem[];
  discount?: Discount;
  subtotal?: number; // Before discounts
  total?: number; // After discounts
}

// /models/Order.ts

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  date: Date;
  discount?: Discount;
  shippingAddress: Address;
  billingAddress: Address;
  payment: Payment;
  status: string;
  trackingInfo?: TrackingInfo; // Information about order delivery
}

// /models/Discount.ts

export interface Discount {
  id: string;
  code: string;
  percentage: number;
  expirationDate: Date;
  isActive: boolean;
}

// /models/Payment.ts

export interface Payment {
  id: string;
  amount: number;
  method: string; // Enum of possible methods
  cardNumber?: string; // Last four digits
  expirationDate?: string; // MM/YY
  cvv?: string;
}

// /models/Review.ts

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}

// /models/SiteTheme.ts

export interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  borderRadius?: number;
  boxShadow?: string;
}

// /models/SiteOptions.ts

/* export interface SiteOptions {
  theme: SiteTheme;
  logoUrl: string;
  domainUrl: string;
  companyName: string;
  welcomeMessage?: string;
  contactEmail: string;
  currency: string;
  socialLinks?: Record<string, string>; // Social media and other external links
} */

// /category/index.ts/SlugName.ts

export interface SlugName {
  slug: string;
  name: string;
}

// /category/index.ts/SlugDir.ts

export interface SlugDir extends SlugName {
  slugDir: string;
  nameDir: string;
}

// /category/index.ts/Category.ts

export interface Category extends SlugDir {
  subs?: Category[];
}

// /category/index.ts/CategoryTemp.ts

export interface CategoryTemp extends SlugName {
  subs?: CategoryTemp[];
  slugDir: string;
  nameDir?: string;
}

// /category/index.ts/CategoryNode.ts

export interface CategoryNode extends SlugName {
  subs?: Record<string, CategoryNode>;
}

// /site/index.ts/ThemeOptions.ts

export interface ThemeOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  borderStyle: string;
  borderColor: string;
  boxShadow: string;
}

// /site/index.ts/MainSiteOptions.ts

export interface MainSiteOptions {
  title: string;
  domainUrl: string;
  logoUrl: string;
  language: string;
  favicon: string;
  contactEmail: string;
  currency: string;
  companyName: string;
  metaDescription: string;
}

// /site/index.ts/AppBarCustomization.ts

export interface AppBarCustomization {
  color: string;
  position: "fixed" | "absolute" | "relative";
  elevation: number;
  logo: string;
}

// /site/index.ts/UIElement.ts

export interface UIElement {
  type: "slideshow" | "grid" | "stack" | "item";
  content: any[];
  styles: object;
}

// /site/index.ts/LayoutSiteOptions.ts

export interface LayoutSiteOptions {
  appBar: AppBarCustomization;
  homePage: UIElement[];
  itemPage: UIElement[];
  searchPage: UIElement[];
}

// /site/index.ts/SiteOptions.ts

export interface SiteOptions {
  theme: ThemeOptions;
  main: MainSiteOptions;
  layout?: LayoutSiteOptions;
  footer?: FooterCustomization; // Customize the site's footer
  pageCustomizations?: Record<string, PageCustomization>; // Customizations for specific pages
}

// /site/index.ts/InputType.ts

export interface InputType {
  inputType: "color" | "length" | "enum" | undefined;
}

// /site/index.ts/ThemeInput.ts

export interface ThemeInput {
  type: "color" | "length" | "enum" | undefined;
  label: string;
  name: string;
  unit?: string;
}

// /models/TrackingInfo.ts

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: Date;
}

// /models/UserPreferences.ts

export interface UserPreferences {
  language?: string;
  currency?: string;
  theme?: string; // User's preferred theme
}

// /models/FooterCustomization.ts

export interface FooterCustomization {
  content: string; // HTML or text content
  links: Record<string, string>; // Links to display in the footer
}

// /models/PageCustomization.ts

export interface PageCustomization {
  header?: string; // Custom header content
  footer?: string; // Custom footer content
  styles?: object; // Specific styles for the page
}
