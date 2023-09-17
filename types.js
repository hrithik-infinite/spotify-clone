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
  active: false, // Default value added
  name: "",
  description: "",
  image: "",
  metadata: Stripe.Metadata || {}, // Default value added
};

function Price() {
  this.id = "";
  this.product_id = "";
  this.active = false; // Default value added
  this.description = "";
  this.unit_amount = 0; // Default value added
  this.currency = "";
  this.type = "";
  this.interval = "";
  this.interval_count = 0; // Default value added
  this.trial_period_days = null;
  this.metadata = Stripe.Metadata || {}; // Default value added
  this.products = {};
}
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
  metadata: Stripe.Metadata || {}, // Default value added
  price_id: "",
  quantity: 0, // Default value added
  cancel_at_period_end: false, // Default value added
  created: "",
  current_period_start: "",
  current_period_end: "",
  ended_at: null,
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
