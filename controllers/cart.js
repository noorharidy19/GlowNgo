

const Cart = require('../models/cart');
const Products = require('../models/products');


exports.addProductToCart = async (req, res) => {
    const{quantity, productId} = req.body;
    const{_id:userId}=req.session.user;
    if(userId===""){
      res.render("404");
    }
    try{
      await Cart.findOneAndUpdate({userId},{
        $push:{
          products:{productId,quantity}
        }
      },
      {upsert:true}
    );
    console.log("Product added to cart")
    return res.render("Home");
    
  }catch(err){
      console.log(err);
      res.render("404");
    }
  }