defmodule Events.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :description, :string
    field :name, :string
    belongs_to :user, Events.Users.User

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:name, :description, :user_id])
    |> validate_required([:name, :description, :user_id])
  end
end
