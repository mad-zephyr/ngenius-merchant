import { FC } from 'react'

import ArrowRight from './arrowRight.svg'
import CopyIcon from './copyIcon.svg'
import CouponIcon from './coupon.svg'
import CrossIcon from './crossIcon.svg'
import MinusIcon from './minus.svg'
import PlusIcon from './plus.svg'
import Question from './question.svg'
import Secure from './secureIcon.svg'
import ArrowSquareLeft from './squareArrowLeft.svg'

export type TIconNames =
  | 'arrowRight'
  | 'coupon'
  | 'minus'
  | 'plus'
  | 'question'
  | 'secure'
  | 'arrowSquareLeft'
  | 'crossIcon'
  | 'copyIcon'

type TIcon = {
  name?: TIconNames
  onClick?: () => void
}

export const Icon: FC<TIcon> = ({ name, onClick }) => {
  switch (name) {
    case 'arrowRight':
      return <ArrowRight onClick={onClick} />

    case 'coupon':
      return <CouponIcon onClick={onClick} />

    case 'minus':
      return <MinusIcon onClick={onClick} />

    case 'plus':
      return <PlusIcon onClick={onClick} />

    case 'question':
      return <Question onClick={onClick} />

    case 'secure':
      return <Secure onClick={onClick} />

    case 'arrowSquareLeft':
      return <ArrowSquareLeft onClick={onClick} />

    case 'crossIcon':
      return <CrossIcon onClick={onClick} />

    case 'copyIcon':
      return <CopyIcon onClick={onClick} />

    default:
      return <></>
  }
}
