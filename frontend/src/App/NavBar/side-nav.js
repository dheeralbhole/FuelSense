import React from "react";
import NavData from "./NavData.json";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.setId = this.setId.bind(this);
    this.idRef = React.createRef();
    this.idArray = 0;
  }

  onSideBarClose = (event) => {
    this.props.onClick(false);
  };

  setId = (e) => {
    this.props.getFilterId(e.currentTarget.id);
    this.props.onClick(false);
  };

  render() {
    const menu = NavData.root.map(({ id, menu, submenu }) => {
      var subMenu = null;
      if (submenu !== undefined) {
        subMenu = submenu.map(({ id, submenuname, subsubmenu }) => {
          var subSubMenu = null;
          if (subsubmenu !== undefined) {
            subSubMenu = subsubmenu.map(({ id, subsubmenuname }) => {
              return (
                <li
                  ref={this.idRef}
                  id={id}
                  className='sub-sub-menu'
                  onClick={this.setId}
                >
                  <a href='#'>{subsubmenuname}</a>
                </li>
              );
            });
          }
          return (
            <li className='sub-menu'>
              <a href={`#${id}`} data-toggle='collapse' aria-expanded='false'>
                {submenuname}
              </a>
              <ul className='collapse list-unstyled' id={id}>
                {subSubMenu}
              </ul>
            </li>
          );
        });
      }
      return (
        <li>
          <a href={`#${id}`} data-toggle='collapse' aria-expanded='false'>
            {menu}
          </a>
          <ul className='collapse list-unstyled' id={id}>
            {subMenu}
          </ul>
        </li>
      );
    });
    return (
      <nav id='sidebar' className={`${this.props.sideBar ? "active" : ""}`}>
        <div className='row'>
          <div className='sidebar-header'>
            <i
              id='dismiss'
              className='fa fa-bars navbar-toggle-side'
              onClick={this.onSideBarClose}
            ></i>
            <h3>FuelSense</h3>
          </div>
        </div>
        <ul className='list-unstyled components'>{menu}</ul>
      </nav>
    );
  }
}

export default SideNav;
