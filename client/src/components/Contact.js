import styles from "./contact.module.css"

function Contact (props){
    console.log(props.username)

    return(
        <div className={styles["contact-container"]}>
            <span>{props.username}</span>
        </div>
    )
}

export default Contact ;