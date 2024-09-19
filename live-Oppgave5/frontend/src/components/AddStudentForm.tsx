import React, { useState } from "react"

type AddStudentFormProps = {
    onAddStudent: ({name}: {name:string}) => void
};

export default function AddStudentForm(props: AddStudentFormProps) {
    const {onAddStudent} = props
    const [name, setName] = useState("");
    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;
        onAddStudent({name})
        setName("")
    }

    return <form className="add-student-form">
<label htmlFor="name">Navn</label>
<input type="text" id="name" placeholder="Student navn" value={name} onChange={(e) => setName(e.target.value)}/>
<button type="submit">Legg til student</button>

    </form>
}