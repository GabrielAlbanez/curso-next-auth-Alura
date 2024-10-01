import styles from './label.mudule.css'

export const Label = ({ children, ...rest }) => {
    return <label {...rest} className={styles.label}>
        {children}
    </label>
}