import { useParams } from "react-router-dom";

export default function AssingProjectPage() {
  const { id } = useParams();

  return <div>project id {id}.</div>;
}
