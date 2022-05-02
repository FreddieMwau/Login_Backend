// Validator so all inputs have values
import Joi  from "joi";


export const registerSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required().min(8).max(30) // minimun characters 8 and max of 30
})