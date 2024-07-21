const {StatusCodes}= require('http-status-codes');
const {UserRepository}=require('../repositories');
const AppError=require('../utils/errors/app-error');


const {
  checkPassword,
  createToken,
 
} = require("../utils/common/auth");

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

async function signin(data) {
    try {
      const user = await userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new AppError("User not found!", StatusCodes.NOT_FOUND);
      }
      const isPasswordValid = checkPassword(data.password, user.password);
     
      if (isPasswordValid == false) {
        throw new AppError("Invalid password!", StatusCodes.BAD_REQUEST);
      }
      const token = createToken({ id: user.id, email: user.email });
      return token;
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "Something went wrong",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
module.exports={
    create,
    signin
}