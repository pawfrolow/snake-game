import styles from './style.module.scss'

const GameOver = () => {
  return (
    <div 
        className={styles.gameOver}
    >
        <p data-text="GAME OVER">GAME OVER</p>
    </div>
  )
}

export default GameOver
