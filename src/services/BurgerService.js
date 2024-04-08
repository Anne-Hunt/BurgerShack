import { dbContext } from "../db/DbContext.js"

class BurgerService {

    async getBurgers() {
        const burger = await dbContext.Burgers.find()
        return burger
    }

    async createBurger(meatData) {
        const burger = await dbContext.Burgers.create(meatData)
        return burger
    }

    async trashBurger(burgerId) {
        const burgerToTrash = await dbContext.Burgers.findById(burgerId)
        if (!burgerToTrash) throw new Error(`burger not on menu already ${burgerId}`)
        await dbContext.Burgers.deleteOne({ _id: burgerId })
    }

}

export const burgerService = new BurgerService()