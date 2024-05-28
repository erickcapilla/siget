
interface Props {
  id: string;
}

export const Information = ({ id }: Props) => {
  console.log(id)
  return (
    <div>
      <h1>Information</h1>
    </div>
  )
}