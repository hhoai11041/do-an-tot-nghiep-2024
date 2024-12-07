import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NewsList from "./NewsList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NewsEvent = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categoryNews1 = "Tin tức và sự kiện";
  const categoryNews2 = "Du lịch qua hình ảnh";

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tin tức - sự kiện" {...a11yProps(0)} />
          <Tab label="Du lịch qua hình ảnh" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* tin tức và sự kiện  */}
      <CustomTabPanel value={value} index={0}>
        <NewsList categoryNews={categoryNews1}></NewsList>
      </CustomTabPanel>
      {/* danh sách  */}
      <CustomTabPanel value={value} index={1}>
        <NewsList categoryNews={categoryNews2}></NewsList>
      </CustomTabPanel>
    </Box>
  );
};

export default NewsEvent;
