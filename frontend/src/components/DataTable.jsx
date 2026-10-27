export default function DataTable({ columns, rows, getRowKey }) {
  return (
    <div className="overflow-x-auto rounded-md border border-navy-100">
      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
        <thead className="bg-navy-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-t border-navy-100">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 align-middle text-ink">
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}