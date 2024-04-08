import { burgerService } from "../services/BurgerService.js";
import BaseController from "../utils/BaseController.js";

export class BurgersController extends BaseController {
    constructor() {
        super('api/burgers');
        // this.router.get('/test', this.testingMeatSandwich)
        this.router.get('', this.getBurgers)
        this.router.post('', this.createBurger)
        this.router.delete('/:burgerId', this.trashBurger)
    }

    // testingMeatSandwich(request, response, next) {
    //     console.log('shake shack')
    //     response.send('liter of cola')
    // }

    async getBurgers(request, response, next) {
        try {
            const sandwiches = await burgerService.getBurgers()
            response.send(sandwiches)
        } catch (error) {
            next(error)
            console.error(error)

        }
    }

    async createBurger(request, response, next) {
        try {
            const meatData = request.body
            const sandwich = await burgerService.createBurger(meatData)
            response.send(sandwich)
        } catch (error) {
            next(error)
            console.error(error)
        }
    }

    async trashBurger(request, response, next) {
        try {
            const burgerId = request.params.burgerId
            await burgerService.trashBurger(burgerId)
            response.send("burger removed from menu")

        } catch (error) {
            next(error)

        }
    }
}