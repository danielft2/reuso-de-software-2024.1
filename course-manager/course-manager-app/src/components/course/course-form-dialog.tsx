import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseForm } from "./course-form";
import { useSearchParams } from "react-router";

type CourseFormDialogProps = {
  courseId: string | null;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  onDialogClose: () => void;
};

export function CourseFormDialog({
  onDialogClose,
  isDialogOpen,
  setIsDialogOpen,
  courseId,
}: CourseFormDialogProps) {
  const [_, setSearchParams] = useSearchParams();

  function closeModal(value: boolean) {
    if (courseId) setSearchParams({ edit: "" });
    setIsDialogOpen(value);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {courseId ? "Editar Curso" : "Novo Curso"}
          </DialogTitle>
          <DialogDescription>Preencha os campos abaixo.</DialogDescription>
        </DialogHeader>
        <CourseForm
          courseId={courseId}
          onSubmittedSuccessfully={onDialogClose}
        />
      </DialogContent>
    </Dialog>
  );
}
