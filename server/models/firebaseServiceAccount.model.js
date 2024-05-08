const FirebaseSeviceAccount = {
    slug: 'firebaseServiceAccount',
    admin: {
        useAsTitle: 'shopId',
    },
    fields: [
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
};

module.exports =FirebaseSeviceAccount;