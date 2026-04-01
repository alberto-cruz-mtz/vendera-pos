export const TitleApp = () => {
  return (
    <section className="border-b-divider flex items-center justify-between gap-4 border-b pb-1">
      <div>
        <h1 className="text-xl font-bold">Vendera</h1>
        <p className="text-primary-600 text-sm font-medium">punto de venta</p>
      </div>

      <div className="space-y-2">
        <span className="text-primary-200 text-xs">Le atiende:</span>
        <p className="text-sm">Administrador de la tienda</p>
      </div>
    </section>
  );
};
