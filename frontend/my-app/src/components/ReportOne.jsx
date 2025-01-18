import React, { useState } from 'react';
import axios from 'axios';

const ReportOne = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost/billingsReportData', {
        withCredentials: true,
        responseType: 'blob', 
      });

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/pdf')) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio.pdf'); 
        document.body.appendChild(link);
        link.click();
      } else {
        console.error('Formato de resposta inesperado. Esperado PDF.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error('Nenhuma fatura encontrada.');
        } else if (error.response.status === 401) {
          console.error('Usuário não autorizado.');
        } else {
          console.error('Erro ao carregar o relatório:', error);
        }
      } else {
        console.error('Erro ao realizar o download do relatório:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };
};

export default ReportOne;
