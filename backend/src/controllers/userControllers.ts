import { Request, Response } from "express";
import { isAuthenticated } from "../middlewares/auth";

import { ObjectId } from "mongodb";

import {
  BadRequestError,
  DoubleReportError,
  NotFoundError,
} from "../helpers/api-errors";

import UserModel from "../models/user";

import {
  hashPassword,
  isValidEmail,
  isValidCPF,
  compareHashedPassword,
} from "../utils/utils";

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, cpf, address, email, password } = req.body;

  if (!firstName || !lastName || !cpf || !address || !email || !password) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "All the request arguments were not provided.",
    });
  }

  const hasUser = await UserModel.findOne({ $or: [{ cpf }, { email }] });
  if (hasUser) {
    const { statusCode, errorCode } = DoubleReportError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "User already exists.",
    });
  }

  if (!isValidEmail(email)) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "Email format is not valid.",
    });
  }

  if (!isValidCPF(cpf)) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "CPF not valid.",
    });
  }

  const hashedPassword = await hashPassword(password);
  const name = `${firstName} ${lastName}`;

  await UserModel.create({
    name,
    cpf,
    address,
    email,
    password: hashedPassword,
    type: "CLIENT",
  });

  return res
    .status(201)
    .json({ statusCode: 201, message: "User created with success." });
};

export const login = async (req: Request, res: Response) => {
  if (req.session.userData) {
    return res.status(200).json({
      message: "User already logged in",
      typeOfClient: req.session.userData.typeOfClient,
    });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "Email and password are required.",
    });
  }

  if (!isValidEmail(email)) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "Invalid email format.",
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    const { statusCode, errorCode } = NotFoundError("user");
    return res.status(statusCode).json({
      errorCode,
      error_description: "User not found.",
    });
  }

  const isPasswordCorrect = await compareHashedPassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "Incorrect password.",
    });
  }

  req.session.userData = {
    id: String(user._id),
    email: user.email,
    typeOfClient: user.type,
    cpf: user.cpf,
    name: user.name,
    address: user.address,
  };

  return res.status(200).json({
    message: "Login successful.",
    typeOfClient: user.type,
  });
};

export const logout = async (req: Request, res: Response) => {
  if (!req.session.userData) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "User is not logged in.",
    });
  }

  req.session.userData = undefined;

  return res.status(200).json({ message: "Logout Successful" });
};

export const editData = async (req: Request, res: Response) => {
  const paramsToBeEdited = req.body;
  const userId = req.session.userData?.id;

  const updateUser = await UserModel.updateOne(
    { _id: new ObjectId(userId) },
    { $set: paramsToBeEdited }
  );

  if (updateUser.matchedCount === 0) {
    const { statusCode, errorCode } = NotFoundError("user");
    return res.status(statusCode).json({
      errorCode,
      error_description: "User not found.",
    });
  }

  res.status(200).json({
    message: "User updated successfully",
    updatedCount: updateUser.modifiedCount,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const deletedUser = await UserModel.deleteOne({ _id: new ObjectId(userId) });

  if (deletedUser.deletedCount === 0) {
    const { statusCode, errorCode } = NotFoundError("user");
    return res.status(statusCode).json({
      errorCode,
      error_description: "User not found.",
    });
  }

  res.status(200).json({
    message: "User deleted successfully",
    updatedCount: deletedUser.deletedCount,
  });
};

export const getProfile = (req: Request, res: Response) => {
  if (!req.session.userData) {
    return res.status(401).json({
      errorCode: "USER_NOT_AUTHENTICATED",
      error_description:
        "User is not authenticated. Please login to access the profile.",
    });
  }

  const { name, email, cpf, address } = req.session.userData;

  if (!name || !email || !cpf || !address) {
    return res.status(400).json({
      errorCode: "USER_PROFILE_INCOMPLETE",
      error_description:
        "Some user profile data is missing. Please ensure the profile is complete.",
    });
  }

  return res.status(200).json({
    message: "User profile retrieved successfully",
    profile: {
      name,
      email,
      cpf,
      address,
    },
  });
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await UserModel.find(
      { type: "CLIENT" },
      { name: 1, _id: 1 }
    );

    if (clients.length === 0) {
      const { statusCode, errorCode } = NotFoundError("clients");
      return res.status(statusCode).json({
        errorCode,
        error_description: "No clients found.",
      });
    }

    return res.status(200).json({
      message: "Clients retrieved successfully.",
      clients,
    });
  } catch (error) {
    const { statusCode, errorCode } = BadRequestError();
    return res.status(statusCode).json({
      errorCode,
      error_description: "An error occurred while retrieving clients.",
    });
  }
};
