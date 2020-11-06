defmodule ServerWeb.ProjectController do
  use ServerWeb, :controller
  import Server.Projects.Project
  import Ecto.Query

  alias Server.Projects.Project
  alias Server.Users.User

  @spec index(Plug.Conn.t(), any) :: Plug.Conn.t()
  def index(conn, _params) do
    %{id: user_id} = Pow.Plug.current_user(conn)

    query = from(u in User, select: u, join: p in Project, on: u.id == p.user_id, where: u.id == ^user_id, preload: [project: p])

    case Server.Repo.one(query) do
      %User{project: projects} -> json(conn, projects)
      _ -> json(conn, [])
    end
    # %User{project: projects} = Server.Repo.one(query)

    # json(conn, projects)
  end

  @spec create(Plug.Conn.t(), map) :: Plug.Conn.t()
  def create(conn, %{"name" => name}) do
    user = Pow.Plug.current_user(conn)
    project = new_project_changeset(%{"name" => name, "user_id" => user.id})

    Server.Repo.insert(project)
     |> case do
        {:ok, res} -> conn |> json(res)
        {:error, _} -> conn |> send_resp(400, "bad thing happened")
     end
  end
end
