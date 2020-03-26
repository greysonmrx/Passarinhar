import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdVisibility, MdDelete, MdModeEdit } from "react-icons/md";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";
import api from "../../services/api";
import history from "../../services/history";

import Rating from "../../components/Rating";

import {
  Container,
  Title,
  SearchContent,
  InputContainer,
  Table,
  Status,
  Action,
  ActionContent,
  Scroll,
  ButtonAdd
} from "./styles";
import Modal from "../../components/Modal";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [modal, setModal] = useState({ isOpened: false, book: undefined });

  function handleRatings(ratings) {
    if (ratings.length !== 0) {
      var sum = 0;

      ratings.map(rating => {
        sum += rating.value;
        return rating;
      });

      return sum / ratings.length;
    }

    return 0;
  }

  async function handleRemoveBook() {
    try {
      await api.delete(`/books/${modal.id}`);

      setModal({ isOpened: false, book: undefined });

      loadBooks();

      toast.success("Livro removido com sucesso!");

      history.push("/books");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  async function loadBooks() {
    try {
      const response = await api.get(`/books`);

      const data = response.data.map(book => ({
        ...book,
        status: book.available !== 0,
        timeDistance: format(new Date(book.createdAt), "dd 'de' MMMM yyyy", {
          locale: pt
        })
      }));

      setBooks(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <Container>
      <Modal
        isOpened={modal.isOpened}
        no={() => setModal({ isOpened: false, book: undefined })}
        yes={() => handleRemoveBook()}
      >
        Você tem certeza que deseja excluir o livro {modal.book}?
      </Modal>
      <Title>Livros</Title>
      <SearchContent>
        <InputContainer>
          <FiSearch color="#b1b1b3" size={22} />
          <input placeholder="Procurar livros" />
        </InputContainer>
        <ButtonAdd onClick={() => history.push("/books/new")}>
          <FaPlus size={16} color="#FFFFFF" />
          <span>Novo livro</span>
        </ButtonAdd>
      </SearchContent>
      <Scroll>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Avaliação</th>
              <th>Data de cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>#{book.id}</td>
                <td>{book.name}</td>
                <td>
                  <Status available={book.status}>
                    {book.status ? "Disponível" : "Indisponível"}
                  </Status>
                </td>
                <td>
                  <Rating size={20} ratingValue={handleRatings(book.ratings)} />
                </td>
                <td>{book.timeDistance}</td>
                <td>
                  <ActionContent>
                    <Action
                      view
                      onClick={() =>
                        history.push({
                          pathname: "/books/show",
                          state: { book }
                        })
                      }
                    >
                      <MdVisibility size={20} color="#FFFFFF" />
                    </Action>
                    <Action
                      put
                      onClick={() =>
                        history.push({
                          pathname: "/books/edit",
                          state: { book }
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
                          book: book.name,
                          id: book.id
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
