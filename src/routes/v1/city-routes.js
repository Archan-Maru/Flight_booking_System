const express=require('express');
const router=express.Router();
const {CityController}=require('../../controllers');
const {CityMiddlewares}=require('../../middlewares')


router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

router.get('/',CityController.getCities);

router.get('/:id',CityController.getCity);

router.patch('/:id',CityController.updateCity);

router.delete('/:id',CityController.destroyCity);



module.exports=router;