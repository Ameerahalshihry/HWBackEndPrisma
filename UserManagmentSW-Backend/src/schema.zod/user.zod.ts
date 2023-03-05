import { TypeOf, z } from "zod";

export const Usertype = z.object({

    body: z.object({
        //--------- userName--------------//
        username: z
          .string({ required_error: "UserName is required",
                    invalid_type_error: "UserName is required" })
          .min(3, "UserName must be mare than 3 char"),
         //--------- userRole--------------//
        role: z.enum(["USER", "ADMIN"], {
          required_error: "Role is required",
        }),
        //--------- userPassword--------------//
        password: z
          .number({
            required_error: "password is required",
          })
          .min(6, "password must be mare than 6 digit"),
        //--------- userEmail--------------//
          email: z
            .string({
              required_error: "email is required",
            })
            .email(),
          //--------- userAge--------------//
          age: z
          .number({
            required_error: "age is required",
          })
          .min(20, "age must more than 20 years"),
          //--------- userJoiningYear--------------//
          joiningYear: z
          .string({
            required_error: "joining Year is required",
          })
      }),
    });


export type Usertypeschema = TypeOf<typeof Usertype>["body"]
