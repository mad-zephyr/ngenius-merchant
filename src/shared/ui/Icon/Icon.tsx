import { FC } from 'react'

import ArrowRight from './arrowRight.svg'
import CheckIcon from './checkIcon.svg'
import CopyIcon from './copyIcon.svg'
import CouponIcon from './coupon.svg'
import CrossIcon from './crossIcon.svg'
import LoaderIcon from './loader.svg'
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
  | 'loader'
  | 'check'

type TIcon = {
  name?: TIconNames
  onClick?: () => void
}

export const Icon: FC<TIcon> = ({ name, onClick }) => {
  switch (name) {
    case 'arrowRight':
      return <ArrowRight />

    case 'coupon':
      return <CouponIcon />

    case 'minus':
      return <MinusIcon onClick={onClick} />

    case 'plus':
      return <PlusIcon onClick={onClick} />

    case 'question':
      return <Question onClick={onClick} />

    case 'secure':
      return <Secure />

    case 'arrowSquareLeft':
      return <ArrowSquareLeft />

    case 'crossIcon':
      return <CrossIcon onClick={onClick} />

    case 'copyIcon':
      return <CopyIcon onClick={onClick} />

    case 'loader':
      return <LoaderIcon />

    case 'check':
      return <CheckIcon />

    default:
      return <></>
  }
}
