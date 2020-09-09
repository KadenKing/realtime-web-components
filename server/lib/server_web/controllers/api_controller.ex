defmodule ServerWeb.ApiController do
  use ServerWeb, :controller

  @secret "SUPERSECRET"

  @spec index(Plug.Conn.t(), any) :: Plug.Conn.t()
  def index(conn, _params) do
    send_resp(conn, 201, "hey")

  end

  @spec sign(Plug.Conn.t(), map) :: Plug.Conn.t()
  def sign(conn, %{"username" => username, "projectName" => projectName}) do
    signature = :crypto.hmac(:sha256, @secret, username <> ":" <> projectName) |> Base.encode16

    send_resp(conn, 201, signature)
  end

  def sign(conn, _) do
    send_resp(conn, 400, "you must send a username and a projectName")
  end
end
