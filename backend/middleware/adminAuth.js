import jwt from 'jsonwebtoken';

const adminAuth = async(req, res, next) => {
    try {
        // we get the token from the user request header, jab bhi admin login karega using email and password the ak token bhi generate hoga, ya vohi token h
        const {token} = req.headers;
        
        // if token is available then only we will verify it
        if(!token){
            return res.json({ success: false, message: "Not authorized , Login Again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({ success: false, message: "Not authorized , Login Again" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default adminAuth;
