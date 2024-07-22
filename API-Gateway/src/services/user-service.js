const {StatusCodes}= require('http-status-codes');
const {UserRepository}=require('../repositories');
const {RoleRepository}=require('../repositories');
const AppError=require('../utils/errors/app-error');


const {
  checkPassword,
  createToken,
  verifyToken,
 
} = require("../utils/common/auth");
const { ROLE } = require("../utils/common/enums");
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = ROLE;
const userRepository=new UserRepository();
const roleRepository = new RoleRepository();
async function create(data){
    try{
        const user=await userRepository.create(data);
        const role = await roleRepository.getRoleByName(CUSTOMER);
      
    user.addRole(role);
        return user;
        
    }catch (error) {
      console.error("Error creating user:", error);
        if (error.name == "SequelizeValidationError" || "SequelizeUniqueConstraintError") {
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
  async function isAuthenticated(token) {
    try {
      if (!token) {
        throw new AppError("Token is required!", StatusCodes.BAD_REQUEST);
      }
  
      const response = verifyToken(token);
      console.log("verifyToken response", response);
      const user = await userRepository.get(response.id);
      if (!user) {
        throw new AppError("User not found!", StatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (error.name == "JsonWebTokenError") {
        throw new AppError("Invalid token!", StatusCodes.BAD_REQUEST);
      }
      if (error.name == "TokenExpiredError") {
        throw new AppError("Token expired!", StatusCodes.BAD_REQUEST);
      }
    }
  }
  async function addRoleToUser(data) {
    try {
      console.log(data.id);
      const user = await userRepository.get(data.id);
      if (!user) {
        throw new AppError("User not found!", StatusCodes.NOT_FOUND);
      }
      const role = await roleRepository.getRoleByName(data.role);
      if (!role) {
        throw new AppError("Role not found!", StatusCodes.NOT_FOUND);
      }
      user.addRole(role);
      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Something went wrong while adding role to the user!",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async function isAdmin(id) {
    try {
      const user = await userRepository.get(id);
      if (!user) {
        throw new AppError("User not found!", StatusCodes.NOT_FOUND);
      }
      const adminrole = await roleRepository.getRoleByName(ADMIN);
      if (!adminrole) {
        throw new AppError("Admin role not found!", StatusCodes.NOT_FOUND);
      }
      return user.hasRole(adminrole);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw error;
    }
  }

  
module.exports={
    create,
    signin,
    isAuthenticated,
    addRoleToUser,
    isAdmin,
}