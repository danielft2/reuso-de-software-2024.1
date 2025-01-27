import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Título deve ter no mínimo 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição deve ter no mínimo 2 caracteres.",
  }),
  workload: z.string().refine(
    (value) => {
      const number = Number(value);
      return Number.isInteger(number) && number >= 1;
    },
    "A carga horária deve ser maior que 0."
  ),
});
