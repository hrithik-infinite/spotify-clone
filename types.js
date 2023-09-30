const Stripe = require("stripe");

const Song = {
  id: "",
  user_id: "",
  author: "",
  title: "",
  song_path: "",
  image_path: "",
};

const Product = {
  id: "",
  active: false,
  name: "",
  description: "",
  image: "",
  metadata: Stripe.Metadata || {},
};

const Price = {
  id: "",
  product_id: "",
  active: false,
  description: "",
  unit_amount: 0,
  currency: "",
  type: "",
  interval: "",
  interval_count: 0,
  trial_period_days: null,
  metadata: Stripe.Metadata || {},
  products: {},
};

const Customer = {
  id: "",
  stripe_customer_id: "",
};

const UserDetails = {
  id: "",
  first_name: "",
  last_name: "",
  full_name: "",
  avatar_url: "",
  billing_address: {},
  payment_method: "",
};

const ProductWithPrice = {
  prices: [],
};

const Subscription = {
  id: "",
  user_id: "",
  status: "",
  metadata: Stripe.Metadata || {},
  price_id: "",
  quantity: 0,
  cancel_at_period_end: false,
  created: "",
  current_period_start: "",
  current_period_end: "",
  ended_at: null,
  cancel_at: "",
  canceled_at: "",
  trial_start: "",
  trial_end: "",
  prices: Price,
};

module.exports = {
  Song,
  Product,
  Price,
  Customer,
  UserDetails,
  ProductWithPrice,
  Subscription,
};
