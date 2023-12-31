import { object, number, TypeOf, string, literal, union } from "zod"

const payload = {
  body: object({
    name: string({
      required_error: "Name is required"
    }),
    genre: string({
      required_error: "Genres is required"
    }),
    time: number({
      required_error: "Time is required"
    }).min(0).max(168),
    price: number({
      required_error: "Price is required"
    }),
    renter: string({
      required_error: "Renter is required"
    }).email("Not a valid email address!")
  }).strict()
}

const params = {
  params: object({
    id: string({
      required_error: "Rented movie id is required"
    })
  })
}

const updateTimeMethod = {
  body: object({
    method: union([literal("+"), literal("-")])
  })
}

export const getRentedMovieSchema = object({
  ...params
})

export const getRentedMoviesByEmailSchema = object({
  params: object({
    email: string({
      required_error: "Rented movie id is required"
    }).email("Not a valid email address!")
  })
})

export const addRentedMovieSchema = object({
  ...payload
})

// export const updateRentedMovieSchema = object({
//   ...payload,
//   ...params
// })

export const updateRentedMovieTimeSchema = object({
  ...updateTimeMethod,
  ...params
})

export const removeRentedMovieSchema = object({
  ...params
})

export type GetRentedMovieInput = TypeOf<typeof getRentedMovieSchema>
export type GetRentedMoviesByEmailInput = TypeOf<typeof getRentedMoviesByEmailSchema>
export type AddRentedMovieInput = TypeOf<typeof addRentedMovieSchema>
// export type UpdateRentedMovieInput = TypeOf<typeof updateRentedMovieSchema>
export type UpdateRentedMovieTimeInput = TypeOf<typeof updateRentedMovieTimeSchema>
export type RemoveRentedMovieInput = TypeOf<typeof removeRentedMovieSchema>