import React from "react";
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { searchValue: "" };

  onClick = () => {
    const { onClick } = this.props;
    onClick && onClick(this.state.searchValue);
  };

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const { label } = this.props;
    const { searchValue } = this.state;
    return (
      <div>
        <FormControl variant="outlined">
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            id="outlined-searchbar"
            type="text"
            value={searchValue}
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={this.onClick}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>
    );
  }
}
