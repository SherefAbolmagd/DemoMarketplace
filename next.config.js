require('dotenv').config();

module.exports =  //process.env.production ? 
// {
//     //basePath: process.env.BASEPATH||"",
//     //assetPrefix: process.env.BASEPATH||""
//     assetPrefix: process.env.NEXT_PUBLIC_CDNPATH||""
// } :
{
    //basePath: process.env.BASEPATH||"",
    assetPrefix: process.env.BASEPATH||""
    //assetPrefix: process.env.NEXT_PUBLIC_CDNPATH||""
}