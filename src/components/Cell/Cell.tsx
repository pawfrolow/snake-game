import React, { FC } from 'react'
import classNames from "classnames";
import styles from './style.module.scss'

type Props = {
    snake: boolean,
    food: boolean,
    is3D: boolean
}

const Cell: FC<Props> = ({ snake, food, is3D }) => {
  return (
    <div className={classNames(
        styles.cell, 
        snake && styles.snake, 
        food && styles.food,
        is3D && styles.is3D
    )}>
        {food && <div className={styles.foodInner} />}
    </div>
  )
}

export default Cell
