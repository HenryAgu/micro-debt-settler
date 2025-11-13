
export type FormData = {
  name: string;
  email: string;
  phone?: number;
  password: string;
};

export type Payment = {
  paymentImage: string;
  name: string;
  date: string;
  title: string;
  amount: string;
  status: "debt" | "credit";
};
