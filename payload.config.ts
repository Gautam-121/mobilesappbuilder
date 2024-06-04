
const { buildConfig } = require("payload/config");
const path = require("path");
const dotenv = require("dotenv");
const { payloadCloud } = require("@payloadcms/plugin-cloud");
const { postgresAdapter } = require("@payloadcms/db-postgres");
const { webpackBundler } = require("@payloadcms/bundler-webpack");
const { slateEditor } = require("@payloadcms/richtext-slate");

// Importing the actual modules for runtime
const Segment = require ("./server/models/segmentModel");
const ProductGroup = require("./server/models/productGroup.models.js");
const User = require("./server/models/user.models.js");
const Banner = require("./server/models/banner.models.js");
const Categories = require("./server/models/categories.models.js");
const StoreSession = require("./server/models/session.models.js");
const Store = require("./server/models/store.models.js");
// const SocialChannel = require("./server/models/socialChannels.models.js");
// const TextParagraph = require("./server/models/textParagraph.models.js");
// const EventTimer = require("./server/models/eventTimer.models.js");
const AnnouncementBanner = require("./server/models/announcementBanner.models.js");
const Branding = require("./server/models/branding.models.js");
const HomePage = require("./server/models/home.models.js");
// const Video = require("./server/models/video.models.js");
const TabMenu = require("./server/models/tabNavigation.models.js");
const ProductPage = require("./server/models/productDetails.models.js");
// const EmptyCartPage = require("./server/models/cartDetail.models.js");
const AccountPage = require("./server/models/accountDetail.models.js");
const Theme = require("./server/models/theme.models.js");
const Media = require("./server/models/media.models.js");
const Customer =require( "./server/models/customerDetail.models.js");
const FirebaseServiceAccount =require("./server/models/firebaseServiceAccount.model");
const CustomerCart = require("./server/models/customerCart.models.js")
const AboutUs = require("./server/models/aboutUs.models.js")

module.exports = buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_EXTERNAL_SERVER_URL,
  admin: {
    user: User.slug,
    bundler: webpackBundler()
  },
  editor: slateEditor({}),
  cors: process.env.WHITELIST_ORIGINS
    ? process.env.WHITELIST_ORIGINS.split(",")
    : [],
  csrf: process.env.WHITELIST_ORIGINS
    ? process.env.WHITELIST_ORIGINS.split(",")
    : [],
  collections: [
    Media,
    Theme,
    Customer,
    Segment,
    FirebaseServiceAccount,
    AccountPage,
    // EmptyCartPage,
    ProductPage,
    // SocialChannel,
    Branding,
    // Video,
    // TextParagraph,
    // EventTimer,
    TabMenu,
    HomePage,
    AnnouncementBanner,
    User,
    Banner,
    ProductGroup,
    Categories,
    StoreSession,
    Store,
    CustomerCart,
    AboutUs
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
