'use client'

import Wheel from './Wheel'
import S from "../styles/picker.module.css"

const ScrollPicker = () => {

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  const wheelStyles = {
    width: 100,
    height: 180,
    fontSize: 16
  }

  return (
    <div className={S.DatePicker}>
      <Wheel
        startNum={2010}
        endNum={2040}
        initialValue={currentYear}
        styles={wheelStyles}
      />
      <Wheel
        startNum={1}
        endNum={12}
        initialValue={currentMonth}
        styles={wheelStyles}
        isRepeating={true}
      />
      <Wheel
        startNum={1}
        endNum={31}
        initialValue={currentDate}
        styles={wheelStyles}
        isRepeating={true}
      />
    </div>
  )
}

export default ScrollPicker