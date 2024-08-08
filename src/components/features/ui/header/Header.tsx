import { Link } from '@nextui-org/react'
import { ActionBar } from "./ActionBar";

import logouatx from "@images/logoUATx.png";
import logosiget from "@images/logoSIGET.png";

import styles from "./Header.module.css";

import { useAuth } from "@hooks/useAuth";

interface Props {
  handleOpenPanel?: (type?: string) => void;
}

export const Header = ({ handleOpenPanel }: Props) => {
  const { isAuth } = useAuth();

  return (
    <header className={styles.header}>
      <Link href="/">
        <img
          src={logouatx}
          alt="Logo de la universidad autonoma de Tlaxcala"
          width={100}
          className="min-[400px]:w-32"
        />
      </Link>
      {isAuth ? (
        <ActionBar handleOpenPanel={handleOpenPanel} />
      ) : (
        <picture className={styles.headerPicture}>
          <img
            src={logosiget}
            alt="Logo de la plataforma"
            width={100}
            className="min-[400px]:mb-2 max-[400px]:w-28"
          />
          <strong className="text-white mb-5 mt-[-20px] text-xs max-[400px]:hidden">
            Sistema de Gestión de Titulación
          </strong>
        </picture>
      )}
    </header>
  );
};
