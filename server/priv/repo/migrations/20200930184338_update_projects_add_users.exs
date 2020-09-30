defmodule Server.Repo.Migrations.UpdateProjectsAddUsers do
  use Ecto.Migration

  def change do
    alter table("project") do
      add :user_id, references(:users)
    end
  end
end
