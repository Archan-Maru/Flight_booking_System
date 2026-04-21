const {FlightRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')
const flightRepository=new FlightRepository();
const {StatusCodes}=require('http-status-codes');

async function createFlight(data){
    try {
        const flight=await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach(err => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }

        if(error.name=='SequelizeDatabaseError' || error.name=='SequelizeForeignKeyConstraintError'){
            throw new AppError(error.message,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id,data){
    try {
        const flight=await flightRepository.update(id,data);
        return flight;
    } catch (error) {
         if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested flight is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot edit data of flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={ 
    createFlight,
    updateFlight,
}