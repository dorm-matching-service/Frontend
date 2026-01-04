"use client";

import { useChecklistOrchestrator } from "@/hooks/checklist/useChecklistOrchestrator";
import ChecklistEditForm from "../_components/ChecklistEditForm";

export default function ChecklistEditPage() {
  const { loading, saving, error, formState, setFormState, save } =
    useChecklistOrchestrator();

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <ChecklistEditForm
      formState={formState}
      setFormState={setFormState}
      saving={saving}
      onSubmit={save}
    />
  );
}
