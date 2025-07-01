// src/Context/MenuContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [loading, setLoading] = useState(true);

  const buildTree = (items) => {
    const map = {};
    const roots = [];
    items.forEach(item => {
      map[item.id] = { ...item, children: [] };
    });
    items.forEach(item => {
      if (item.parentId) {
        map[item.parentId]?.children?.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });
    return roots;
  };

  const loadMenus = () => {
    setLoading(true);
    axios.get("https://henza.zaffarsons.com/henza/get-menus")
      .then(res => {
        setMenus(res.data);
        setMenuTree(buildTree(res.data));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMenus();
  }, []);

  return (
    <MenuContext.Provider value={{ menus, menuTree, loading, loadMenus }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);