import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdDelete, MdModeEdit } from "react-icons/md";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";
import api from "../../services/api";
import Modal from "../../components/Modal";

import {
  Container,
  Title,
  SearchContent,
  InputContainer,
  Table,
  Action,
  ActionContent,
  Scroll,
  ButtonAdd
} from "./styles";
import history from "../../services/history";

export default function Authors() {
  const [modal, setModal] = useState({ isOpened: false, author: undefined });
  const [authors, setAuthors] = useState([]);

  async function handleDeleteAuthor(id) {
    try {
      setAuthors(authors.filter(author => author.id !== id));

      setModal({ isOpened: false, author: undefined });

      await api.delete(`/authors/${id}`);

      toast.success("Autor removido com sucesso!");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    async function loadAuthors() {
      try {
        console.log(api.defaults.headers);
        const response = await api.get(`/authors`);

        const data = response.data.map(author => ({
          ...author,
          timeDistance: format(
            new Date(author.createdAt),
            "dd 'de' MMMM yyyy",
            { locale: pt }
          )
        }));

        setAuthors(data);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }

    loadAuthors();
  }, []);

  return (
    <Container>
      <Modal
        isOpened={modal.isOpened}
        no={() => setModal({ isOpened: false, author: undefined })}
        yes={() => handleDeleteAuthor(modal.id)}
      >
        Você tem certeza que deseja excluir o autor {modal.author}?
      </Modal>
      <Title>Autores</Title>
      <SearchContent>
        <InputContainer>
          <FiSearch color="#b1b1b3" size={22} />
          <input placeholder="Procurar autores" />
        </InputContainer>
        <ButtonAdd onClick={() => history.push("/authors/new")}>
          <FaPlus size={16} color="#FFFFFF" />
          <span>Novo autor</span>
        </ButtonAdd>
      </SearchContent>
      <Scroll>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data de criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td>#{author.id}</td>
                <td>{author.name}</td>
                <td>{author.timeDistance}</td>
                <td>
                  <ActionContent>
                    <Action
                      put
                      onClick={() =>
                        history.push({
                          pathname: "/authors/edit",
                          state: { author }
                        })
                      }
                    >
                      <MdModeEdit size={20} color="#FFFFFF" />
                    </Action>
                    <Action
                      delete
                      onClick={() =>
                        setModal({
                          isOpened: true,
                          author: author.name,
                          id: author.id
                        })
                      }
                    >
                      <MdDelete size={20} color="#FFFFFF" />
                    </Action>
                  </ActionContent>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Scroll>
    </Container>
  );
}
