import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { zodError } from "zod";


export const errorHandling: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      message: error.message
    })
    return
  }

  if (error instanceof zodError) {
    response.status(400).json({ 
      message: "Validation error",
      issues: error.format()
     })
  }

  response.status(500).json({ message: error.message || "Internal Server Error" })
}