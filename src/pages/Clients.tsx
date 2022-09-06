import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import {
  AddressBook,
  Copy,
  Plus,
  CaretRight,
  PencilSimple,
} from "phosphor-react";
import { Modal } from "../components/Modal";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Table } from "../components/Table/Table";
import { TableRow } from "../components/Table/TableRow";
import { TableCell } from "../components/Table/TableCell";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Project } from "./Projects";
import { TextInput } from "../components/Form/TextInput";
import { Dropzone } from "../components/Form/Dropzone";
import { Header } from "../components/Header";

export interface Client {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone_number: string;
  avatar?: string;
  projects: Project[];
  created_at: Date;
  updated_at: Date;
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const response = await api.get("/clients");
      const clientsData = response.data;

      const clientsList = clientsData.map((client: Client) => ({
        ...client,
        created_at: new Date(client.created_at),
        updated_at: new Date(client.updated_at),
        initials:
          client.name.split(" ").length > 1
            ? `${client.name.split(" ")[0][0]}${client.name.split(" ")[1][0]}`
            : client.name.split(" ")[0][0],
      }));

      setClients(clientsList);
    }

    fetchClients();
  }, [setClients]);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <Header />

      <main className="flex m-10 justify-center">
        <Sidebar />

        <div className="p-10 w-full max-w-[90rem] min-w-[50rem]">
          <div className="flex justify-between items-center">
            <h1 className="font-title text-2xl">Clientes</h1>

            <Modal
              trigger={
                <button className="bg-blue-500 py-3 px-6 rounded-lg text-gray-100 font-title tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Plus size={20} color="#f3f4f6" />
                  Adicionar cliente
                </button>
              }
              title={
                <div className="flex gap-6 items-center">
                  <AddressBook size={48} color="#3b82f6" />
                  <strong className="text-2xl font-title">
                    Adicionar cliente
                  </strong>
                </div>
              }
              description="Preencha as informações do seu novo cliente!"
              content={
                <form className="flex flex-col gap-8 w-full max-w-md mt-10">
                  <TextInput label="E-mail" type="email" />
                  <TextInput label="Nome" type="text" />
                  <TextInput label="Telefone" type="text" />

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
            Sua empresa possui <strong>{clients.length}</strong> clientes.
          </p>

          <Table columnNames={["CLIENTE", "CONTATO", "PROJETOS", ""]}>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <span className="flex items-center gap-4">
                    <Avatar.Root>
                      <Avatar.Image
                        src={client.avatar}
                        alt=""
                        className="w-14 rounded-full border border-blue-300"
                      />
                      <Avatar.Fallback className="w-14 h-14 rounded-full bg-blue-100 border border-blue-300 p-4 font-bold flex items-center justify-center text-center">
                        {client.initials}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                      <strong>{client.name}</strong>
                      <p className="text-sm text-gray-500">
                        Cliente{" "}
                        {formatDistance(client.created_at, Date.now(), {
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
                      {client.email}
                      <Copy
                        size={20}
                        color="#6b7280"
                        className="hover:cursor-pointer"
                      />
                    </strong>
                    <p className="text-sm text-gray-500">
                      {client.phone_number}
                    </p>
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-4 text-gray-700 hover:cursor-pointer hover:text-blue-500 hover:underline">
                    Ver {client.projects.length} projeto
                    {client.projects.length !== 1 ? "s" : ""}
                    <CaretRight size={20} />
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
