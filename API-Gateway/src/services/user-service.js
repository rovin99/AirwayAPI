const {StatusCodes}= require('http-status-codes');
const {UserRepository}=require('../repositories');
const AppError=require('../utils/errors/app-error');
const userRepository=new UserRepository();

async function create(data){
    try{
        const response=await userRepository.create(data);
        return response;
    }catch (error) {
        if (error.name == "SequelizeValidationError") {
          let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
        }
        throw new AppError(
          "Cannot create a new User Object!",
          StatusCodes.INTERNAL_SERVER_ERROR
        ); 
      }
}

module.exports={
    create,
}