import { api } from "@/api";
import { Course } from "@/domain/entities/course";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSearchParams } from "react-router";

type CourseTableProps = {
  data: Course[];
  onCourseDelete: () => void;
};

export function CourseTable({ data, onCourseDelete }: CourseTableProps) {
  const [_, setSearchParams] = useSearchParams();

  async function handleDeleteCourse(id: string) {
    try {
      await api.delete(`/cursos/${id}`);
      onCourseDelete();
    } catch (error) {
      console.error(error);
    }
  }

  function handleEditCourse(id: string) {
    setSearchParams({ edit: id });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Carga Horária</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.id}</TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>{course.workload}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Ellipsis />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Curso</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditCourse(course.id)}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteCourse(course.id)}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
