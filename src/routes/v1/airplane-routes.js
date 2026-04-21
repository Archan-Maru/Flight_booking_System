const express=require('express');
const router=express.Router();
const {AirplaneController}=require('../../controllers');
const {AirplaneMiddlewares}=require('../../middlewares')


router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);

router.get('/',AirplaneController.getAirplanes);

router.get('/:id',AirplaneController.getAirplane);

router.patch('/:id',AirplaneController.updateAirplane);

router.delete('/:id',AirplaneController.destroyAirplane);



module.exports=router;