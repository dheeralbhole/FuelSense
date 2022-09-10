import React from "react";

class TopNav extends React.Component {
  onSideBarOpen = (event) => {
    this.props.onClick(true);
  };

  render() {
    return (
      <nav
        className='navbar navbar-default'
        style={{ backgroundColor: "#e6e6e6" }}
      >
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-6' style={{ marginLeft: 0 + "px" }}>
              <button
                type='button'
                id='sidebarCollapse'
                className='navbar-toggle'
                onClick={this.onSideBarOpen}
              >
                <i className='fa fa-bars' aria-hidden='true'></i>
              </button>
            </div>
            <div className='col-xs-6'>
              <a href='index.html' className='navbar-brand navbar-brand-custom'>
                <img src='img/index2.png' alt='Image Description' />
              </a>
            </div>
          </div>
          <div className='row'>
            <div className='custom-profile-2' style={{ right: "50px" }}>
              <div className='dropdown dropdown-profile'>
                <a className='' data-toggle='dropdown' href='#'>
                  <i
                    className='fa fa-car'
                    aria-hidden='true'
                    style={{ color: "#000" }}
                  ></i>
                </a>
                <ul className='dropdown-menu dropdown-icons'>
                  <li className='dropdown-heading'>My Fleet</li>
                  <div className='row'>
                    <li className='custom-icons'>
                      <a href='#'>Aston Martin</a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default TopNav;
