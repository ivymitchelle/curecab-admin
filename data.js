export const generateOrderId = () => {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const facilities = [
  { name: "Kenyatta National Hospital CCC (Nairobi)", phone: "+254715432912" },
  {
    name: "Moi Teaching and Referral Hospital CCC (Eldoret)",
    phone: "+254738960475",
  },
  {
    name: "Coast Provincial General Hospital CCC (Mombasa)",
    phone: "+254786548203",
  },
  { name: "Kisumu County Hospital CCC (Kisumu)", phone: "+254723091758" },
  {
    name: "Nyanza Provincial General Hospital CCC (Kisumu)",
    phone: "+254704829361",
  },
  {
    name: "Rift Valley Provincial General Hospital CCC (Nakuru)",
    phone: "+254776154320",
  },
];

export const couriers = [
  "G4S Kenya",
  "DHL Kenya",
  "FedEx Kenya",
  "Aramex",
  "Posta Kenya",
  "Sendy",
  "Fargo Courier",
  "Wells Fargo",
];

export const EMR_patients = [
  {
    ccc_no: "12345678",
    full_name: "John Doe",
    facility: "Coast Provincial General Hospital CCC (Mombasa)",
    id_no: 12345678,
  },
  {
    ccc_no: "ABC1234",
    full_name: "Chris Parker",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    id_no: 12345678,
  },
];

export const patients = [
  {
    ccc_no: "12345678",
    full_name: "John Doe",
    facility: "Coast Provincial General Hospital CCC (Mombasa)",
    phone: "+254712345678",
    username: "johndoe",
    password: "123456",
    next_order: 1683749220000,
  },
  {
    ccc_no: "ABC1234",
    full_name: "Chris Parker",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    phone: "+254738960475",
    username: "amchris",
    password: "123456",
    next_order: 1683749220000,
  },
];

export const orders = [
  {
    client: "+254712345678",
    orderId: generateOrderId(),
    address: "2 Kalimoni",
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "delivered",
    orderDate: 1683052500000,
    delivered: true,
  },
  {
    client: "+254712345678",
    orderId: generateOrderId(),
    address: "9 Nakuru",
    deliverBy: new Date().getTime() + 600000,
    orderDate: 1683225300000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "on-transit",
    delivered: false,
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "204 Githurai",
    orderDate: 1683398100000,
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "delivered",
    delivered: true,
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "2 Changamwe",
    orderDate: 1683570900000,
    deliverBy: new Date().getTime() + 600000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "cancelled",
    delivered: false,
  },
  {
    client: "+254738960475",
    orderId: generateOrderId(),
    address: "234 Kisumu",
    deliverBy: new Date().getTime() + 600000,
    orderDate: 1683830100000,
    deliveryFee: 340,
    courier: "Posta Kenya",
    status: "pending",
    delivered: false,
  },
];

export const getUserNextOrderDate = (days) => {
  const time = days * 24 * 60 * 60 * 1000;
  const next_date = new Date().getTime() + time;
  return next_date;
};

export const clinicians = [
  {
    name: "Peter",
    email: "peter@gmail.com",
    role: "admin",
    password: "123456",
    phone: "+254114952302",
    facility: "Moi Teaching and Referral Hospital CCC (Eldoret)",
    verified: true,
  },
  {
    name: "Edwin",
    email: "moses@gmail.com",
    role: "clinician",
    password: "123456",
    phone: "+254712345678",
    facility: "Rift Valley Provincial General Hospital CCC (Nakuru)",
    verified: true,
  },
  {
    name: "Charles",
    email: "charles@gmail.com",
    role: "clinician",
    password: "123456",
    phone: "+254114952302",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    verified: false,
  },
  {
    name: "Chricencia",
    email: "chricencia@gmail.com",
    role: "clinician",
    password: "123456",
    phone: "+254114952302",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    verified: true,
  },
  {
    name: "Timothy",
    email: "tim@gmail.com",
    role: "clinician",
    password: "123456",
    phone: "+254114952302",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    verified: true,
  },
  {
    name: "Sankale",
    email: "sankale@gmail.com",
    role: "clinician",
    password: "123456",
    phone: "+254114952302",
    facility: "Nyanza Provincial General Hospital CCC (Kisumu)",
    verified: false,
  },
];
