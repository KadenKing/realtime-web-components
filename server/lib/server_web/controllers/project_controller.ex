defmodule ServerWeb.ProjectController do
  use ServerWeb, :controller

  def index(conn, _params) do
    send_resp(conn, 201, "hey from project controller")
  end

end
