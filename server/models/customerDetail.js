const Customer = {
    slug: 'customers',
    admin: {
        useAsTitle: 'customerName',
    },
    fields: [
        {
            name: "id",
            type: "text",
            unique: true,
            required: true
        },
        {
          name:"customerName",
          type:"text",
          required:"true"
        },
        {
            name: "deviceIds",
            type: "array",
            fields: [
                // required
                {
                    name: 'deviceId',
                    type: 'text',
                    // unique: true,
                    required: true
                }
            ],
            required: true
        },
        {
            name: "deviceTypes",
            type: "array",
            fields: [
                // required
                {
                    name: 'deviceType',
                    type: 'text',
                    // unique: true,
                    required: true
                }
            ],
            required: true
        },
        {
            name: "firebaseTokens",
            type: "array",
            fields: [
                // required
                {
                    name: 'firebaseToken',
                    type: 'text',
                    // unique: true,
                    required: true
                }
            ],
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

module.exports = Customer;

