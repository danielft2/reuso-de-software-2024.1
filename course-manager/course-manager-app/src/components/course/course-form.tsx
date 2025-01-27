import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/domain/schemes/course";
import { api } from "@/api";
import { useCallback, useEffect } from "react";

type CourseFormProps = {
  courseId: string | null;
  onSubmittedSuccessfully: () => void;
};

export function CourseForm({
  onSubmittedSuccessfully,
  courseId,
}: CourseFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      workload: "",
    },
  });

  const getCourseDetails = useCallback(async () => {
    try {
      const { data } = (await api.get(`/cursos/${courseId}`)).data;
      form.reset(data);
    } catch (error) {
      console.error(error);
    }
  }, [courseId, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const method = courseId ? "put" : "post";
    const url = `${courseId ? `/cursos/${courseId}` : "/cursos"}`;

    try {
      await api.request({ url, method, data });
      onSubmittedSuccessfully();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (courseId) getCourseDetails();
  }, [courseId, getCourseDetails]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workload"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carga Horária</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Confirmar</Button>
      </form>
    </Form>
  );
}
