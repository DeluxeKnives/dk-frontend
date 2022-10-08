import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';
import { useTranslation } from 'next-i18next';
import logo from '~/public/images/dk_logo_filled_circle.jpeg';
import useStyles from './sidenav-icon-style';
import navMenu from './menu';
import Link from '@material-ui/core/Link';

let counter = 0;
function createData(name, url, icon, offset = 0) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    icon,
    offset
  };
}

function SideNavigation({ isMain }) {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [menuList] = useState([
    createData("store", "/store", 'ion-ios-add-circle'),
    createData("FAQ", "/#faq", 'ion-ios-keypad'),
    createData("game", "/game", 'ion-ios-chatboxes', -40),
    createData("discord", "", 'ion-ios-mail'),
    createData("main", "https://deluxeknives.com/", 'ion-ios-copy'),
  ]);

  return (
    <div className={classes.navigation}>
      <nav className={classes.navMenu}>
        <AnchorLink href="#home" className={classes.logo}>
          <img src={logo} alt="logo" />
        </AnchorLink>
        <List component="nav" className={classes.menu}>
          <Scrollspy
            items={navMenu}
            currentClassName="active"
          >
            {menuList.map(item => (
              <ListItem
                key={item.id.toString()}
                button
                component={isMain && item.url.startsWith('#/') ? AnchorLink : Link}
                offset={item.offset || 0}
                href={item.url}
                classes={{ root: classes.link }}
              >
                <>
                  <ListItemIcon className={classes.icon}>
                    <span className={item.icon} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: classes.text }}
                    primary={t('navigation.' + item.name)}
                  />
                </>
              </ListItem>
            ))}
          </Scrollspy>
        </List>
      </nav>
    </div>
  );
}

export default SideNavigation;
