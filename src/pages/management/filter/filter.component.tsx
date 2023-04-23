import ButtonCreate from "../../../components/button-create/button-create.component";
import DatePicker from "../../../components/date-select/date-select.component";
import "./filter.styles.scss";

export default function Filter() {
  return (
    <div className="filter-container">
      <input
        placeholder="Search Id, Name..."
        type="text"
        name="text"
        className="search-box"
      ></input>
      <ButtonCreate/>
    </div>
  );
}
