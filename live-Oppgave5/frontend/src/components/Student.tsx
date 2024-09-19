import Avatar from "./Avatar";
import { Student as StudentProps} from "./types";


export default function Student(props: StudentProps) {
    const {id, name} = props;
    return (
        <div>
            <Avatar name={name} />
            <p className= 'student-name'>{name}</p>
        </div>
    );
}