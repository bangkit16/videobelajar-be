import { email, z } from "zod";

export type PayloadJWT = {
  id: number,
  countryCode: string,
  fullname: string,
  username: string,
  email: string,
  phoneNumber: string,
  profileImage: string,
}

export const LoginSchema = z.object({
  body: z.object({
    email: email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema.shape.body>;

