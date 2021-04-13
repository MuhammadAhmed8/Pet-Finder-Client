import { Spin } from "antd";
import PropTypes from "prop-types";

const FullPageLoader = ({ classNames }) => {
  return (
    <div className={`full-page-loader ${classNames || ""}`}>
      <Spin />
    </div>
  );
};

// PropTypes
FullPageLoader.propTypes = {
  classNames: PropTypes.string,
};

export default FullPageLoader;
