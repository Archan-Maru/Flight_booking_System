const {CityRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')
const cityRepository=new CityRepository();
const {StatusCodes}=require('http-status-codes');

async function createCity(data){
    try {
        const city=await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach(err => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const cities=await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Cannot fetch data of all cities',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
      try {
        const city=await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested city is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot fetch data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response=await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you want to delete is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot fetch data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data){
    try {
        const city=await cityRepository.update(id,data);
        return city;
    } catch (error) {
         if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested city is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot edit data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={ 
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}