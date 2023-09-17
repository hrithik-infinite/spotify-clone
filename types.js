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
  active: undefined,
  name: undefined,
  description: undefined,
  image: undefined,
  metadata: Stripe.Metadata,
};

const Price = {
  id: "",
  product_id: undefined,
  active: undefined,
  description: undefined,
  unit_amount: undefined,
  currency: undefined,
  type: Stripe.Price.Type,
  interval: Stripe.Price.Recurring.Interval,
  interval_count: undefined,
  trial_period_days: null,
  metadata: Stripe.Metadata,
  products: {},
};

const Customer = {
  id: "",
  stripe_customer_id: undefined,
};

const UserDetails = {
  id: "",
  first_name: "",
  last_name: "",
  full_name: undefined,
  avatar_url: undefined,
  billing_address: Stripe.Address,
  payment_method: Stripe.PaymentMethod[Stripe.PaymentMethod.Type],
};

const ProductWithPrice = {
  prices: [],
};

const Subscription = {
  id: "",
  user_id: "",
  status: undefined,
  metadata: Stripe.Metadata,
  price_id: "",
  quantity: undefined,
  cancel_at_period_end: undefined,
  created: "",
  current_period_start: "",
  current_period_end: "",
  ended_at: undefined,
  cancel_at: "",
  canceled_at: "",
  trial_start: "",
  trial_end: "",
  prices: new Price(),
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
