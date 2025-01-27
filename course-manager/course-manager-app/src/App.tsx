import { useEffect, useState } from "react";
import { api } from "./api";
import { CourseFormDialog } from "./components/course/course-form-dialog";
import { CourseTable } from "./components/course/course-table";
import { Button } from "./components/ui/button";
import { Course } from "./domain/entities/course";
import { Response } from "./infra/http/response";
import { useSearchParams } from "react-router";

export function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const courseIdSearchParams = searchParams.get("edit");

  async function getCourses() {
    try {
      const response = (await api.get<Response<Course[]>>("/cursos")).data;
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function closeDialog() {
    getCourses()
    setIsDialogOpen(false);
  }

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (courseIdSearchParams) setIsDialogOpen(true);
  }, [courseIdSearchParams])

  return (
    <main className="max-w-[1220px] mx-auto p-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="font-medium text-lg">Lista de Cursos</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Novo Curso</Button>
      </div>

      <CourseTable data={courses} onCourseDelete={getCourses} />

      <CourseFormDialog
        courseId={courseIdSearchParams}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        onDialogClose={closeDialog}
      />
    </main>
  );
}
