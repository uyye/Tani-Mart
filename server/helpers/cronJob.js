const { Op } = require("sequelize");
const {Presale, Product} = require("../models")
const cron = require("node-cron")

cron.schedule("0 * * * *", async ()=>{
    console.log("Running presale update job as ", new Date());

    try {
        const now = new Date()
        const presaleProduct = await Presale.findAll({
            where:{endDate:{[Op.lt]:now}},
            include:{model:Product}
        })

        for(let presale of presaleProduct){
            await Product.update(
                {productStatus:"regular" },
                {where:{id :presale.productId}}
            )
            await Presale.destroy({ where: { productId: presale.productId } });
        }
        console.log(`${presaleProducts.length} presale products updated.`);
    } catch (error) {
        console.log(error);
        
    }
})

