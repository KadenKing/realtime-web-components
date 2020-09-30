defmodule Server.Repo.Migrations.CreateProjectsTable do
  use Ecto.Migration

  def change do
    create table("project",primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
    end
  end
end
