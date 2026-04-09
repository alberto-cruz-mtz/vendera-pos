interface Props {
  value: string;
}

export const ModalTitle = ({ value }: Props) => {
  return <h1 className="text-primary-500 font-bold">{value}</h1>;
};
