


// actions are intended for GET,POST, PUT, DELETE actions

import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

// this action is for creating/updating a user
export const createOrUpdateUser = async (

    // comes from Clerk
    id,
    first_name,
    last_name,
    image_url,
    email_addresses
  ) => {
    try {
      
      // connect to MongoDB
      await connect();
       
      // from Schema/model
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        {
            // $set to MongoDB
          $set: {
            // this structure
            //Schema: Clerk
            firstName: first_name,
            lastName: last_name,
            profilePicture: image_url,
            email: email_addresses[0].email_address,
          },
        },
        { upsert: true, new: true }
      );

      return user;

    } catch (error) {
      console.log('Error: Could not create or update user:', error);
    }
  };
  
 // this action is for deleting a user
  export const deleteUser = async (id) => {
    try {

      // connect to MongoDB
      await connect();
      
      // from Schema/model
      await User.findOneAndDelete({ clerkId: id });

    } catch (error) {
      console.log('Error: Could not delete user:', error);
    }
  };