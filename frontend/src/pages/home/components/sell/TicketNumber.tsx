interface Props {
  value: number;
}

export const TicketNumber = ({ value }: Props) => {
  return (
    <>
      <span className="from-primary-700 via-primary-400 to-primary-200 bg-linear-65 px-3 text-lg font-medium text-white">
        VENTA - Ticket {value}
      </span>
    </>
  );
};
