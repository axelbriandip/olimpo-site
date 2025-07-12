import PropTypes from "prop-types";

const PageHeader = ({ title, description, children }) => (
  <header className="page-header">
    <div className="page-header__content">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  </header>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PageHeader;