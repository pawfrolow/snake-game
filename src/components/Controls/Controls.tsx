import React from 'react'
import styles from './style.module.scss'

type ControlsType = {
    children: React.ReactNode
}

const Controls: React.FC<ControlsType> = ({ children }) => {
  return (
    <div className={styles.controls}>
        {children}
    </div>
  )
}

export default Controls
