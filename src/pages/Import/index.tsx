import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    try {
      data.append('file', uploadedFiles[0].file);
      await api.post('/transactions/import', data);
      history.push('/');
    } catch (err) {
      setErrorMessage(
        err.response.data.error
          ? err.response.data.error
          : 'Erro ao importar o arquivo.',
      );
    }
  }

  function submitFile(files: File[]): void {
    const moreUploadedFiles: FileProps[] = files.map(
      (file: File): FileProps => {
        return { file, name: file.name, readableSize: filesize(file.size) };
      },
    );

    setUploadedFiles(moreUploadedFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              {errorMessage && <p>{errorMessage}</p>}
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
