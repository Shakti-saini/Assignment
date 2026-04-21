const Models = require('../models');
const users = Models.users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userService = () => {


  const getUserByEmail = async (email) => {
    return await users.findOne({ where: { email: email } })
  };

  const addUser = async (data) => {
    return await users.create(data);
  };

  const deletedUser = async (id) => {
    return await users.destroy({
      where: {
        id: id,
      },
    })
  }

  const updatedUser = async (id)=>{
    return await users.findOne({where:{id:id}})
  }

  const allUsers = async (query) => {
    let allUsers = [];
    if (query && Object.keys(query).length == 0 && query.constructor == Object) {
      query = null;
    }
    if (!query) {
      allUsers = await users.findAll();
    } else {
      let offset = null;
      offset = +query.PageSize * (+query.PageNumber - 1);
      let q = {
        limit: +query.PageSize,
        offset: offset,
      };

      if (query.column && query.column != "null") {
        q["order"] = [
          [query.column, query.order]
        ];
      }
      allUsers = await users.findAndCountAll(q);
    }
    return allUsers;
  }

  const getuserbyid = async(id)=>{
    return await users.findOne({
      where:{
        id:id
      }
    })
  }

  const getallDoctors = async (query) => {

    const { limit, page } = query;
    const offset = (page - 1) * limit;

    const defaultLimit = 5;
    const defaultOffset = 0;

    const queryLimit = limit || defaultLimit;

    const queryOffset = offset || defaultOffset;

   try {
    const totalCount = await users.count()
    const result =await users.findAll({
      limit: queryLimit,
      offset: queryOffset,
      where: {
        role_id: 3
      }
    })
    return {result,totalCount};

   } catch (error) {

    console.error("Error in get all doctors:", error);

    throw error;
   }
  
  }


  return {
    getUserByEmail,
    addUser,
    deletedUser,
    allUsers,
    getuserbyid,
    updatedUser,
    getallDoctors
  };
}
module.exports = userService;
