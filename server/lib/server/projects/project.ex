defmodule Server.Projects.Project do
  use Ecto.Schema
  use Pow.Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name, :user_id]}
  @primary_key {:id, :binary_id, autogenerate: true}
  schema "project" do
    field :name, :string
    belongs_to :user, Server.Users.User
  end

  def new_project_changeset(params \\ %{}) do
    %Server.Projects.Project{}
      |> cast(params, [:name, :user_id])
      |> validate_required([:name, :user_id])
      |> unique_constraint(:name, name: :users_name_user_id_index)
      |> foreign_key_constraint(:user_id)
  end
end
