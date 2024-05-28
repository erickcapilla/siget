import { LayoutItem } from "@/components/layouts"

export const NotificationItem = () => {
  return (
    <LayoutItem className="border-l-warning">
      <section className="flex flex-col gap-1">
        <p className="text-sm font-semibold">Titulo</p>
        <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </section>
    </LayoutItem>
  )
}