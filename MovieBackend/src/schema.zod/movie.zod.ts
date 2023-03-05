import { TypeOf, z } from "zod";

export const Movietype = z.object({
  
    body: z.object({
        //--------- movieName--------------//
        name: z
          .string({ required_error: "Name is required",
                    invalid_type_error: "Name is required" })
          .min(3, "Name must be mare than 3 char"),
         //--------- movieGenre--------------//
        genre: z.enum(["Drama", "Action", "Comedy"], {
          required_error: "Genre is required",
        }),
        // genre: z
        // .string({
        //     required_error: "genre is required",
        //     invalid_type_error: "genre must be a string"
        //     }),
        //--------- movieRating--------------//
        rating: z
          .number({
            required_error: "Rating is required",
          })
          .min(1, "Rating range between 1 t0 5")
          .max(5, "Rating range between 1 t0 5"),
          //--------- movieDuration--------------//
        duration: z
          .number({
            required_error: "Duration is required",
          })
          .min(60, "duration must more than 60 minutes"),
      }),
    });


export type Movietypeschema = TypeOf<typeof Movietype>["body"]
