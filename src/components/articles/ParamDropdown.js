import { useState, useEffect } from 'react';
import randomKey from '../../utils/randomKeyGenerator';
import './ParamDropdown.css';

function ParamDropdown(props) {
  const [filterActive, setFilterActive] = useState(false);
  const { values, selection, setSelection } = props;

  useEffect(() => {
    if (filterActive) {
      setFilterActive(false);
    }
  }, [selection, filterActive]);

  const changeSelection = (event) => {
    const { value } = event.target;
    setFilterActive(true);
    setSelection(value);
  };

  return (
    <div className="navigation">
      <select
        className="navigation__drop-down"
        onChange={(e) => changeSelection(e)}
        value={selection}
      >
        <option value="" disabled>
          Select from below
        </option>

        {values.map((currentValue) => (
          <option value={currentValue.value} key={`${currentValue}_${randomKey()}`}>
            {currentValue.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ParamDropdown;
