defmodule Server.Projects.Project do
  use Ecto.Schema
  use Pow.Ecto.Schema
  @primary_key {:id, :binary_id, autogenerate: true}
  schema "project" do
    field :name, :string
    belongs_to :user, Server.Users.User
  end
end
