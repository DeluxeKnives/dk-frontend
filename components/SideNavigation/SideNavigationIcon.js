import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useTranslation } from 'next-i18next';
import logo from '~/public/images/dk-logo-white.svg';
import useStyles from './sidenav-icon-style';
import Link from '@material-ui/core/Link';
import { IoLogoDiscord, IoHomeSharp, IoGameController, IoStorefront } from "react-icons/io5";

let counter = 0;
function createData(name, url, icon, offset = 0, placeholder) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    icon,
    offset,
    placeholder: placeholder ?? (name.charAt(0).toUpperCase() + name.slice(1))
  };
}

function SideNavigation({ isMain, isNotTranslated }) {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [menuList] = useState([
    // createData("main", "https://deluxeknives.com/", <IoHomeSharp size={36} />),
    createData("store", "/store", <IoStorefront size={36} />),
    createData("game", "/game", <IoGameController size={36} />),
    createData("discord", "", <IoLogoDiscord size={36} />),
  ]);

  return (
    <div className={classes.navigation}>
      <nav className={classes.navMenu}>
        <Link href="/" className={classes.logo}>
          <img src={logo} alt="logo" />
        </Link>
        <List component="nav" className={classes.menu}>
          {menuList.map(item => (
            <ListItem
              key={item.id.toString()}
              button
              component={Link}
              offset={item.offset || 0}
              href={item.url}
              classes={{ root: classes.link }}
            >
              <ListItemIcon className={classes.icon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                classes={{ root: classes.text }}
                primary={isNotTranslated ? item.placeholder : t('navigation.' + item.name)}
              />
            </ListItem>
          ))}
        </List>
      </nav>
    </div>
  );
}

export default SideNavigation;
