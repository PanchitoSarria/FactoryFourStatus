import styles from './Styles.module.scss'

const ApiNameCard = ({success, message, hostname, time, name}) => {
    const status = success ? 'Healthy' : 'Error'
    const statusStyle = success ? 'green' : 'red'
    const timeRefresh = new Date().toLocaleTimeString()
    
    return (
        <article className={styles.cardItem}>
            <div className={styles.cardItemWrapper}>
                <h2 className={styles.cardTitle}>{name}</h2>
                <p className={styles.health} style={{backgroundColor: statusStyle}}>
                    {status}
                </p>
                <p>{hostname}</p>
                <p style={{color: `${success ? 'inherit' : 'red'}`}}>{success ? timeRefresh : '404'}</p>
            </div>
        </article>
    )
}

export default ApiNameCard
