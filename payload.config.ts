const { buildConfig } = require('payload/config');
const path = require('path');
const dotenv = require("dotenv")
const { payloadCloud } = require('@payloadcms/plugin-cloud');
const { postgresAdapter } = require('@payloadcms/db-postgres');
// const  { mongooseAdapter } = require('@payloadcms/db-mongodb')
const { webpackBundler } = require('@payloadcms/bundler-webpack');
const { slateEditor } = require('@payloadcms/richtext-slate');

// Importing the actual modules for runtime
const productConfig = require('./server/collections/Product.js');
const userConfig = require('./server/collections/User.js');
const bannerImageConfig = require('./server/collections/BannerImage.js');
const collectionConfig = require('./server/collections/Collection.js');
const sessionConfig = require("./server/collections/Session.js")
const activeStoreConfig = require("./server/collections/ActiveStore.js")
const socialChannelConfig = require("./server/collections/SocialChannels.js")
const textParagraphConfig = require("./server/collections/TextParagraph.js")
const eventTimerConfig = require("./server/collections/EventTimer.js")
const announcementBannerConfig = require("./server/collections/AnnouncementBanner.js")
const otherComponentConfig = require("./server/collections/OthersComponent.js")
const brandingThemeConfig = require("./server/collections/BrandingApp.js")
const homePageConfig = require("./server/collections/HomePage.js")
const videoConfig = require("./server/collections/Video.js")
const tabMenuConfig = require("./server/collections/tabMenuNavigation.js")
const productPageDetailConfig = require("./server/collections/ProductPageDetail.js")
const emptyCartPageDetailConfig = require("./server/collections/EmptyCartPageDetail.js")
const accountPageDetailConfig = require("./server/collections/AccountPageDetail.js")
const themeConfig = require("./server/collections/Theme.js")
const Media = require("./server/collections/Media.js")


module.exports =  buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_EXTERNAL_SERVER_URL,
  admin: {
    user: userConfig.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  cors: process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(',') : [],
  csrf: process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(',') : [],
  collections: [ Media , themeConfig ,  accountPageDetailConfig , emptyCartPageDetailConfig , productPageDetailConfig ,socialChannelConfig , brandingThemeConfig , videoConfig , textParagraphConfig , eventTimerConfig ,  tabMenuConfig  ,  homePageConfig , announcementBannerConfig  , userConfig , bannerImageConfig    , productConfig , collectionConfig , sessionConfig , activeStoreConfig ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  })
});

