import { student } from "./Student.js";
function Students() {
  return <>
    <ul className="students">
    {student.map((person)=>{
        return <li key={person.name}>{person.name}</li>
    })}  
    </ul>
  </>;
}
export default Students; 