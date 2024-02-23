import styles from "./DropdownMenu.module.css";

const DropdownContainer = ({
  options,
  onSelect,
  isTimeDropdownToggle = false,
}) => {
  return (
    <div
      className={styles.dropdownMenu}
      // style={{
      //   transform: isTimeDropdownToggle ? "translateX(-30%)" : undefined,
      // }}
    >
      <ul>
        {options?.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(option.action)}
            className={
              option.label.toLowerCase() === "delete" ? styles.delete : ""
            }
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownContainer;
