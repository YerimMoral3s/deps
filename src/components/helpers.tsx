export function formatPrice(price: string) {
  let formattedPrice = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formattedPrice}`;
}

export const capitalizeFirstLetter = (word: string): string => {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "disponible":
      return "green";
    case "ocupado":
      return "red";
    case "mantenimiento":
      return "orange";
    default:
      return "gray";
  }
};

export const getTenantStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "activo":
      return "green";
    case "inactivo":
      return "red";
    default:
      return "gray";
  }
};

export const isOnBuildingsPath = () => {
  return window.location.pathname.includes("/buildings/");
};
