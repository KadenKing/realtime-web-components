defmodule Server.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  schema "users" do
    pow_user_fields()

    timestamps()
    has_many :project, Server.Projects.Project

  end
end
