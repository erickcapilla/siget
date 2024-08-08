import { CardUI } from '../../ui'
import { NoDegree } from './NoDegree'

export const DegreeProgressCard = () => {
  return (
    <CardUI
      title="Mi progreso - Titulación"
      className="h-full w-full"
    >
      <NoDegree />
    </CardUI>
  )
}