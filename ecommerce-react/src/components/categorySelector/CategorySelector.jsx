import styles from "./categorySelector.module.css";
import { categoryTranslations } from "../../utils/categoryTranslations";

const CategorySelector = ({
  label,
  value,
  onChange,
  disabled = false,
  isForm = false,
}) => {
  return (
    <div
      className={`${styles.categorySelector} ${
        isForm ? styles.formCategory : ""
      }`}
    >
      <label htmlFor="categories-select">{label}:</label>
      <select
        id="categories-select"
        name="categories"
        onChange={onChange}
        value={value}
        className={`${styles.select} ${isForm ? styles.formSelect : ""}`}
        disabled={disabled}
      >
        <option value="">--Choisir une catégorie--</option>
        {Object.entries(categoryTranslations).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector;
