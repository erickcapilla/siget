import { DegreesAdmin, GraduationsAdmin } from "@/components/features";
import { Divider } from "@nextui-org/react";

export const AdminSection = () => {
  return (
    <section className="grid gap-5">
      <DegreesAdmin />
      <Divider />
      <GraduationsAdmin />
    </section>
  )
}