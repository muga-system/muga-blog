import { PostArea } from "@/domain/Post";

export const AREA_OPTIONS: ReadonlyArray<{ value: PostArea; label: string }> = [
  { value: "procesos", label: "Procesos" },
  { value: "decisiones-arquitectura", label: "Decisiones de arquitectura" },
  { value: "hallazgos-implementacion", label: "Hallazgos de implementación" },
  { value: "resultados-trabajo-diario", label: "Resultados del trabajo diario" },
];

export function getAreaLabel(area: PostArea): string {
  const option = AREA_OPTIONS.find((item) => item.value === area);
  return option?.label ?? area;
}
