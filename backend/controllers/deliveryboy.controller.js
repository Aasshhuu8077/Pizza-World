import { deliveryboyModel } from "../models/deliveryboy.model.js";

export async function getAvailableDeliveryBoyList(req, res) {
    /**
     * controller to return the list of the delivery boys that are available
     * only admin can access this route
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     * 
     */
    try {
        var query = deliveryboyModel.find({ isAvailable: true });
        var result = await query.exec();
        return res.status(200).json({
            msg: "successfull",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: "error",
            data: error
        });
    }

}

export const registerDeliveryBoy = async (req, res) => {
    /**
     * register the delivery boy to the database
     * only admin can access this route
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     * 
     */

    try {
        let result = await deliveryboyModel.create(req.body);
        return res.status(200).json({
            msg: "successfull",
            data: result
        });
    }
    catch (err) {
        return res.status(400).json({
            msg: "error",
            data: err.message
        });
    }

}