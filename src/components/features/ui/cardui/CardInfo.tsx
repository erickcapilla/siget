import { ExclamationOutline } from "@/components/icons"
import { Link } from "@nextui-org/react";

interface Props {
  title: string;
  description: string;
  color: "warning" | "success" | "danger";
  href?: string;
}

export const CardInfo = ({ title, description, color, href }: Props) => {
  const colors = {
    warning: "bg-warning-50 text-warning-700 border-warning-500",
    success: "bg-success-50 text-success-700 border-success-500",
    danger: "bg-danger-50 text-danger-700 border-danger-500",
  }
  const classes = `flex gap-2 w-full h-auto p-2 border rounded-md ${colors[color]}`
  return (
    <section className={classes}>
      <ExclamationOutline size={30} />
      <div className="w-[95%]">
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <Link className="text-xs" href={href}>{description}</Link>
      </div>
    </section>
  )
}