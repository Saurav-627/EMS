const Employee = () => {
  // Sample data for table headers and rows
  const TABLE_HEAD = ["Name", "Job", "Date", "Actions"];
  const TABLE_ROWS = [
    { name: "John Doe", job: "Software Engineer", date: "01-01-2023" },
    { name: "Jane Smith", job: "Product Manager", date: "01-02-2023" },
    { name: "Alice Johnson", job: "UX Designer", date: "01-03-2023" },
  ];
  return (
    <div className="h-full w-full overflow-scroll bg-white shadow rounded-lg">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast
              ? "p-4 text-sm text-gray-700"
              : "p-4 border-b border-gray-200 text-sm text-gray-700";

            return (
              <tr key={name}>
                <td className={classes}>{name}</td>
                <td className={classes}>{job}</td>
                <td className={classes}>{date}</td>
                <td className={classes}>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline font-medium"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
