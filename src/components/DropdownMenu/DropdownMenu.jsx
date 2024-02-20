import styles from "./DropdownMenu.module.css";

const DropdownMenu = ({ options, onSelect, xPos, yPos }) => {
  return (
    <div
      className={styles.dropdownMenu}
      // style={{ top: yPos, left: xPos }}
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

export default DropdownMenu;
