defmodule ServerWeb.ProjectController do
  use ServerWeb, :controller
  import Server.Projects.Project

  def index(conn, _params) do
    send_resp(conn, 201, "hey from project controller")
  end

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
