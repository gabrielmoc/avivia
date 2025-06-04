export const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const formatarCelular = (valor) => {
    const v = valor.replace(/\D/g, '');
    if (v.length <= 10) {
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };
  
  export const formatarCEP = (valor) => {
    return valor.replace(/^(\d{5})(\d{0,3})/, '$1-$2').substring(0, 9);
  };
  