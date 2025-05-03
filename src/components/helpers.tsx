export function formatPrice(price: string) {
  let formattedPrice = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formattedPrice}`;
}

export const capitalizeWords = (text?: string): string => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-MX");
};
