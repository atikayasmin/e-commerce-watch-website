import React, { useState, useEffect } from 'react'
import { navbarStyles } from '../assets/dummyStyles'
import { Clock5, BaggageClaim, User, X, Menu } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'

const navItems = [
    { name: "Home", href: '/' },
    { name: "Watches", href: "/watches" },
    { name: "Contact", href: "/contact" },
];

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [active, setActive] = useState(location.pathname || "/");
    const { totalItems } = useCart();
    const [loggedIn, setLoggedIn] = useState(() => {
        try {
            return (
                localStorage.getItem("isLoggedIn") === "true" ||
                !!localStorage.getItem("authToken")
            );
        } catch {
            return false;
        }
    });

    useEffect(() => {
        setActive(location.pathname || "/");
    }, [location]);

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "isLoggedIn" || e.key === "authToken") {
                try {
                    const isNowLoggedIn =
                        localStorage.getItem("isLoggedIn") === "true" ||
                        !!localStorage.getItem("authToken");
                    setLoggedIn(isNowLoggedIn);
                } catch {
                    setLoggedIn(false);
                }
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const handleNavClick = (href) => {
        setActive(href);
        setOpen(false);
    };

    // ✅ FIX 1 & 2: removed stray `}catch(e){}` that had no matching try,
    // which caused the closing `}` to end the function early — leaving
    // setLoggedIn/setActive/setOpen/navigate orphaned outside the function.
    const handleLogout = () => {
        try {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("authToken");
        } catch (e) {}
        setLoggedIn(false);
        setActive("/");
        setOpen(false);
        navigate("/");
    };

    return (
        <header className={navbarStyles.header}>
            <nav className={navbarStyles.nav} role='navigation'>
                <div className={navbarStyles.container}>
                    {/* BRAND LOGO */}
                    <div className={navbarStyles.brandContainer}>
                        <div className={navbarStyles.logoContainer}>
                            <Clock5 className={navbarStyles.logoIcon} />
                        </div>
                        <Link to='/' onClick={() => handleNavClick("/")}
                            className={navbarStyles.logoLink}>
                            <span style={navbarStyles.logoTextStyle} className={navbarStyles.logoText}>
                                Elite
                            </span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <div className={navbarStyles.desktopNav}>
                        {navItems.map((item) => {
                            const isActive = active === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`${navbarStyles.navItemBase} ${isActive
                                        ? navbarStyles.navItemActive
                                        : navbarStyles.navItemInactive}`}
                                >
                                    <span>{item.name}</span>
                                    <span className={`${navbarStyles.activeIndicator} ${isActive
                                        ? navbarStyles.activeIndicatorVisible
                                        : navbarStyles.activeIndicatorHidden}`}>
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Right side */}
                <div className={navbarStyles.rightActions}>
                    <Link to='/cart' className={navbarStyles.cartLink}>
                        <BaggageClaim className={navbarStyles.cartIcon} />
                        {totalItems > 0 && (
                            <span className={navbarStyles.cartBadge}>
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {!loggedIn ? (
                        <Link to='/login' className={navbarStyles.accountLink}>
                            <User className={navbarStyles.accountIcon} />
                            <span className={navbarStyles.accountText}>Account</span>
                        </Link>
                    ) : (
                        <button onClick={handleLogout} className={navbarStyles.accountLink}>
                            <User className={navbarStyles.accountIcon} />
                            <span className={navbarStyles.accountText}>Logout</span>
                        </button>
                    )}

                    {/* Mobile toggle */}
                    <div className={navbarStyles.mobileMenuButton}>
                        <button
                            onClick={() => setOpen(!open)}
                            className={navbarStyles.menuButton}
                        >
                            {open ? (
                                <X className={navbarStyles.menuIcon} />
                            ) : (
                                <Menu className={navbarStyles.menuIcon} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {open && (
                    <div className={navbarStyles.mobileMenu}>
                        <div className={navbarStyles.mobileMenuContainer}>
                            {navItems.map((item) => {
                                const isActive = active === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`${navbarStyles.mobileNavItemBase} ${isActive
                                            ? navbarStyles.mobileNavItemActive
                                            : navbarStyles.mobileNavItemInactive}`}
                                    >
                                        <span className={navbarStyles.mobileNavItemText}>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })}

                            <div className={navbarStyles.mobileAccountContainer}>
                                {loggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className={navbarStyles.mobileAccountButton}
                                    >
                                        <User className={navbarStyles.mobileAccountIcon} />
                                        <span>Logout</span>
                                    </button>
                                ) : (
                                    <Link
                                        to='/login'
                                        onClick={() => {
                                            setOpen(false);
                                            handleNavClick('/login');
                                        }}
                                        className={navbarStyles.mobileAccountLink}
                                    >
                                        <User className={navbarStyles.mobileAccountIcon} />
                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar
