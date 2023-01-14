import React, { FC } from 'react'
import classNames from "classnames";
import styles from './style.module.scss'
import { DirectionsType } from '../../types/types';

type Props = {
    snake: boolean,
    food: boolean,
    head: boolean,
    direction: DirectionsType,
    is3D: boolean
}

const Cell: FC<Props> = ({ snake, food, head, direction, is3D }) => {
  return (
    <div className={classNames(
        styles.cell, 
        snake && styles.snake, 
        food && styles.food,
        head && styles.head,
        //head && styles[`head-${direction}`],
        is3D && styles.is3D

    )}>
        {/* head && <div className={styles.tongue} /> */}
        {food && <div className={styles.foodInner} />}
    </div>
  )
}

export default Cell
