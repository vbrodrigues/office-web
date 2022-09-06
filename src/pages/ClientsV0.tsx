import {
  AddressBook,
  Folders,
  FolderSimpleDotted,
  UserGear,
  Users,
} from "phosphor-react";
import { ClientCard } from "../components/Client/ClientCard";
import { MenuGroup } from "../components/Sidebar/MenuGroup";
import { MenuItem } from "../components/Sidebar/MenuItem";

export function ClientsV0() {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <header className="w-full h-[72px] flex justify-center items-center border-b">
        <h1 className="font-title font-bold text-2xl text-blue-500 ">.off</h1>
        <h1 className="font-title font-bold text-2xl">ice</h1>
      </header>

      <main className="flex h-full m-10">
        <aside className="w-72 h-full border-r border-r-gray-300 mr-16">
          <MenuGroup title="MINHA EMPRESA">
            <MenuItem
              to="/users"
              title="Colaboradores"
              icon={<Users size={20} color="#6b7280" />}
            />
          </MenuGroup>
          <MenuGroup title="CLIENTES">
            <MenuItem
              to="/clients"
              title="Clientes"
              icon={<AddressBook size={20} color="#6b7280" />}
            />
            <MenuItem
              title="Projetos"
              icon={<Folders size={20} color="#6b7280" />}
            />
          </MenuGroup>
          <MenuGroup title="CONFIGURAÇÕES">
            <MenuItem
              title="Cargos"
              icon={<UserGear size={20} color="#6b7280" />}
            />
            <MenuItem
              title="Tipos de projeto"
              icon={<FolderSimpleDotted size={20} color="#6b7280" />}
            />
          </MenuGroup>
        </aside>

        <div className="p-10 w-[73rem]">
          <h1 className="font-title text-2xl">Clientes</h1>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <ClientCard
              id="abc"
              name="Vitor Rodrigues"
              email="vitorborbarodrigues@gmail.com"
              phoneNumber="54999444921"
              createdAt={new Date("2022-08-01")}
            />
            <ClientCard
              id="abc"
              name="Sara De Cesaro"
              email="saradecesaro@gmail.com"
              phoneNumber="54999078045"
              createdAt={new Date("2022-05-01")}
            />
            <ClientCard
              id="abc"
              name="Escritório Vítor"
              email="vitorborbarodrigues@gmail.com"
              phoneNumber="54999444921"
              createdAt={new Date("2022-01-05")}
            />
            <ClientCard
              id="abc"
              name="Loja #1"
              email="vitorborbarodrigues@gmail.com"
              phoneNumber="54999444921"
              createdAt={new Date("2021-12-11")}
            />
            <ClientCard
              id="abc"
              name="Loja #2"
              email="vitorborbarodrigues@gmail.com"
              phoneNumber="54999444921"
              createdAt={new Date("2021-10-16")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
