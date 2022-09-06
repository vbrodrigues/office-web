import * as Select from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";

export function SignUp() {
  return (
    <div className="flex justify-center items-center h-[100vh] w-[100vw]">
      <div className="flex flex-col justify-center items-center w-[28rem] bg-gray-100 rounded-lg p-12 shadow-lg">
        <h1 className="font-title font-bold text-2xl mb-10 flex">
          <p className="font-title font-bold text-2xl text-blue-500">.off</p>ice
        </h1>

        <form className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-1">
            <p className="font-title text-gray-500">E-mail</p>
            <input
              className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-title  text-gray-500">Nome completo</p>
            <input
              className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-title  text-gray-500">Telefone</p>
            <input
              className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-title text-gray-500">Senha</p>
            <input
              className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-title  text-gray-500">Confirmação de senha</p>
            <input
              className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
              type="password"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-title  text-gray-500">Cargo</p>
            <Select.Root>
              <Select.Trigger className="flex justify-between items-center gap-2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-blue-500">
                <Select.Value placeholder="Escolha uma opção" />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content>
                  <Select.Viewport className="bg-gray-100 mt-16 p-4 shadow-lg rounded-lg">
                    <Select.Item
                      value="board"
                      className="py-1 px-2 rounded-lg hover:cursor-pointer hover:outline-none hover:bg-gray-200 "
                    >
                      <Select.ItemText>Sócio</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>

                    <Select.Item
                      value="intern"
                      className="py-1 px-2 rounded-lg hover:cursor-pointer hover:outline-none hover:bg-gray-200 "
                    >
                      <Select.ItemText>Estagiário</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-lg text-gray-100 font-title tracking-wide hover:opacity-90 transition-opacity"
          >
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}
