import { Input } from "@nextui-org/react"

export const StudentForm = () => {
  return (
    <form className="flex flex-col gap-3 w-full">
      <Input label="Nombre" placeholder="Nombre" />
      <Input label="Apellido paterno" placeholder="Apellido paterno" />
      <Input label="Apellido materno" placeholder="Apellido materno" />
      <Input label="Correo electrónico" placeholder="Correo electrónico" />
      <Input label="Teléfono" placeholder="Teléfono" />
      <Input label="Dirección" placeholder="Dirección" />
      <Input label="Fecha de nacimiento" placeholder="Fecha de nacimiento" />
      <Input label="CURP" placeholder="CURP" />
      <Input label="RFC" placeholder="RFC" />
      <Input label="NSS" placeholder="NSS" />
      <Input label="Número de cuenta" placeholder="Número de cuenta" />
      <Input label="Número de seguro" placeholder="Número de seguro" />
    </form>
  )
}