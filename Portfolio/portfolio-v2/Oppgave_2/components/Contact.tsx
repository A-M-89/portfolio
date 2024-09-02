type Contact = {
    email: string,
  };
  
  export default function Contact(props: Contact) {
    return (
      <>
        <h2><p>Student E-mail: {props.email}!.</p></h2>
      </>
    );
  }