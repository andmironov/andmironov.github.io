var classNames = require("classnames");

function Menu() {
  var menu = document.querySelector(".header-menu"),
      menuIcon = document.querySelector(".header-menu__icon"),
      menuDropdown = document.querySelector(".header-menu__nav"),

      menuIconIsHovered = false,
      menuIsOpened = false,

      menuIconOpenedClassName = "header-menu__icon--opened",
      menuIconHoveredClassName = "header-menu__icon--hovered",
      menuDropdownOpenedClassName = "header-menu__nav--opened",
      self = this;

  //Event handlers
  function menuIconOnMouseover() {
    if(menuIconIsHovered) return;
    self.hoverMenuIcon();
  }

  function menuIconOnMouseout() {
    if(!menuIconIsHovered) return;
    self.unHoverMenuIcon();
  }

  function menuIconOnClick() {
    if(menuIsOpened) {self.closeMenu(); return;}
    self.openMenu();
    return;
  }

  function documentOnClick() {
    if(menuIsOpened) closeMenu(); return;
  }

  //Events
  menuIcon.addEventListener("mouseenter", menuIconOnMouseover);
  menuIcon.addEventListener("mouseleave", menuIconOnMouseout);
  menuIcon.addEventListener("click", menuIconOnClick);

  //API
  this.hoverMenuIcon = function() {
    menuIconIsHovered = true;
    menuIcon.classList.add(menuIconHoveredClassName);
    return;
  },

  this.unHoverMenuIcon = function() {
    menuIconIsHovered = false;
    menuIcon.classList.remove(menuIconHoveredClassName);
    return;
  },

  this.openMenu = function() {
    menuIsOpened = true;
    menuIcon.classList.add(menuIconOpenedClassName);
    menuDropdown.classList.add(menuDropdownOpenedClassName);
    console.log("open");
    return;
  },

  this.closeMenu = function() {
    menuIsOpened = false;
    menuIcon.classList.remove(menuIconOpenedClassName);
    menuDropdown.classList.remove(menuDropdownOpenedClassName);
    console.log("close");
    return;
  }
}

var headerMenu = new Menu();
