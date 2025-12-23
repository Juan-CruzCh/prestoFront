function numeroATextoEntero(num: number): string {
  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

  if (num === 0) return 'cero';
  if (num < 10) return unidades[num];
  if (num < 20) return especiales[num - 10];
  if (num < 100) {
    const d = Math.floor(num / 10);
    const u = num % 10;
    if (d === 2 && u > 0) return 'veinti' + unidades[u];
    return decenas[d] + (u > 0 ? ' y ' + unidades[u] : '');
  }
  if (num < 1000) {
    const c = Math.floor(num / 100);
    const resto = num % 100;
    const centenas: Record<number, string> = {
      1: resto > 0 ? 'ciento' : 'cien',
      2: 'doscientos',
      3: 'trescientos',
      4: 'cuatrocientos',
      5: 'quinientos',
      6: 'seiscientos',
      7: 'setecientos',
      8: 'ochocientos',
      9: 'novecientos',
    };
    return (centenas[c] || '') + (resto > 0 ? ' ' + numeroATextoEntero(resto) : '');
  }
  if (num < 1000000) {
    const miles = Math.floor(num / 1000);
    const resto = num % 1000;
    return (miles > 1 ? numeroATextoEntero(miles) + ' mil' : 'mil') +
           (resto > 0 ? ' ' + numeroATextoEntero(resto) : '');
  }
  const millones = Math.floor(num / 1000000);
  const resto = num % 1000000;
  return numeroATextoEntero(millones) + ' millones' +
         (resto > 0 ? ' ' + numeroATextoEntero(resto) : '');
}

export function numeroATextoBolivianos(num: number): string {
  if (isNaN(num)) return '';


  const entero = Math.floor(num);
  const centavos = Math.round((num - entero) * 100);

  const textoEntero = numeroATextoEntero(entero);
  const monedaEntero = entero === 1 ? 'boliviano' : 'bolivianos';

  
  if (centavos === 0) {
    return `${textoEntero} ${monedaEntero} 00/100`;
  }

  const textoCentavos = numeroATextoEntero(centavos);
  const monedaCentavo = centavos === 1 ? 'centavo' : 'centavos';

  return `${textoEntero} ${monedaEntero} con ${textoCentavos} ${monedaCentavo}`;
}
