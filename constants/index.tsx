import { FaFileInvoice, FaHome, FaUser, FaWallet } from "react-icons/fa";
import { FaBarsStaggered, FaChartColumn, FaRepeat } from "react-icons/fa6";

export const navigation = [
  {
    name: "Pricing",
    url: "/pricing",
  },
];

export const menu = [
  {
    icon: <FaHome size={16} />,
    name: "Home",
    url: "/home",
  },
  {
    icon: <FaBarsStaggered size={16} />,
    name: "Balances",
    url: "/balances",
  },
  {
    icon: <FaRepeat size={16} />,
    name: "Transactions",
    url: "/transactions",
  },
  {
    icon: <FaUser size={16} />,
    name: "Customers",
    url: "/customers",
  },
  {
    icon: <FaWallet size={16} />,
    name: "Payments",
    url: "/payments",
  },
  {
    icon: <FaFileInvoice size={16} />,
    name: "Billing",
    url: "/billing",
  },
  {
    icon: <FaChartColumn size={16} />,
    name: "Reporting",
    url: "/reporting",
  },
];

export const dashboard = [
  {
    name: "Home",
    url: "/home",
  },
  {
    name: "Balances",
    url: "/balances",
  },
  {
    name: "Transactions",
    url: "/transactions",
  },
  {
    name: "Reporting",
    url: "/reporting",
  },
];

export const expenses = [
  // Healthcare
  {
    id: "FARMACIA VASSALLO",
    category: "Healthcare",
    description: "Farmacia Vassallo",
    payment: "credit_card",
  },
  // Home
  {
    id: "0150921601000001926812",
    category: "Home",
    description: "Alquiler",
    payment: "bank_transfer",
  },
  {
    id: "0170347220000030163234",
    category: "Home",
    description: "Expensas",
    payment: "bank_transfer",
  },
  // Insurance
  {
    id: "0000027092676-002-000",
    category: "Insurance",
    description: "La Caja Seguros",
    payment: "credit_card",
  },
  {
    id: "0000028821236-004-000",
    category: "Insurance",
    description: "La Caja Seguros",
    payment: "credit_card",
  },
  // Supermarket
  {
    id: "WWW.CARREFOUR.COM.AR",
    category: "Supermarket",
    description: "Carrefour",
    payment: "credit_card",
  },
  // Transportation
  {
    id: "960003682555202",
    category: "Transportation",
    description: "Autopistas del Sol",
    payment: "credit_card",
  },
  {
    id: "WWW.MSM.GOV.AR",
    category: "Transportation",
    description: "Municipalidad de San Miguel",
    payment: "credit_card",
  },
  {
    id: "SHELL - DEHEZA 1428",
    category: "Transportation",
    description: "Shell",
    payment: "credit_card",
  },
  {
    id: "PLANTA VICENTE LOPEZ",
    category: "Transportation",
    description: "Verificación técnica vehicular",
    payment: "credit_card",
  },
  // Utilities
  {
    id: "004241233254",
    category: "Utilities",
    description: "Edenor",
    payment: "debit_card",
  },
  {
    id: "19273186",
    category: "Utilities",
    description: "Naturgy",
    payment: "debit_card",
  },
  {
    id: "215569",
    category: "Utilities",
    description: "Municipalidad de San Isidro",
    payment: "debit_card",
  },
  {
    id: "1003254775510001",
    category: "Utilities",
    description: "Personal Flow",
    payment: "debit_card",
  },
  // Pending to use: Clothing, Education, Entertainment, Investments, Miscellaneous, Travel
];
