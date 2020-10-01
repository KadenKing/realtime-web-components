defmodule Server.Repo.Migrations.UniqueProjectName do
  use Ecto.Migration

  def change do
    create unique_index(:project, [:user_id, :name], name: :users_name_user_id_index)
  end
end
