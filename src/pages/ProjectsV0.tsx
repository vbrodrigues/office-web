import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CaretDown, File as PhosphorFile, Folders, Plus } from "phosphor-react";
import { Modal } from "../components/Modal";
import * as Avatar from "@radix-ui/react-avatar";
import * as Accordion from "@radix-ui/react-accordion";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Header } from "../components/Header";
import { TextInput } from "../components/Form/TextInput";
import { Dropdown } from "../components/Form/Dropdown";
import { Client } from "./Clients";

interface File {
  id: string;
  project_id: string;
  path: string;
  created_at: Date;
  updated_at?: Date;
}

interface ProjectType {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  client_id: string;
  client: Client;
  project_type_id: string;
  projectType: ProjectType;
  name: string;
  created_at: Date;
  files: File[];
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const response = await api.get("/projects");
      const projectsData = response.data;

      const projectsList = projectsData.map((project: Project) => ({
        ...project,
        created_at: new Date(project.created_at),
        files: project.files.map((file) => ({
          ...file,
          created_at: new Date(file.created_at),
          updated_at: file.updated_at ? new Date(file.updated_at) : undefined,
        })),
        client: {
          ...project.client,
          created_at: new Date(project.client.created_at),
          updated_at: new Date(project.client.updated_at),
          initials:
            project.client.name.split(" ").length > 1
              ? `${project.client.name.split(" ")[0][0]}${
                  project.client.name.split(" ")[1][0]
                }`
              : project.client.name.split(" ")[0][0],
        },
      }));

      setProjects(projectsList);
    }

    fetchProjects();
  }, [setProjects]);

  console.log(projects);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <Header />

      <main className="flex m-10 justify-center">
        <Sidebar />

        <div className="p-10 w-full max-w-[90rem] min-w-[50rem]">
          <div className="flex justify-between items-center">
            <h1 className="font-title text-2xl">Projetos</h1>

            <Modal
              trigger={
                <button className="bg-blue-500 py-3 px-6 rounded-lg text-gray-100 font-title tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Plus size={20} color="#f3f4f6" />
                  Adicionar projeto
                </button>
              }
              title={
                <div className="flex gap-6 items-center">
                  <Folders size={48} color="#3b82f6" />
                  <strong className="text-2xl font-title">
                    Adicionar projeto
                  </strong>
                </div>
              }
              description="Preencha as informações do seu novo projeto!"
              content={
                <form className="flex flex-col gap-8 w-full mt-10">
                  <TextInput label="Nome" type="text" />

                  <Dropdown
                    label="Cliente"
                    options={["Casa A", "Apartamento A"]}
                  />

                  <Dropdown
                    label="Tipo"
                    options={[
                      "Apartamento",
                      "Casa",
                      "Escritório",
                      "Loja",
                      "Consultório",
                    ]}
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

          <div className="w-full mt-10 rounded-lg overflow-hidden border border-gray-300 shadow-md">
            <Accordion.Root
              type="single"
              defaultValue="item-1"
              collapsible
              className="w-full"
            >
              {projects.map((project) => (
                <Accordion.Item value={project.id} key={project.id}>
                  <Accordion.Trigger className="w-full p-8 bg-white border-b border-gray-300 text-left">
                    <div className="flex items-center justify-between">
                      <span className="w-14, h-14 flex items-center gap-4">
                        <Avatar.Root>
                          <Avatar.Image
                            src=""
                            alt=""
                            className="w-14 h-14 rounded-full border border-blue-300 object-cover"
                          />
                          <Avatar.Fallback className="w-14 h-14 rounded-full bg-blue-100 border border-blue-300 p-4 font-bold flex items-center justify-center text-center">
                            {project.client.initials}
                          </Avatar.Fallback>
                        </Avatar.Root>
                        <div>
                          <strong>{project.client.name}</strong>
                          <p className="text-sm text-gray-500">
                            Cliente há{" "}
                            {formatDistance(
                              project.client.created_at,
                              Date.now(),
                              {
                                addSuffix: true,
                                locale: ptBR,
                              }
                            )}
                          </p>
                        </div>
                      </span>
                      <div className="flex items-center gap-4">
                        <p>Ver projetos</p>
                        <CaretDown size={20} />
                      </div>
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content className="p-8 bg-gray-100 border-b border-gray-300 text-gray-500">
                    <div className="flex flex-col gap-4">
                      <div>
                        <p>
                          <strong>{project.name}</strong> -{" "}
                          {project.projectType.name}
                        </p>
                        <p>
                          Criado{" "}
                          {formatDistance(project.created_at, Date.now(), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <div>
                        <p>Arquivos:</p>
                        <ul>
                          {project.files.map((file) => (
                            <li
                              className="flex items-center gap-2"
                              key={file.id}
                            >
                              <PhosphorFile />
                              <a>{file.path.split("/").slice(-1)[0]}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </main>
    </div>
  );
}
