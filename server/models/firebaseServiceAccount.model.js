const { uid } = require("uid")

const FirebaseSeviceAccount = {
    slug: 'firebaseServiceAccount',
    admin: {
        useAsTitle: 'shopId',
    },
    fields: [
        {
            name: "id",
            type: "text",
            unique: true
        },
        {
            name: "serviceAccount",
            type: 'json',
            required: true
        },
        {
            name: "firbaseAccessToken",
            type: "text",
            required: true
        },
        {
            name: "tokenExpiry",
            type: 'number',
            required: true
        },
        {
            name: "shopId",
            type: "relationship",
            relationTo: "Store",
            hasMany: false,
            required: true
        },
    ],
    hooks:{
        beforeChange: [
          (args) => {
            if (args.operation === 'create') {
              args.data.id = uid(); // Generate a unique ID using nanoid
            }
          }
        ]
      }
};

module.exports =FirebaseSeviceAccount;