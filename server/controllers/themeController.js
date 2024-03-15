const Payload = require("payload");

const getAllTheme = async(req , res , next)=>{
    try {

        const theme = await Payload.find({
            collection: 'theme',
        })

        return res.status(200).json({
            success: true,
            message: "Data Send Successfully",
            data: theme.docs
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getThemeById = async(req , res , next)=>{
    try {
        
        if(!req.params.themeId){
            return res.status(400).json({
                success: false,
                message: "Theme_id is missing"
            })
        }
    
        const theme = await Payload.findByID({
            collection: 'theme', // required
            id: req.params.themeId, // required
        })
    
        if(!theme){
            return res.status(404).json({
                success: false,
                message: "Theme not found"
            })
        }
    
        return res.status(200).json({
            success:true,
            message: "Data Send Successfully",
            data: theme
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    } 
}

module.exports = {getAllTheme , getThemeById}