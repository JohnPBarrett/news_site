import { useState, useEffect } from 'react';
import randomKey from '../../utils/randomKeyGenerator';

function ParamDropdown(props) {
  const [filterActive, setFilterActive] = useState(false);
  const { setDropDown, values, selection, setSelection } = props;

  useEffect(() => {
    if (filterActive) {
      setFilterActive(false);
      if (selection === '') {
        setDropDown('');
      } else if (selection !== '') {
        setDropDown(selection);
      }
    }
  }, [selection, filterActive]);

  const changeSelection = (event) => {
    const filteredValue = event.target.value;
    setSelection(filteredValue);
    setFilterActive(true);
  };

  return (
    <nav className="navigation">
      <select
        className="navigation__drop-down"
        onChange={(e) => changeSelection(e)}
        value={selection}
      >
        <option value="" disabled>
          Select from below
        </option>
        <option value="all">Show all</option>
        {values.map((currentValue) => (
          <option value={currentValue.value} key={`${currentValue}_${randomKey()}`}>
            {currentValue.value}
          </option>
        ))}
      </select>
    </nav>
  );
}

export default ParamDropdown;
