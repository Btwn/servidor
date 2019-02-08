'use strict'

const arbv= use('App/Models/Arbv')
 
class ArbvController {
    async All ({ request, response }) {
        const users = await arbv.all()
        return response.ok(users)  
    }
    async AllTitle ({ request, response }) {
        const users = await arbv.findBy('title',request.param())
        return response.ok(users)  
    }
}
module.exports = ArbvController