const convertJsonToCsv = (jsonData: any) => {
  const header = Object.keys(jsonData[0]);
  const rows = jsonData.map((item: any) =>
    header.map((fieldName) => JSON.stringify(item[fieldName], (_, value) => (value === null ? "" : value))).join(",")
  );
  return [header.join(","), ...rows].join("\n");
};

export const downloadJsonToCsv = (data: any) => {
  const csv = convertJsonToCsv(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";
  link.click();
};
