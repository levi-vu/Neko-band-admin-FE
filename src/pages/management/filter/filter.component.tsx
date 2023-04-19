import ButtonCreate from "../../../components/button-create/button-create.component";
import DateSelect from "../../../components/date-select/date-select.component";
import "./filter.styles.scss";

export default function Filter() {
  return (
    <div className="div-flex">
      <input
        placeholder="Search Id, Name..."
        type="text"
        name="text"
        className="input"
      ></input>

      <DateSelect />
      <DateSelect />
      <ButtonCreate />
    </div>
  );
}
