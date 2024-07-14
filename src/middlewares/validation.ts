import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";

const ValidationMiddleware = (schema: Schema, property: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(
        property.toLowerCase() === "body" ? req.body : req.query,
        { abortEarly: false }
      );
      const valid = error == null;

      if (!valid) {
        const { details } = error;
        const errors = details.map((detail: Joi.ValidationErrorItem) => {
          return {
            field: detail.path[0],
            message: detail.message.replace(/"/g, ""),
          };
        });

        console.log("Validation Error: ", errors);
        return res.status(422).json({ error: errors });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default ValidationMiddleware;
