import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  Copy,
  Plus,
  Users as PhosphorUsers,
  PencilSimple,
  Star,
} from "phosphor-react";
import { Modal } from "../components/Modal";
import * as Avatar from "@radix-ui/react-avatar";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { Table } from "../components/Table/Table";
import { TableRow } from "../components/Table/TableRow";
import { TableCell } from "../components/Table/TableCell";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { TextInput } from "../components/Form/TextInput";
import { Dropdown } from "../components/Form/Dropdown";
import { Dropzone } from "../components/Form/Dropzone";
import { Header } from "../components/Header";

interface Role {
  id: string;
  name: string;
  created_at: Date;
}

interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone_number: string;
  avatar?: string;
  role: Role;
  role_id: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("/users");
      const usersData = response.data;

      const usersList = usersData.map((user: User) => ({
        ...user,
        created_at: new Date(user.created_at),
        updated_at: new Date(user.updated_at),
        is_active: true,
        initials:
          user.name.split(" ").length > 1
            ? `${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`
            : user.name.split(" ")[0][0],
      }));

      setUsers(usersList);
    }

    fetchUsers();
  }, [setUsers]);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <Header />

      <main className="flex m-10 justify-center">
        <Sidebar />

        <div className="p-10 w-full max-w-[90rem] min-w-[50rem]">
          <div className="flex justify-between items-center">
            <h1 className="font-title text-2xl">Colaboradores</h1>

            <Modal
              trigger={
                <button className="bg-blue-500 py-3 px-6 rounded-lg text-gray-100 font-title tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Plus size={20} color="#f3f4f6" />
                  Adicionar colaborador
                </button>
              }
              title={
                <div className="flex gap-6 items-center">
                  <PhosphorUsers size={48} color="#3b82f6" />
                  <strong className="text-2xl font-title">
                    Adicionar colaborador
                  </strong>
                </div>
              }
              description="Preencha as informações do seu novo colarborador!"
              content={
                <form className="flex flex-col gap-8 w-full mt-10">
                  <TextInput label="E-mail" type="email" />
                  <TextInput label="Nome completo" type="text" />
                  <TextInput label="Senha" type="text" />
                  <TextInput label="Confirmação de senha" type="text" />

                  <div className="grid grid-cols-2 gap-8">
                    <TextInput label="Telefone" type="text" />
                    <Dropdown
                      label="Cargo"
                      options={[
                        "Sócio",
                        "Estagiário",
                        "Desenvolvedor",
                        "Fornecedor",
                      ]}
                    />
                  </div>
                  <Dropzone
                    label="Foto"
                    description="Arraste a imagem aqui ou clique para carregar a imagem
                        de seu computador"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-500 py-3 rounded-lg text-gray-100 font-title tracking-wide hover:opacity-90 transition-opacity"
                  >
                    CADASTRAR
                  </button>
                </form>
              }
            />
          </div>

          <p className="mt-4 text-gray-700 text-lg">
            Sua empresa já conta com <strong>{users.length}</strong>{" "}
            colaboradores!
          </p>

          <Table
            columnNames={[
              "COLABORADOR",
              "CONTATO",
              "CARGO",
              "SITUAÇÃO DO CONTRATO",
              "",
            ]}
          >
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span className="w-14, h-14 flex items-center gap-4">
                    <Avatar.Root>
                      <Avatar.Image
                        src={`http://localhost:3333/users/avatar/${user.id}`}
                        alt=""
                        className="w-14 h-14 rounded-full border border-blue-300 object-cover"
                      />
                      <Avatar.Fallback className="w-14 h-14 rounded-full bg-blue-100 border border-blue-300 p-4 font-bold flex items-center justify-center text-center">
                        {user.initials}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                      <strong>{user.name}</strong>
                      <p className="text-sm text-gray-500">
                        Entrou na empresa{" "}
                        {formatDistance(user.created_at, Date.now(), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </span>
                </TableCell>

                <TableCell>
                  <span>
                    <strong className="text-gray-600 flex gap-2 items-center">
                      {user.email}
                      <Copy
                        size={20}
                        color="#6b7280"
                        className="hover:cursor-pointer"
                      />
                    </strong>
                    <p className="text-sm text-gray-500">{user.phone_number}</p>
                  </span>
                </TableCell>

                <TableCell>
                  <span className="flex gap-1">
                    {user.role.name}
                    {user.role.name === "Sócio" && (
                      <Star size={10} weight="fill" color="#eab308" />
                    )}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`rounded-full py-1 px-3 ${
                      user.is_active ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <strong
                      className={`text-sm ${
                        user.is_active ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {user.is_active ? "Em andamento" : "Encerrado"}
                    </strong>
                  </span>
                </TableCell>

                <TableCell>
                  <span className="w-28 flex justify-center items-center gap-2 text-blue-700 hover:cursor-pointer hover:opacity-70 hover:underline border border-blue-700 rounded-lg p-2">
                    <PencilSimple size={20} />
                    Editar
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </main>
    </div>
  );
}
