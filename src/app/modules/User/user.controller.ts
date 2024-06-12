// import { Request, Response } from 'express';
// import { UserServices } from './user.service';
// import { TUser } from './user.interface';

// // Creating User
// const craeteUser = async (req: Request, res: Response) => {
//   try {
//     const userData: TUser = req.body;
//     const result = await UserServices.createUserIntoDB(userData);

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully!',
//       data: {
//         _id: result._id,
//         name: result.name,
//         email: result.email,
//         role: result.role,
//         phone: result.phone,
//         address: result.address,
//         createdAt: result.createdAt,
//         updatedAt: result.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const UserControllers = {
//   craeteUser,
// };
