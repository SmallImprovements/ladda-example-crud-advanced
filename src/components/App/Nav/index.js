import { Link } from 'react-router';
import classNames from 'classnames';
import styles from './styles.scss';

export default function Nav() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link className={styles.title} to="">
            Ladda Cache CRUD Example
          </Link>
          <span className={styles.navItem}>
            { '  -  ' }
          </span>
          <a
            className={styles.navItem}
            href="http://opensource.small-improvements.com/ladda-example-crud/"
            target="_blank">
            Basic
          </a>
          <a
            className={classNames(styles.navItem, styles.navItemActive)}
            href="http://opensource.small-improvements.com/ladda-example-crud-advanced/">
            Advanced
          </a>
        </div>
        <a
          type="button"
          className="button save"
          target="_blank"
          href="https://github.com/SmallImprovements/ladda-example-crud-advanced">
          Check out the source code
        </a>
      </nav>
    </div>
  );
}
