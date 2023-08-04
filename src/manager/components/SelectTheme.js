import React, { useEffect, useState } from 'react';

import * as styled from './SelectTheme.styled';
import Toolbar from '../UI/Toolbar';
import Caption from '../UI/Caption';
import IconButton from '../UI/IconButton';

const SelectTheme = ({
  themeInfoList,
  // themeInd,
  setCurrent,
  themeSelector,
}) => {
  if (!themeInfoList) return 'No themes info';
  const count = themeInfoList.length;
  const isMulti = count > 1;
  const [selected, setSelected] = useState(
    Object.keys(themeSelector).map(key => themeSelector[key][0]),
  );
  useEffect(() => {
    const ind =
      themeInfoList.findIndex(theme => {
        return theme.name === selected.join('-');
      }) || 0;
    if (ind > -1) {
      setCurrent(ind);
    }
  }, [selected]);
  return (
    <styled.Container size={300}>
      <Toolbar>
        <Caption>{isMulti ? `${count} themes` : 'Single Theme'}</Caption>
      </Toolbar>
      <styled.ListHolder>
        {Object.keys(themeSelector).map((selectV, index) => {
          return (
            <styled.SelectHolder key={selectV}>
              <label htmlFor={selectV}>
                <styled.SelectHeading>{selectV}</styled.SelectHeading>
              </label>
              <styled.SelectBox
                name={selectV}
                onChange={event => {
                  setSelected(s => {
                    return s.map((element, i) => {
                      if (i === index) {
                        // Replace the element at the specified index with the new value
                        return event.target.value;
                      }
                      // Keep the existing element unchanged
                      return element;
                    });
                  });
                }}
              >
                {themeSelector[selectV].map(optionV => {
                  return (
                    <option key={optionV} value={optionV}>
                      {optionV}
                    </option>
                  );
                })}
              </styled.SelectBox>
            </styled.SelectHolder>
          );
        })}
        {/* <ul>
          {themeInfoList.map(({ name, theme }, ind) => {
            let colorList;
            if (
              theme.palette &&
              theme.palette.primary &&
              theme.palette.primary.main
            ) {
              colorList = materialPreview(theme);
            } else {
              const { flattenColors } = flattenTheme(theme);
              colorList = flattenColors.map(({ original }) => original);
            }
            return (
              <li key={name}>
                <styled.Theme
                  onClick={() => setCurrent(ind)}
                  current={ind === themeInd}
                  single={isSingle}
                >
                  <styled.AvatarHolder single={isSingle}>
                    <styled.ThemeAvatar>
                      <styled.Swatch theme={colorList} />
                    </styled.ThemeAvatar>
                  </styled.AvatarHolder>
                  <styled.Title single={isSingle}>{name}</styled.Title>
                </styled.Theme>
              </li>
            );
          })}
        </ul> */}
      </styled.ListHolder>
      <Toolbar footer>
        <IconButton title="download" />
      </Toolbar>
    </styled.Container>
  );
};

export default SelectTheme;
