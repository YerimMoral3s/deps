interface Theme {
  colors: {
    background: string;
    secondaryBackground: string;
    text: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

const theme_l = {
  colors: {
    background: "#e0e0e0", // Fondo principal (gris claro)
    secondaryBackground: "#cfcfcf", // Fondo secundario (gris más oscuro)
    text: "#2b2b2b", // Texto principal (gris muy oscuro, casi negro)
    textSecondary: "#4a4a4a", // Texto secundario (gris medio-oscuro)
    accent: "#1565c0", // Azul fuerte para botones y enlaces
    accentHover: "#0d47a1", // Azul más oscuro para hover
  },
  fonts: {
    primary: "'Open Sans', sans-serif", // Fuente principal
    secondary: "'Poppins', sans-serif", // Fuente secundaria para encabezados
  },
};
export default theme_l;
