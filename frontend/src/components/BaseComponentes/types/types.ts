import Default from "../Default";
import Footer from "../Footer";
import Navbar from "../Navbar";
import BaseTexto from "../Texto";
import BaseTitulo from "../Titulo";
import BaseTituloTexto from "../TituloTexto";

export interface BaseComponentProps {
  value?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentMap: Record<string, React.ComponentType<any>> = {
  DEFAULT: Default,
  TEXTO: BaseTexto,
  TITULO: BaseTitulo,
  TITULO_TEXTO: BaseTituloTexto,
  NAVBAR: Navbar,
  FOOTER: Footer,
};