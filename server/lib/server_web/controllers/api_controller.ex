defmodule ServerWeb.ApiController do
  use ServerWeb, :controller

  def index(conn, _params) do
    send_resp(conn, 201, "hey")
  end
end
