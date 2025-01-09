import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import styles from "./header.module.css";

const Header = () => {
  const { user } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={styles.header}>
      <nav aria-label="Navigation principale">
        {/* Menu Hamburger */}
        <div
          className={`${styles.menuToggle} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <div />
          <div />
          <div />
        </div>

        {/* Menu de navigation classique */}
        <ul className={`${styles.headerNav} ${menuOpen ? styles.open : ""}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
              onClick={() => setMenuOpen(false)} // Ferme le menu au clic
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
              onClick={() => setMenuOpen(false)} // Ferme le menu au clic
            >
              Nos produits
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                to="/products/add"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              >
                Ajouter un produit
              </NavLink>
            </li>
          )}

          {user && (
            <li>
              <NavLink
                to="/user-profile"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              >
                Mon compte
              </NavLink>
            </li>
          )}

          {!user && (
            <li>
              <NavLink
                to="/authentication"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              >
                S&apos;inscrire/Se connecter
              </NavLink>
            </li>
          )}
        </ul>

        {/* Menu mobile, seulement affiché si `menuOpen` est true */}
        {menuOpen && (
          <ul className={styles.mobileMenu}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              >
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                end
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.navLink
                }
                onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              >
                Nos produits
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink
                  to="/products/add"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.navLink
                  }
                  onClick={() => setMenuOpen(false)} // Ferme le menu au clic
                >
                  Ajouter un produit
                </NavLink>
              </li>
            )}

            {user && (
              <li>
                <NavLink
                  to="/user-profile"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.navLink
                  }
                  onClick={() => setMenuOpen(false)} // Ferme le menu au clic
                >
                  Mon compte
                </NavLink>
              </li>
            )}

            {!user && (
              <li>
                <NavLink
                  to="/authentication"
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.navLink
                  }
                  onClick={() => setMenuOpen(false)} // Ferme le menu au clic
                >
                  S&apos;inscrire/Se connecter
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
