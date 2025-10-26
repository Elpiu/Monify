export function exportToCsv(filename: string, data: any[]): void {
  if (!data || data.length === 0) {
    console.warn('Nessun dato da esportare.');
    return;
  }

  const replacer = (key: string, value: unknown): unknown => (value === null ? '' : value);
  const header = Object.keys(data[0]);

  // Escape delle virgole e delle virgolette nei dati
  const escapeCsvCell = (cell: any): string => {
    const cellStr = String(cell).replace(/"/g, '""');
    return `"${cellStr}"`;
  };

  const csv = [
    header.join(','),
    ...data.map((row) => header.map((fieldName) => escapeCsvCell(row[fieldName])).join(',')),
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
