const ApiError = require("../utils/ApiError");


const registerUser = async (req, res) => {

    const { email, password, firstName, lastName , phone } = req.body;

    // Validate input data
    if (
        [email, password, firstName, lastName , phone].some((field)=>field.trim()=="")
    ) {
       return next(
        new ApiError(
            "All fields are required",
            400
        )
       )
    }

    if (!isValidEmail(email)) {
        return next(
            new ApiError(
                "Invalid Email format",
                400
            )
        )
    }

    if(!isValidPassword(password)){
        return next(
            new ApiError(
                "Password should contain at least 8 character in which 1 Uppercase letter , 1 lowerCase letter , 1 Number and 1 Special character",
                400
            )
        )
    }

    if(!isValidName(firstName)){
        return next(
            new ApiError(
                "",
                400
            )
        )
    }

    if(!isValidName(lastName)){
        return next(
            new ApiError(
                "",
                400
            )
        )
    }

    if(!isValidPhone(phone)){
        return next(
            new ApiError(
                "",
                400
            )
        )
    }

    const query = `
        mutation CustomerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                }
                customerUserErrors {
                    field
                    message
                }
            }
        }
    `;

    const variables = {
        input: {
            email,
            password,
            firstName,
            lastName
        }
    };

    try {
        
        const data = await request(graphqlEndpoint, query, variables, {
            'X-Shopify-Storefront-Access-Token': accessToken,
        });

        // Check if there are any errors
        if (data.customerCreate.customerUserErrors.length > 0) {
            // Handle errors
            return res.status(400).json({ errors: data.customerCreate.customerUserErrors });
        } else {
            // Customer created successfully
            return res.status(201).json({ customer: data.customerCreate.customer });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const loginUser = async(req,res,next)=>{

}

const logout = async(req,res,next)=>{

}

const forgotPassword = async(req,res,next)=>{

}

const resetPassword = async(req,res,next)=>{

}

const getUserDetails = async(req,res,next)=>{

}

const updatePassword = async(req,res,next)=>{

}

const updateProfile = async(req,res,next)=>{

}


module.exports = {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
  }