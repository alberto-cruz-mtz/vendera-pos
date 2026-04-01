export const Totals = () => {
  return (
    <article className="flex gap-10 text-sm">
      <p>
        Total:
        <span className="text-primary ml-3 font-medium proportional-nums">
          $0.00
        </span>
      </p>
      <p>
        Pago con:
        <span className="text-primary ml-3 font-medium proportional-nums">
          $0.00
        </span>
      </p>
      <p>
        Cambio:
        <span className="text-primary ml-3 font-medium proportional-nums">
          $0.00
        </span>
      </p>
    </article>
  );
};
