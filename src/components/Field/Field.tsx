import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import styles from './style.module.scss'

type Props = {
    children: ReactNode,
    gameOver: boolean,
    is3d: boolean
}

const Field: FC<Props> = ({ children, gameOver, is3d }) => {
  return (
    <div 
        className={classNames(styles.field, gameOver && styles.gameOver, is3d && styles.is3d)}
    >
        {children}
    </div>
  )
}

export default Field
