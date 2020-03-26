import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { signOut } from "../../store/modules/auth/actions";

import {
  MdDashboard,
  MdBook,
  MdAssignment,
  MdPeople,
  MdBrush,
  MdLocationCity,
  MdLabel
} from "react-icons/md";

import {
  Container,
  Content,
  ProfileContent,
  Name,
  Email,
  Links,
  LinkContent,
  LinkName,
  LinkTo,
  Scroll
} from "./styles";

import history from "../../services/history";

export default function SideBar() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <img
          src={`https://api.adorable.io/avatar/85/${profile.name}.png`}
          alt={profile.name}
        />
        <ProfileContent>
          <Name>{profile.name}</Name>
          <Email>{profile.email}</Email>
        </ProfileContent>
      </Content>
      <Links>
        <Scroll>
          <LinkTo to="/dashboard">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "dashboard"}
            >
              <MdDashboard size={20} />
              <LinkName>Dashboard</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/books">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "books"}
            >
              <MdBook size={20} />
              <LinkName>Livros</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/loans">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "loans"}
            >
              <MdAssignment size={20} />
              <LinkName>Empréstimos</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/users">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "users"}
            >
              <MdPeople size={20} />
              <LinkName>Usuários</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/authors">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "authors"}
            >
              <MdBrush size={20} />
              <LinkName>Autores</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/publishers">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "publishers"}
            >
              <MdLocationCity size={20} />
              <LinkName>Editoras</LinkName>
            </LinkContent>
          </LinkTo>
          <LinkTo to="/genders">
            <LinkContent
              active={history.location.pathname.split("/")[1] === "genders"}
            >
              <MdLabel size={20} />
              <LinkName>Gêneros</LinkName>
            </LinkContent>
          </LinkTo>
        </Scroll>
      </Links>
      <button onClick={() => dispatch(signOut())}>Sair</button>
    </Container>
  );
}
