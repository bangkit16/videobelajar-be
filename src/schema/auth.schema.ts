import { email, z } from "zod";

export type PayloadJWT = {
  id: number;
  countryCode: string;
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
};

export const LoginSchema = z.object({
  body: z.object({
    email: email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema.shape.body>;

export const RegisterSchema = z.object({
  body: z.object({
    countryCode: z.string().min(1, "Country code tidak boleh kosong"),
    fullname: z.string().min(1, "Nama lengkap tidak boleh kosong"),
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: email("Email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    phoneNumber: z.string().min(1, "Nomor telepon tidak boleh kosong"),
    profileImage: z.string().url("URL profil tidak valid").optional(),
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema.shape.body>;

export const VerifyEmailSchema = z.object({
  params: z.object({
    token: z.string().min(1, "Token tidak boleh kosong"),
  }),
});

export type VerifyEmailSchemaType = z.infer<typeof VerifyEmailSchema.shape.params>;
