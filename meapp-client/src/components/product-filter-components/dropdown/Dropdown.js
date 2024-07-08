import React from "react";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import content from "../../../data/content.json"
import classes from "./Dropdown.module.css"

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
        color: "#BD1C4D",
      },
    },
  };

const names = content.megamaList;

function getStyles(name, megamaList, theme) {
  return {
    fontWeight:
    megamaList.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelect = ({megamaList, setMegamaList}) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setMegamaList(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
        if (value.includes("")) {
            setMegamaList([]);
        }
    };

  return (
    <div className={classes.dropdown}>
        <CacheProvider value={cacheRtl}>
            <FormControl className={classes.formControl} 
                sx={{ 
                    m: 1, 
                    width: 200,
                    }}>
                <InputLabel id="demo-multiple-name-label"> מגמה: </InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={megamaList}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                <MenuItem value="">
                    <em style={{fontWeight: "700"}}>כל המגמות</em>
                </MenuItem>
                {names.map((name) => (
                    <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, megamaList, theme)}
                    >
                    {name}
                    </MenuItem>
                ))}
                </Select>
                <FormHelperText>*ניתן לבחור מספר מגמות</FormHelperText>
            </FormControl>
      </CacheProvider>
    </div>
  );
}

export default MultipleSelect;