import * as z from 'zod'

export const detailsFormSchema = z.object({
  email: z.email('Invalid email'),
  country: z.string().optional(),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  adress: z.string().optional(),
  aditionalAdress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  delivery: z.string(),
})

export type TDetailsForm = z.infer<typeof detailsFormSchema>
