// images
import featureimg1 from "../assets/images/restaurant-interior2.webp"
import featureimg2 from "../assets/images/restaurant-interior2.jpg"
import featureimg3 from "../assets/images/restaurant-interior3.webp"
// timeline images
import placedicon from "../assets/images/orderplacedicon.png"
import placediconactive from "../assets/images/orderplacediconactive.png"
import confirmedicon from "../assets/images/confirmedordericon.png"
import confirmediconactive from "../assets/images/confirmedordericonactive.png"
import preparingicon from "../assets/images/preparingicon.png"
import preparingiconactive from "../assets/images/preparingiconactive.png"
import ready from "../assets/images/readyicon.png"
import readyactive from "../assets/images/readyiconactive.png"
import outfordelivery from "../assets/images/outfordeliveryicon.png"
import outfordeliveryactive from "../assets/images/outfordeliveryiconactive.png"
import deliveredicon from "../assets/images/deliveredicon.png"
import deliverediconactive from "../assets/images/deliverediconactive.png"

export const featuredata = [
    {
        featurename : "Cafe",
        featureimg : featureimg1
    },
    {
        featurename : "Restro",
        featureimg : featureimg2
    },
    {
        featurename : "Home Delivery",
        featureimg : featureimg3
    }
]

export const productdata = [
    {
        
    }
]

export const timelineitems = {
    "Order Placed" : {img : placedicon, activeimg : placediconactive},
    "Confirmed" : {img : confirmedicon, activeimg : confirmediconactive},
    "Preparing" : {img : preparingicon, activeimg : preparingiconactive},
    "Ready" : {img : ready, activeimg : readyactive},
    "Out For Delivery" : {img : outfordelivery, activeimg : outfordeliveryactive},
    "Delivered" : {img : deliveredicon, activeimg : deliverediconactive},
}

export function checkExistanceOrderById(orderlist, id){
    var consist = false
    orderlist.filter((element) => {
        if(element._id === id){
            consist = true
        }
    })
    return consist
}