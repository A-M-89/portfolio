

type AvatarProps = {
    name: String
};

export default function Avatar(props: AvatarProps){
    const {name} = props ;
    const firstLetter = name.charAt(0).toUpperCase()
    return <p className="avatar">{firstLetter}</p>;
};