import { useState } from "react";
import { DatePicker as RangePicker} from 'antd';

import "react-datepicker/dist/react-datepicker.css";
import './date-select.styles.scss';

function DatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <RangePicker />
    );
}

export default DatePicker;