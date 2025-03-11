import { UserSchema } from "@/entities/User";
import { api } from "@/shared/api/api";
import { z } from "zod";

const ResponseSchema = z.array(UserSchema);

export async function getUsers() {
  const response = await api.get("/users");
  const data = ResponseSchema.parse(response.data);

  return data;
}
