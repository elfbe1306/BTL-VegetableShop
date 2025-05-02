import { BarChart2, Phone, Menu, Settings, ShoppingBag, CircleUser, Users, House, CircleHelp, Newspaper, MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#E6E6E6", href: "/admin" },
  { name: "Account", icon: CircleUser, color: "#6366f1", href: "/admin/account" },
  { name: "Home", icon: House, color: "#FF8A00", href: "/admin/home" },
  { name: "Shop", icon: ShoppingBag, color: "#EA4B48", href: "/admin/products" },
  { name: "FaQs", icon: CircleHelp, color: "#EC4899", href: "/admin/faqs" },
  { name: "Blog", icon: Newspaper, color: "#10B981", href: "/admin/blog" },
  { name: "Comment", icon: MessageSquareText, color: "#10B981", href: "/admin/comment" },
  { name: "About Us", icon: Users, color: "#F59E0B", href: "/admin/about" },
  { name: "Contact Us", icon: Phone, color: "#3B82F6", href: "/analytics" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <motion.div
      className={styles.sidebarContainer}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className={styles.sidebarInner}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={styles.toggleButton}
        >
          <Menu size={24} />
        </motion.button>

        <nav className={styles.nav}>
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href} style={{ textDecoration: 'none' }}>
              <motion.div className={styles.navItem}>
                <item.icon size={20} style={{ color: item.color, minWidth: "20px", minHeight:"22px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className={styles.navText}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
