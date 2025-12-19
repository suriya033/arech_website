import styles from "./PageHeader.module.css";

export default function PageHeader({ title, description }) {
    return (
        <div className={styles.header}>
            <div className="container">
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
        </div>
    );
}
