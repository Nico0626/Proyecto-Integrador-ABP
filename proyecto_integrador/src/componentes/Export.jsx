// componentes/Export.jsx
import * as XLSX from 'xlsx';

export const ExportButton = ({ data, format }) => {
  const handleExport = () => {
    if (format === "json") {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, "productos.json");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
      XLSX.writeFile(workbook, "productos.xlsx");
    }
  };

  const triggerDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-md transition duration-300 ease-in-out mt-4"
      onClick={handleExport}
    >
      Exportar archivo
    </button>
  );
};
